<template>
  <el-card class="left-card">
    <div class="head-wrap">
      <div class="head-left">
        <img alt="" class="img" :src="albumDetails.picUrl" />
        <span class="img-bg"></span>
      </div>
      <div class="head-right">
        <div class="title">
          <el-tag color="#D21A1A" style="margin-top: 4px">
            <span style="color: #FFFFFF">专辑</span>
          </el-tag>
          <span class="song-name">{{ albumDetails.albumName }}</span>
        </div>
        <div class="singer">
          <span>歌手：</span>
          <span v-for="(item,index) in albumDetails.artist">
            <router-link :to="{path:'/artist',query:{id:item.SingerId}}" class="singer-link">{{ item.SingerName }}</router-link>
            <el-divider direction="vertical" v-if="index !== albumDetails.artist.length - 1"/>
          </span>
        </div>
        <div class="publish-time">
          <span>发行时间：{{ albumDetails.publishTime }}</span>
        </div>
        <div class="publish-company" v-if="albumDetails.company">
          <span>发行公司：{{ albumDetails.company }}</span>
        </div>
        <div class="list-song-button-wrap">
          <el-button-group>
            <el-button type="primary" size="small" icon="el-icon-video-play">播放</el-button>
            <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="1000">
              <el-button type="primary" size="small" icon="el-icon-plus"/>
            </el-tooltip>
          </el-button-group>
          <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="1000">
            <el-button size="small" icon="el-icon-folder-add" style="margin-left: 5px">收藏</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分享" placement="top" :open-delay="1000">
            <el-button size="small" icon="el-icon-share">({{ albumDetails.shareCount }})</el-button>
          </el-tooltip>
          <el-button size="small" icon="el-icon-download">下载</el-button>
          <el-tooltip effect="dark" content="评论" placement="bottom" :open-delay="1000">
            <el-button @click.native="goComment" size="small" icon="el-icon-s-comment">({{ albumDetails.commentCount }})</el-button>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="description" :style="descStyleObj">
      <h3>专辑介绍：</h3>
      <div class="desc-real" ref="desc"></div>
    </div>
    <div class="desc-more-wrap" v-if="showMoreBtn">
      <span class="desc-more" @click="moreDesc">{{ moreSrc }}</span>
    </div>

    <AlbumSongListTable :songCount="albumDetails.size"/>

    <div id="Comment">
      <Comment url="/comment/album" :id="id"/>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import AlbumSongListTable from "@/components/Details/Album/LeftContainer/AlbumSongListTable/AlbumSongListTable";
import Comment from "@/components/Discover/TopList/RightContainer/Comment";


export default {
  name: "LeftContainer",
  components:{AlbumSongListTable,Comment},
  data(){
    return{
      albumDetails:{},
      hotAlbums:[],
      songList:[],
      showMoreBtn:false,
      moreSrc:'展开更多',
      descStyleObj:{height:131+'px'},
    }
  },
  methods:{
    getAlbumDetails(){
      request.get("/album",{params:{id:this.id}}).then(res=>{
        let {id:albumID,name:albumName,picUrl,description,company,publishTime,size,info:{shareCount,commentCount}} = res.album
        picUrl += '?param=177y177'
        publishTime = this.$moment.unix(publishTime / 1000).format('yyyy-MM-DD')
        this.descInsert(description)
        this.albumDetails = {
          albumID,  //专辑ID
          albumName,  //专辑名
          picUrl,   //专辑封面地址
          company,    //专辑发行公司
          publishTime,  //专辑发行时间
          shareCount, //专辑分享量
          commentCount, //专辑评论量
          size,     //专辑歌曲数量
        }

        //处理专辑的歌手列表
        this.albumDetails.artist = []
        for (let i = 0 ; i < res.album.artists.length; i++){
          let {id:SingerId,name:SingerName} = res.album.artists[i]
          this.albumDetails.artist.push({
            SingerId, //歌手ID
            SingerName  //歌手名
          })
        }
        //传出第一个歌手ID给右侧容器
        this.$bus.$emit('getHotAlbumBySingerId',this.albumDetails.artist[0].SingerId)

        //处理专辑歌曲列表
        for (let i = 0;i < res.songs.length;i++){
          let {name:SongName,id:SongId,dt} = res.songs[i]
          dt = this.$moment(dt).format('mm:ss')
          this.songList[i] = {
            SongName, //歌曲名
            SongId, //歌曲ID
            dt, //歌曲时长
          }
          this.songList[i].ar = []
          for (let j = 0 ; j <  res.songs[i].ar.length; j++){
            let {id:SingerId,name:SingerName} = res.songs[i].ar[j]
            this.songList[i].ar.push({
              SingerId, //歌手ID
              SingerName  //歌手名
            })
          }
        }
        this.$bus.$emit('getAlbumSongListTable',this.songList)
      })
    },
    descInsert(desc){
      this.$refs.desc.innerText = desc
      if(this.$refs.desc.offsetHeight < 131){
        this.descStyleObj.height = this.$refs.desc.offsetHeight + 23 + 'px'
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
        this.descStyleObj.height = 131+'px'
      }
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
      this.descStyleObj.height = 131+'px'
      this.getAlbumDetails()
    }
  },
  mounted() {
    document.querySelector("#app").scrollIntoView({behavior:"smooth"})
    this.getAlbumDetails()
  }
}
</script>

<style scoped>
  .left-card{
    width: 750px;
  }
  .head-wrap{
    display: flex;
  }
  .head-left{
    position: relative;
  }
  .img{
    width: 177px;
    height: 177px;
  }
  .img-bg{
    position: absolute;
    width: 209px;
    height: 177px;
    top: 0;
    left: 0;
    background: url("https://s2.music.126.net/style/web2/img/coverall.png?fd132b1832bd6174b557280cf8f55274") no-repeat 0 -986px;
  }
  .head-right{
    margin-left: 45px;
  }
  .title{
    display: flex;
  }
  .song-name{
    margin-left: 10px;
    font-size: 24px;
  }
  .singer{
    margin-top: 10px;
  }
  .singer-link{
    color: #0B74BE;
  }
  .singer-link:hover{
    text-decoration: underline #0B74BE;
  }
  .singer>span{
    font-size: 14px;
    color: #666666;
  }
  .singer>a{
    font-size: 14px;
    color: #0B74BE;
  }
  .singer>a:hover{
    text-decoration: underline #0B74BE;
  }
  .publish-time{
    margin-top: 5px;
  }
  .publish-time>span{
    font-size: 14px;
    color: #666666;
  }
  .publish-company{
    margin-top: 5px;
  }
  .publish-company>span{
    font-size: 14px;
    color: #666666;
  }
  .list-song-button-wrap{
    margin-top: 25px;
    display: flex;
  }
  .description{
    margin-top: 20px;
    line-height: 23px;
    overflow: hidden;
  }
  .desc-real{
    font-size: 13px;
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
</style>