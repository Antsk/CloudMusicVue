<template>
  <el-card class="left-card-wrap">
    <div class="head-wrap">
      <div class="head-left">
        <div class="left-img-wrap">
          <el-image class="left-img" v-if="playListDetails.coverImgUrl" :src="playListDetails.coverImgUrl"/>
          <span class="left-img-bg"/>
        </div>
      </div>
      <div class="head-right">
        <div class="title">
          <el-tag color="#D21A1A" style="margin-top: 5px">
            <span style="color: #FFFFFF">歌单</span>
          </el-tag>
          <span class="song-name">{{ playListDetails.playListName }}</span>
        </div>
        <div class="creator-wrap">
          <router-link to="/">
            <img class="creator-img" :src="playListDetails.avatarUrl" alt=""/>
          </router-link>
          <router-link class="creator-name" to="/">{{ playListDetails.nickname }}</router-link>
          <span class="creator-time">{{ playListDetails.createTime }} 创建</span>
        </div>
        <div class="list-song-button-wrap">
          <el-button-group>
            <el-button type="primary" size="small" icon="el-icon-video-play">播放</el-button>
            <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="1000">
              <el-button type="primary" size="small" icon="el-icon-plus"/>
            </el-tooltip>
          </el-button-group>
          <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="1000">
          <el-button size="small" icon="el-icon-folder-add" style="margin-left: 5px">({{ playListDetails.subscribedCount }})</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分享" placement="top" :open-delay="1000">
            <el-button size="small" icon="el-icon-share">({{ playListDetails.shareCount }})</el-button>
          </el-tooltip>
          <el-button size="small" icon="el-icon-download">下载</el-button>
          <el-tooltip effect="dark" content="评论" placement="bottom" :open-delay="1000">
            <el-button @click.native="goComment" size="small" icon="el-icon-s-comment">({{ playListDetails.commentCount }})</el-button>
          </el-tooltip>
        </div>
        <div class="tag-wrap">
          <span class="tag-title">标签：</span>
          <router-link :to="{path:'/discover/playlist',query:{cat:item}}" class="tag-main" v-for="item in playListDetails.tags">
            <el-tag>{{ item }}</el-tag>
          </router-link>
        </div>
        <div class="desc" :style="descStyleObj">
          <span class="desc-title">介绍：</span>
          <span class="desc-real" ref="desc"></span>
        </div>
        <div class="desc-more-wrap" v-if="showMoreBtn">
          <span class="desc-more" @click="moreDesc">{{ moreSrc }}</span>
        </div>
      </div>
    </div>

    <SongListTable :songList="songList" :playCount="playListDetails.playCount" :songCount="playListDetails.songCount"/>

    <div class="more-download">
      <p>查看更多内容，请下载客户端</p>
      <el-button type="danger">立即下载</el-button>
    </div>

    <div id="Comment">
      <Comment url="/comment/playlist" :id="id"/>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import SongListTable from "@/components/Details/PlayList/LeftContainer/SongListTable/SongListTable";
import Comment from "@/components/Discover/TopList/RightContainer/Comment";

export default {
  name: "LeftContainer",
  components:{SongListTable,Comment},
  data(){
    return{
      moreSrc:'展开更多',
      descStyleObj:{height:60+'px'},
      showMoreBtn:false,
      playListDetails:{},
      songList:[],
      subscribeList:[],
    }
  },
  methods:{
    getPlayListDetails(){
      request.get("/playlist/detail",{params:{id:this.id}}).then(res=>{
        this.playListDetails = {}
        this.songList = []
        let {id:playListId,name:playListName,coverImgUrl,description,createTime,creator:{userId,nickname,avatarUrl},playCount,subscribedCount,shareCount,commentCount} = res.playlist
        let songCount = res.playlist.trackIds.length
        coverImgUrl += '?param=200y200'
        avatarUrl += '?param=40y40'
        createTime = this.$moment.unix(createTime / 1000).format('yyyy-MM-DD')
        subscribedCount = this.countFormat(subscribedCount)
        shareCount = this.countFormat(shareCount)
        commentCount = this.countFormat(commentCount)
        this.descInsert(description)
        this.playListDetails = {
          playListId, //歌单ID
          playListName, //歌单名
          coverImgUrl,  //歌单封面地址
          createTime, //歌单创建时间
          playCount,  //歌单播放量
          subscribedCount,  //歌单收藏量
          shareCount, //歌单分享量
          commentCount, //歌单评论量
          userId, //歌单创建者ID
          nickname,  //歌单创建者昵称
          avatarUrl, //歌单创建者头像地址
          songCount,  //歌单歌曲总数量
        }
        this.playListDetails.tags = res.playlist.tags

        //处理歌单列表
        for (let i = 0;i < res.playlist.tracks.length;i++){
          let {name:SongName,id:SongId,dt,al:{id:albumId,name:albumName}} = res.playlist.tracks[i]
          dt = this.$moment(dt).format('mm:ss')
          this.songList[i] = {
            SongName, //歌曲名
            SongId, //歌曲ID
            dt, //歌曲时长
            albumId,  //歌曲所属专辑ID
            albumName //歌曲所属专辑名
          }
          this.songList[i].ar = []
          for (let j = 0 ; j <  res.playlist.tracks[i].ar.length; j++){
            let {id:SingerId,name:SingerName} = res.playlist.tracks[i].ar[j]
            this.songList[i].ar.push({
              SingerId, //歌手ID
              SingerName  //歌手名
            })
          }
        }

        //处理喜欢歌单用户信息
        this.subscribeList = []
        for (let k = 0;k < res.playlist.subscribers.length;k++){
          let {userId,nickname,avatarUrl} = res.playlist.subscribers[k]
          avatarUrl += '?param=40y40'
          this.subscribeList.push({
            userId, //用户ID
            nickname, //用户昵称
            avatarUrl //用户头像地址
          })
        }
        //全局事件总线将用户信息传给右侧容器
        this.$bus.$emit('getSubscribeUser',this.subscribeList)
      })
    },
    descInsert(desc){
      this.$refs.desc.innerText = desc
      if(this.$refs.desc.offsetHeight < 60){
        this.descStyleObj.height = this.$refs.desc.offsetHeight + 'px'
      }
      else{
        this.showMoreBtn = true
      }
    },
    moreDesc(){
      if(this.moreSrc === '展开更多'){
        this.moreSrc = '收起'
        this.descStyleObj.height = 'auto'
      }else{
        this.moreSrc = '展开更多'
        this.descStyleObj.height = 60+'px'
      }
    },
    countFormat(count){
      if(count >= 100000){
        return Math.floor(count /= 10000) + "万"
      }else return count
    },
    goComment(){
      document.querySelector("#Comment").scrollIntoView({behavior:"smooth"})
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.showMoreBtn = false
      this.moreSrc = '展开更多'
      this.descStyleObj.height = 60+'px'
      this.getPlayListDetails()
    }
  },
  mounted() {
    document.querySelector("#app").scrollIntoView({behavior:"smooth"})
    this.getPlayListDetails()
  }
}
</script>

<style scoped>

  .left-card-wrap{
    width: 750px;
  }
  .head-wrap{
    display: flex;
  }
  .head-left{
    width: 208px;
  }
  .left-img-wrap{
    width: 208px;
    height: 208px;
    position: relative;
  }
  .left-img{
    width: 200px;
    height: 200px;
  }
  .left-img-bg{
    background: url("../../../../assets/images/coverall.png") no-repeat 0 -1285px;
    position: absolute;
    width: 208px;
    height: 208px;
    top: -4px;
    left: -4px;
  }
  .head-right{
    margin-left: 10px;
  }
  .title{
    display: flex;
  }
  .song-name{
    margin-left: 10px;
    font-size: 24px;
  }
  .creator-wrap{
    display: flex;
    align-items: center;
    margin-top: 15px;
  }
  .creator-img{
    width: 40px;
    height: 40px;
  }
  .creator-name{
    font-size: 13px;
    margin-left: 8px;
    color: #0B74BE;
  }
  .creator-name:hover{
    text-decoration: underline #0B74BE;
  }
  .creator-time{
    color: #999999;
    margin-left: 15px;
  }
  .list-song-button-wrap{
    margin-top: 25px;
    display: flex;
  }
  .tag-wrap{
    margin-top: 25px;
  }
  .tag-title,.desc-title,.desc-real{
    font-size: 14px;
    color: #666666;
  }
  .tag-main{
    margin-left: 10px;
  }
  .desc{
    overflow: hidden;
  }
  .desc{
    margin-top: 10px;
    line-height: 23px;
    overflow: hidden;
  }
  .desc-more-wrap{
    margin-top: 10px;
  }
  .desc-more{
    color: #61666D;
    cursor: pointer;
    font-size: 13px;
  }
  .desc-more:hover{
    color: #C10D0C;
  }
  .more-download>p{
    text-align: center;
    font-size: 15px;
    margin-top: 20px;
  }
  .more-download>button{
    display: block;
    width: 120px;
    height: 30px;
    margin: 20px auto;
    border-radius: 18px;
    padding: 0;
  }
</style>