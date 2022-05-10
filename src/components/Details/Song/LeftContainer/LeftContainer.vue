<template>
  <el-card class="left-card-wrap">
    <div class="head-wrap">
      <div class="head-left">
        <div class="left-img-wrap">
          <img class="left-img" :src="songDetail.picUrl"/>
          <span class="left-img-bg"/>
        </div>
        <div class="left-bottom">
          <i class="el-icon-headset"/>
          <router-link to="/">生成外链播放器</router-link>
        </div>
      </div>
      <div class="head-right">
        <div class="title">
          <el-tag color="#D21A1A" style="margin-top: 5px">
            <span style="color: #FFFFFF">单曲</span>
          </el-tag>
          <span class="song-name">{{ songDetail.SongName }}</span>
        </div>
        <div class="singer-wrap">
          <span>歌手：</span>
          <span v-for="(item,index) in songDetail.artist">
            <router-link :to="{path:'/artist',query:{id:item.SingerId}}" class="singer-link">{{ item.SingerName }}</router-link>
            <el-divider direction="vertical" v-if="index !== songDetail.artist.length - 1"/>
          </span>
        </div>
        <div class="singer-wrap">
          <span>所属专辑：</span> <router-link :to="{path:'/album',query:{id:songDetail.AlbumId}}">{{ songDetail.AlbumName }}</router-link>
        </div>
        <div class="list-song-button-wrap">
          <el-button-group>
            <el-button @click="playMusic(songDetail)" type="primary" size="small" icon="el-icon-video-play">播放</el-button>
            <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="1000">
              <el-button @click="$store.dispatch('addMusic',songDetail)" type="primary" size="small" icon="el-icon-plus"/>
            </el-tooltip>
          </el-button-group>
          <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="1000">
            <el-button size="small" icon="el-icon-folder-add" style="margin-left: 5px">收藏</el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="分享" placement="bottom" :open-delay="1000">
            <el-button size="small" icon="el-icon-share">分享</el-button>
          </el-tooltip>
          <el-button size="small" icon="el-icon-download">下载</el-button>
          <el-tooltip effect="dark" content="评论" placement="bottom" :open-delay="1000">
            <el-button @click.native="goComment" size="small" icon="el-icon-s-comment">({{ commentCount }})</el-button>
          </el-tooltip>
        </div>
        <div class="lyric" :style="lyricStyleObj" >
          <div class="lyric-real" ref="lyric"></div>
        </div>
        <div class="lyric-more-wrap" v-if="showMoreBtn">
          <span class="lyric-more" @click="moreLyric">{{ moreSrc }}</span>
        </div>
        <div class="report-wrap">
          <router-link to="/">上传歌词</router-link>
          <router-link to="/">报错</router-link>
        </div>
      </div>
    </div>
    <div id="Comment">
      <Comment  @getCommentCount="getCommentCount" url="/comment/music" :id="id"/>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";
import Comment from "@/components/Discover/TopList/RightContainer/Comment";

export default {
  name: "LeftContainer",
  components:{Comment},
  data(){
    return{
      lyric:'',
      moreSrc:'展开更多',
      lyricStyleObj:{height:310+'px'},
      showMoreBtn:false,
      songDetail:{},
      commentCount:0,
    }
  },
  methods:{
    getSongDetails(id){
      request.get("/song/detail",{params:{ids:id}}).then(res=>{
        let {name:SongName,id:SongId,dt,al:{id:AlbumId,name:AlbumName,picUrl}} = res.songs[0]
        picUrl += '?param=130y130'
        dt = this.$moment(dt).format('mm:ss')
        this.songDetail = {
          SongId, //歌曲ID
          SongName, //歌曲名
          AlbumId,  //专辑ID
          AlbumName, //专辑名
          picUrl,  //专辑封面地址
          dt
        }
        this.songDetail.artist = []
        for (let i = 0 ; i < res.songs[0].ar.length; i++){
          let {id:SingerId,name:SingerName} = res.songs[0].ar[i]
          this.songDetail.artist.push({
            SingerId, //歌手ID
            SingerName  //歌手名
          })
        }
      })
    },
    getLyric(id){
      request.get("/lyric",{params:{id:id}}).then(res=>{
        this.lyric = res.lrc.lyric.replaceAll('\n','<br/>')
        this.$refs.lyric.innerHTML = this.lyric
        if(this.$refs.lyric.offsetHeight < 310){
          this.lyricStyleObj.height = this.$refs.lyric.offsetHeight + 'px'
        }
        if(this.$refs.lyric.offsetHeight > 310){
          this.showMoreBtn = true
        }
      })
    },
    moreLyric(){
      if(this.moreSrc === '展开更多'){
        this.moreSrc = '收起'
        this.lyricStyleObj.height = 'auto'
      }else{
        this.moreSrc = '展开更多'
        this.lyricStyleObj.height = 310+'px'
      }
    },
    getCommentCount(count){
      this.commentCount = count
    },
    goComment(){
      document.querySelector("#Comment").scrollIntoView({behavior:"smooth"})
    },
    playMusic(songDetail){
      this.$store.dispatch('addMusic',songDetail)
      this.$bus.$emit('playMusic',songDetail)
    }
  },
  mounted() {
    this.getLyric(this.id)
    this.getSongDetails(this.id)
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
      this.lyricStyleObj.height = 310+'px'
      this.getLyric(this.id)
      this.getSongDetails(this.id)
    }
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
    width: 206px;
  }
  .left-img-wrap{
    width: 206px;
    height: 206px;
    position: relative;
  }
  .left-img{
    width: 130px;
    height: 130px;
    margin: 34px;
  }
  .left-img-bg{
    background: url("../../../../assets/images/coverall.png") no-repeat -140px -580px;
    position: absolute;
    width: 206px;
    height: 206px;
    top: -4px;
    left: -4px;
  }
  .left-bottom{
    text-align: center;
    margin-top: 10px;
    font-size: 13px;
  }
  .left-bottom>a{
    text-decoration: underline #0B74BE;
    color: #0B74BE;
  }
  .el-icon-headset{
    margin-right: 2px;
    color: #0B74BE;
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
  .singer-wrap{
    margin-top: 10px;
    font-size: 14px;
  }
  .singer-wrap>span{
    color: #999999;
  }
  .singer-wrap>a{
    color: #0B74BE;
  }
  .singer-wrap>a:hover{
    text-decoration: underline #0B74BE;
  }
  .singer-link{
    color: #0B74BE;
  }
  .singer-link:hover{
    text-decoration: underline #0B74BE;
  }
  .list-song-button-wrap{
    margin-top: 10px;
    display: flex;
  }
  .lyric{
    margin-top: 10px;
    line-height: 23px;
    overflow: hidden;
  }
  .lyric-more-wrap{
    margin-top: 10px;
  }
  .lyric-more{
    color: #61666D;
    cursor: pointer;
    font-size: 13px;
  }
  .lyric-more:hover{
    color: #C10D0C;
  }
  .report-wrap{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
  .report-wrap>a{
    font-size: 13px;
    color: #999999;
    margin-left: 5px;
    text-decoration: underline #999999;
  }
</style>