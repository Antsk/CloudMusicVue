<template>
  <el-card class="MainCard">
    <div>
      <h3 class="Title">入驻歌手</h3>
      <router-link :to="{path:'/discover/artist'}" class="a-view">查看全部<i class="el-icon-arrow-right"/></router-link>
    </div>

    <el-divider/>

    <el-skeleton :loading="SkeletonLoading" animated :count="5">
      <template v-slot:template>
        <el-card shadow="hover" body-style="padding:0px" style="margin-top: 10px">
          <el-skeleton-item variant="image" style="width: 62px; height: 62px;float: left"/>
          <el-skeleton-item variant="h3" style="margin: 10px 0 0 10px;width: 50%"></el-skeleton-item>
          <el-skeleton-item variant="text" style="margin: 10px 0 0 10px;width: 50%"></el-skeleton-item>
        </el-card>
      </template>
      <template v-slot:default>
        <el-card class="list-card" shadow="hover" body-style="padding:0px" v-for="item in list" :key="item.id">
          <router-link :to="{path:'/artist',query:{id:item.id}}">
            <img class="IMG" alt="img" :src="item.picUrl"/>
            <div class="info-wrap">
              <h3 class="info-desc">{{ item.SingerName }}</h3>
              <p class="info-desc">{{  item.alias  }}</p>
            </div>
          </router-link>
        </el-card>
      </template>
    </el-skeleton>
    <el-button style="width: 100%;margin-top: 20px">申请成为网易音乐人</el-button>


  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "SingerInfo",
  data(){
    return{
      list:[],
      SkeletonLoading:true
    }
  },
  methods:{
    GetSingerInfo(){
      this.SkeletonLoading = true
      request.get("/top/artists",{params:{limit:5}}).then(res=>{
        for(let i = 0;i < res.artists.length;i++){
          let {id,picUrl,name:SingerName}  = res.artists[i]
          let [alias] = res.artists[i].alias
          picUrl += '?param=62y62'
          this.list.push({
            id, //歌手ID
            picUrl, //歌手图片地址
            SingerName, //歌手名
            alias //歌手别名
          })
        }
        this.SkeletonLoading  = false
      })
    }
  },
  mounted() {
    this.GetSingerInfo()
  }
}
</script>

<style scoped>

  .MainCard{
    margin-top: 10px;
  }
  .el-icon-arrow-right{
    margin-left: 5px;
  }
  .Title{
    display: inline-block
  }
  .a-view{
    float: right;
    margin-top: 2px;
  }
  .list-card{
    margin-top: 10px;
  }
  .IMG{
    float: left;
    width: 62px;
    height: 62px;
  }
  .info-wrap{
    float:left;
    margin-left: 10px;
    width: 133px;
  }
  .info-desc{
    margin-top: 8px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
</style>