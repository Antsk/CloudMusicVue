<template>
  <div class="hotSong-wrap">
    <div class="btn-group">
      <el-button-group>
        <el-button type="primary" size="small" icon="el-icon-video-play">播放</el-button>
        <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="1000">
          <el-button type="primary" size="small" icon="el-icon-plus"/>
        </el-tooltip>
      </el-button-group>
      <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="1000">
        <el-button size="small" icon="el-icon-folder-add" style="margin-left: 5px">收藏</el-button>
      </el-tooltip>
    </div>

    <ArtistSongListTable :songList="songList"/>
  </div>
</template>

<script>
import ArtistSongListTable from "@/components/Details/Artist/LeftContainer/HotSong/ArtistSongListTable/ArtistSongListTable";
import request from "@/utils/request";


export default {
  name: "HotSong",
  components:{ArtistSongListTable},
  data(){
    return{
      songList:[]
    }
  },
  methods:{
    getHotSongListData(){
      this.songList = []
      request.get('/artist/top/song',{params:{id:this.id}}).then(res=>{
        for (let i = 0; i < res.songs.length;i++){
          let {name:SongName,id:SongID,dt,al:{id:albumId,name:albumName}} = res.songs[i]
          dt = this.$moment(dt).format('mm:ss')
          this.songList.push({
            SongID,   //歌曲ID
            SongName, //歌曲名
            dt,       //歌曲时长
            albumId,  //专辑ID
            albumName //专辑名
          })
        }
      })
    }
  },
  mounted() {
    this.getHotSongListData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getHotSongListData()
    }
  }
}
</script>

<style scoped>

</style>