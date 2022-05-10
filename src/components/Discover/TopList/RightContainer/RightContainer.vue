<template>
  <div class="RightContainerWrap">
    <el-card>
      <div class="top-area">
        <img alt="" :src="songListDetail.coverImgUrl" style="width: 150px;height: 150px"/>
        <div class="list-song-info-wrap">
          <h2>{{songListDetail.songListName}}</h2>
          <div class="list-song-time-info">
            <i class="el-icon-time"/>
            <span>最近更新时间：{{ songListDetail.updateTime }}</span>
          </div>
          <div class="list-song-button-wrap">
            <el-button-group>
              <el-button type="primary" size="small" icon="el-icon-video-play">播放</el-button>
              <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="1000">
                <el-button type="primary" size="small" icon="el-icon-plus"></el-button>
              </el-tooltip>
            </el-button-group>
            <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="1000">
            <el-button size="small" icon="el-icon-folder-add" style="margin-left: 10px">({{ songListDetail.subscribedCount }})</el-button>
            </el-tooltip>
          </div>
          <div class="list-song-button-wrap">
            <el-tooltip effect="dark" content="分享" placement="bottom" :open-delay="1000">
              <el-button size="small" icon="el-icon-share">({{ songListDetail.shareCount }})</el-button>
            </el-tooltip>
            <el-button size="small" icon="el-icon-download">下载</el-button>
            <el-tooltip effect="dark" content="评论" placement="bottom" :open-delay="1000">
              <el-button @click.native="goComment" size="small" icon="el-icon-s-comment">({{songListDetail.commentCount}})</el-button>
            </el-tooltip>
          </div>
        </div>
      </div>

      <SongListTable :songList="songList" :playCount="songListDetail.playCount" :songCount="songListDetail.trackCount"></SongListTable>

      <div id="Comment">
        <Comment :id="id" url="/comment/playlist"/>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";
import SongListTable from "@/components/Details/PlayList/LeftContainer/SongListTable/SongListTable";
import Comment from "@/components/Discover/TopList/RightContainer/Comment";

export default {
  name: "RightContainer",
  components:{Comment,SongListTable},
  data(){
    return{
      songListDetail:{
        songListName:'',  //歌单名字
        coverImgUrl:'',   //歌单封面链接
        trackCount:'',  //歌单歌曲总数
        playCount:0,    //歌单播放量
        updateTime:0,  //歌单更新时间
        subscribedCount:0,  //歌单收藏量
        shareCount:0,   //歌单分享量
        commentCount:0, //歌单评论量
      },
      songList:[],
      commentList:[],
      currentPage:1,
    }
  },
  methods:{
    GetSongList(){
      request.get("/playlist/detail",{params:{id:this.id}}).then(res=>{
        this.songListDetail = {};
        //歌单基础信息解构获取
        ({commentCount:this.songListDetail.commentCount,updateTime:this.songListDetail.updateTime,name:this.songListDetail.songListName,coverImgUrl:this.songListDetail.coverImgUrl,trackCount:this.songListDetail.trackCount,playCount:this.songListDetail.playCount,subscribedCount:this.songListDetail.subscribedCount,shareCount:this.songListDetail.shareCount} = res.playlist);
        this.songListDetail.coverImgUrl += '?param=150y150'
        this.songListDetail.updateTime = this.$moment(this.songListDetail.updateTime).format('MM月DD日')

        this.songList = []
        //歌单歌曲列表信息获取
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
      })
    },
    goComment(){
      document.querySelector("#Comment").scrollIntoView({behavior:"smooth"})
    }
  },
  mounted() {
    this.GetSongList()
  },
  computed:{
    id(){
      if(this.$route.query.id === undefined) return 19723756
      else return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.GetSongList()
      this.currentPage = 1
      document.querySelector("#app").scrollIntoView({behavior:"smooth"})
    }
  }
}
</script>

<style scoped>

  .my-divider{
    background-color: red;
    height: 2px;
    margin: 18px 0;
  }
  .el-icon-time{
    margin-right: 5px;
    font-size: 15px;
  }
  .RightContainerWrap{
    width: 100%;
    margin: 10px 0 0 5px;
  }
  .top-area{
    display: flex;
  }
  .list-song-info-wrap{
    width: 100%;
    margin: 16px 0 0 30px;
    display: flex;
    flex-direction: column;
  }
  .list-song-time-info{
    margin-top: 10px;
  }
  .list-song-button-wrap{
    margin-top: 10px;
    display: flex;
  }
  .list-table-title{
    margin-top: 50px;
  }
  .list-table-title>h2{
    display: inline-block;
  }
  .list-table-title>span{
    margin-left: 20px;
  }
  .list-table-title>div{
    float: right;
    margin-top: 5px;
    vertical-align: middle;
  }
  .list-table-title>div>span{
    color: red;
  }
</style>