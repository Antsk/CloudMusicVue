<template>
  <div class="hot-album-wrap">
    <h1>热门新碟</h1>
    <el-divider class="my-divider"/>
    <Item :List="albumList"/>
  </div>
</template>

<script>
import Item from "@/components/Discover/Album/Item/Item";
import request from "@/utils/request";

export default {
  name: "HotAlbum",
  components:{Item},
  data(){
    return{
      albumList:[]
    }
  },
  methods:{
    getHotAlbums(){
      request.get("/album/newest").then(res=>{
        for (let i = 0;i < 10;i++){
          let {name:albumName,id:albumID,picUrl,artist:{name:artistName,id:artistID}} = res.albums[i]
          picUrl += '?param=130y130'
          this.albumList.push({
            albumID,  //专辑ID
            albumName,  //专辑名
            picUrl, //专辑封面地址
            artistName, //歌手名
            artistID  //歌手ID
          })
        }
      })
    }
  },
  mounted() {
    this.getHotAlbums()
  }
}
</script>

<style scoped>

  .hot-album-wrap{
    margin-top: 10px;
  }
  .my-divider{
    background-color: #C10D0C;
    margin: 12px 0;
    height: 2px;
  }

</style>