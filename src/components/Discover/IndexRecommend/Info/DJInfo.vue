<template>
  <el-card class="MainCard">
    <div>
      <h3>热门主播</h3>
    </div>

    <el-divider/>

    <el-skeleton :loading="SkeletonLoading" animated :count="10">
      <template v-slot:template>
        <el-card shadow="hover" body-style="padding:0px" style="margin-top: 10px">
          <el-skeleton-item variant="image" style="width: 62px; height: 62px;float: left"/>
          <el-skeleton-item variant="h3" style="margin: 10px 0 0 10px;width: 50%"></el-skeleton-item>
          <el-skeleton-item variant="text" style="margin: 10px 0 0 10px;width: 50%"></el-skeleton-item>
        </el-card>
      </template>
      <template v-slot:default>
        <el-card class="list-card" shadow="hover" body-style="padding:0px" v-for="item in list" :key="item.id">
          <router-link to="/">
            <img class="IMG" alt="img" :src="item.avatarUrl"/>
            <div class="info-wrap">
              <div class="icon-wrap">
                <el-tooltip effect="dark" content="主播" placement="top">
                  <i class="el-icon-user-solid"/>
                </el-tooltip>
                <el-tooltip effect="dark" :content="item.nickName" placement="top">
                  <span class="info-singer">{{ item.nickName }}</span>
                </el-tooltip>
              </div>
              <div class="icon-wrap">
                <el-tooltip effect="dark" content="粉丝量" placement="top">
                  <i class="el-icon-star-on"/>
                </el-tooltip>
                <span class="info-fans">{{ item.userFollowedCount }}</span>
              </div>
            </div>
          </router-link>
        </el-card>
      </template>
    </el-skeleton>

  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "DJInfo",
  data(){
    return{
      list:[],
      SkeletonLoading:true
    }
  },
  methods:{
    GetDJInfo(){
      this.SkeletonLoading = true
      request.get("/dj/toplist/popular",{params:{limit:10}}).then(res=>{
        for(let i = 0;i < res.data.list.length;i++){
          let {avatarUrl,id,nickName,userFollowedCount} = res.data.list[i]
          avatarUrl += '?param=62y62'
          this.list.push({
            id, //主播ID
            nickName, //主播名字
            avatarUrl, //主播头像地址
            userFollowedCount //主播粉丝数量
          })
        }
        this.FollowedCountFormat()
        this.SkeletonLoading = false
      })
    },
    FollowedCountFormat(){
      this.list.forEach(item=>{
        if(item.userFollowedCount>=100000){
          item.userFollowedCount = Math.floor(item.userFollowedCount/= 10000) + "万"
        }
      })
    }
  },
  mounted() {
    this.GetDJInfo()
  }
}
</script>

<style scoped>

  .MainCard{
    margin-top: 10px;
  }
  .el-icon-user-solid{
    font-size: 15px;
  }
  .el-icon-star-on{
    font-size: 14px;
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
  .info-singer{
    font-size: 14px;
    font-weight: bold;
    margin-left: 5px;
  }
  .info-fans{
    margin-left: 5px;
  }
  .icon-wrap{
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    margin-top: 8px;
  }
</style>