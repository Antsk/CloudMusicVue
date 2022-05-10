<template>
  <el-card class="left-card">
    <h2>{{ artistDetails.artistName }}</h2>
    <img class="artist-img" :src="artistDetails.cover"/>
    <el-tabs stretch v-model="activeName">
      <el-tab-pane label="热门作品" name="song"><HotSong/></el-tab-pane>
      <el-tab-pane label="所有专辑" name="album"><ArtistAlbum/></el-tab-pane>
      <el-tab-pane label="相关MV" name="MV"><ArtistMV/></el-tab-pane>
      <el-tab-pane label="艺人介绍" name="desc"><ArtistDesc/></el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import HotSong from "@/components/Details/Artist/LeftContainer/HotSong/HotSong";
import ArtistAlbum from "@/components/Details/Artist/LeftContainer/ArtistAlbum/ArtistAlbum";
import ArtistMV from "@/components/Details/Artist/LeftContainer/ArtistMV/ArtistMV";
import ArtistDesc from "@/components/Details/Artist/LeftContainer/ArtistDesc/ArtistDesc";
import request from "@/utils/request";

export default {
  name: "LeftContainer",
  components:{HotSong,ArtistAlbum,ArtistMV,ArtistDesc},
  data(){
    return{
      activeName:'song',
      artistDetails:{}
    }
  },
  methods:{
    getArtistDetailsData(){
      this.artistDetails = {}
      request.get('/artist/detail',{params:{id:this.id}}).then(res=>{
        this.artistDetails = {
          artistName:res.data.artist.name,
          cover:res.data.artist.cover + '?param=710y370'
        }
      })
    }
  },
  mounted() {
    this.getArtistDetailsData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getArtistDetailsData()
    }
  }
}
</script>

<style scoped>
  .left-card{
    width: 750px;
  }
  h2{
    font-size: 24px;
    font-weight: 400;
    color: #333333;
    height: 34px;
    line-height: 24px;
  }
  .artist-img{
    width: 710px;
    height: 370px;
  }
</style>