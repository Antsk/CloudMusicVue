<template>
  <el-card style="margin-top: 10px">
    <div class="TopArea">
      <i class="el-icon-s-help"/>
      <router-link :to="{path:'/discover/album'}"><span class="NewAlbumTitle">新碟上架</span></router-link>
      <span class="More">
        <router-link :to="{path:'/discover/album'}">更多</router-link>
        <i class="el-icon-right"/>
      </span>
    </div>
    <div class="MainListArea">

        <el-skeleton :loading="SkeletonLoading" animated :count="12">
          <template v-slot:template>
            <el-card class="ListCard" body-style="padding:0px" shadow="hover">
              <el-skeleton-item variant="image" style="width: 160px; height: 160px;"/>
              <el-skeleton-item variant="text" style="margin-top: 10px;width: 60%"></el-skeleton-item>
              <el-skeleton-item variant="text" style="margin: 10px 5px 0 0;width: 10%;float: right"></el-skeleton-item>
              <el-skeleton-item variant="text" style="margin-top: 10px;width: 60%"></el-skeleton-item>
            </el-card>
          </template>
          <template v-slot:default>
            <el-card class="ListCard" body-style="padding:0px" shadow="hover" v-for="item in list" :key="item.id">
              <router-link :to="{path:'/album',query:{id:item.id}}"><img alt="img" class="NewAlbumImg" :src="item.blurPicUrl"/></router-link>
              <el-tooltip effect="dark" content="播放" placement="top">
                <el-button type="text" size="mini" style="float: right;margin:5px 10px 0 0;padding: 0">
                  <i class="el-icon-video-play"/>
                </el-button>
              </el-tooltip>
              <router-link :to="{path:'/album',query:{id:item.id}}"><p class="AlbumSpan">专辑：{{item.AlbumName}}</p></router-link>
              <router-link :to="{path:'/artist',query:{id:item.SingerID}}"><p class="AlbumSpan">歌手：{{item.SingerName}}</p></router-link>
            </el-card>
          </template>
        </el-skeleton>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "NewAlbum",
  data(){
    return{
      SkeletonLoading:true,
      list:[]
    }
  },
  methods:{
    //获取新碟上架数据
    GetNewAlbum(){
      this.SkeletonLoading = true
      request.get("/album/newest").then(res=>{
        for(let i = 0;i<res.albums.length;i++){
          //解构赋值，获取需要的数据
          let {id,blurPicUrl,artist:{name:SingerName,id:SingerID},name:AlbumName} = res.albums[i]
          blurPicUrl += '?param=158y158'
          this.list.push({
              id, //歌曲id
              blurPicUrl, //图片链接
              SingerName, //歌手名字
              AlbumName, //专辑名字
              SingerID  //歌手ID
            })
        }
        this.SkeletonLoading = false
      })
    }
  },
  mounted() {
    this.GetNewAlbum()
  }
}
</script>

<style scoped>

  .TopArea{
    border-bottom:2px solid #C10D0C;
    height: 33px;
  }
  .el-icon-s-help{
    font-size: 20px;
    color: red;
  }
  .NewAlbumTitle{
    font-size: 20px;
    margin: 0 20px 0 10px;
  }
  .More{
    margin: 8px;
    float: right;
  }
  .el-icon-right{
    color: red;
    font-weight: bold;
    margin-left: 5px;
  }
  .el-icon-video-play{
    font-size: 20px;
    font-weight: bold;
    color: red;
  }
  .NewAlbumImg{
    width: 100%;
    height: 100%;
  }
  .MainListArea{
    margin-top: 20px;
    margin-left: -15px;
  }
  .ListCard{
    width: 160px;
    height: 250px;
    display: inline-block;
    margin: 0 0 30px 15px;
  }
  .AlbumSpan{
    font-size: 10px;
    margin: 5px 0 0 5px;
  }
</style>