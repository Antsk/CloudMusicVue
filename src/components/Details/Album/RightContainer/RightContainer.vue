<template>
  <el-card class="right-card">
    <div class="hot-album">
      <div class="hot-album-title">
        <h3>Ta的其他热门专辑</h3>
        <router-link :to="{path:'/artist',query:{id:artistID}}">全部<i class="el-icon-arrow-right"/></router-link>
      </div>
      <el-divider class="my-divider"/>
      <div class="hot-album-item-wrap">
        <div class="item" v-for="item in hotAlbums">
          <router-link :to="{path:'/album',query:{id:item.albumID}}">
            <img class="item-img" :src="item.picUrl" alt="">
          </router-link>
          <div class="item-info">
            <router-link :to="{path:'/album',query:{id:item.albumID}}">{{ item.albumName }}</router-link>
            <span>{{ item.publishTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RightContainer",
  data(){
    return{
      artistID: 0,
      hotAlbums:[]
    }
  },
  methods:{
    getHotAlbumBySingerId(SingerID){
      this.artistID = SingerID
      this.hotAlbums = []
      request.get("/artist/album",{params:{id:SingerID}}).then(res=>{
        if(res.hotAlbums.length < 5){
          for (let i = 0;i < res.hotAlbums.length;i++){
            let{id:albumID,name:albumName,picUrl,publishTime} = res.hotAlbums[i]
            picUrl += '?param=50y50'
            publishTime = this.$moment.unix(publishTime / 1000).format('yyyy-DD-MM')
            this.hotAlbums.push({
              albumID,    //专辑ID
              albumName,  //专辑名
              picUrl,     //专辑封面地址
              publishTime //专辑发布时间
            })
          }
        }else{
          for (let i = 0;i < 5;i++){
            let{id:albumID,name:albumName,picUrl,publishTime} = res.hotAlbums[i]
            picUrl += '?param=50y50'
            publishTime = this.$moment.unix(publishTime / 1000).format('yyyy-MM-DD')
            this.hotAlbums.push({
              albumID,    //专辑ID
              albumName,  //专辑名
              picUrl,     //专辑封面地址
              publishTime //专辑发布时间
            })
          }
        }
      })
    },
  },
  mounted() {
    this.$bus.$on('getHotAlbumBySingerId',this.getHotAlbumBySingerId)
  },
  beforeDestroy() {
    this.$bus.$off('getHotAlbumBySingerId')
  }
}
</script>

<style scoped>
  .right-card{
    width: 245px;
    margin-left: 5px;
    height: 100%;
  }
  .hot-album-title{
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .hot-album-title>span{
    cursor: pointer;
    color: #666666;
  }
  .hot-album-title>span:hover{
    text-decoration: underline #666666;
  }
  .my-divider{
    margin: 12px 0;
  }
  .item{
    display: flex;
    margin-top: 10px;
  }
  .item-img{
    width: 50px;
    height: 50px;
  }
  .item-info{
    margin-left: 10px;
    overflow: hidden;
  }
  .item-info>a{
    display: block;
    color: #000000;
    font-size: 15px;
    margin-bottom: 7px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .item-info>a:hover{
    text-decoration: underline #000000;
  }
  .item-info>span{
    color: #666666;
  }
</style>