<template>
  <el-card>
    <div class="HotTopArea">
      <i class="el-icon-s-help"/>
      <router-link :to="{path:'/discover/playlist'}"><span class="HotRecommendTitle">热门推荐</span></router-link>
      <router-link :to="{path:'/discover/playlist',query:{cat:'华语'}}">华语</router-link>
      <span class="HotTopAreaSpan">|</span>
      <router-link :to="{path:'/discover/playlist',query:{cat:'流行'}}">流行</router-link>
      <span class="HotTopAreaSpan">|</span>
      <router-link :to="{path:'/discover/playlist',query:{cat:'摇滚'}}">摇滚</router-link>
      <span class="HotTopAreaSpan">|</span>
      <router-link :to="{path:'/discover/playlist',query:{cat:'民谣'}}">民谣</router-link>
      <span class="HotTopAreaSpan">|</span>
      <router-link :to="{path:'/discover/playlist',query:{cat:'电子'}}">电子</router-link>
      <span class="More">
        <router-link :to="{path:'/discover/playlist'}">更多</router-link>
        <i class="el-icon-right"/>
      </span>
    </div>
    <div class="MainListArea">
        <el-skeleton :loading="loading" animated :count="8">
          <template v-slot:template>
            <el-card class="ListCard" body-style="padding:0px" shadow="hover">
              <el-skeleton-item variant="image" style="width: 160px; height: 160px;"/>
              <el-skeleton-item variant="text" style="margin-top: 10px;width: 30%"></el-skeleton-item>
              <el-skeleton-item variant="text" style="margin-left:40px;width: 40%"></el-skeleton-item>
              <el-skeleton-item variant="text" style="margin-top: 10px"></el-skeleton-item>
            </el-card>
          </template>
          <template v-slot:default>
            <el-card class="ListCard" body-style="padding:0px" shadow="hover" v-for="item in list" :key="item.id">
              <router-link :to="{path:'/playlist',query:{id:item.id}}"><img alt="img" :src="item.picUrl"/></router-link>
              <el-tooltip effect="dark" content="播放量" placement="top">
                <i class="el-icon-headset"/>
              </el-tooltip>
              <span class="PlayCountSpan">{{item.playCount}}</span>
              <el-tooltip effect="dark" content="播放" placement="top">
                <el-button type="text" size="mini" style="float: right;margin:5px 10px 0 0;padding: 0">
                  <i class="el-icon-video-play"/>
                </el-button>
              </el-tooltip>
              <hr/>
              <router-link :to="{path:'/playlist',query:{id:item.id}}"><p class="Description">{{item.description}}</p></router-link>
            </el-card>
          </template>
        </el-skeleton>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "HotRecommend",
  data(){
    return{
      loading:true,
      list:[]
    }
  },
  methods:{
    //获取热门推荐数据
    GetHotRecommend(){
      this.loading = true
      request.get("/personalized",{params:{limit:8}}).then(res=>{
        for(let i = 0;i<res.result.length;i++){
          //解构赋值，获取需要的数据
          let {id,picUrl,playCount,name:description} = res.result[i]
          picUrl += '?param=158y158'
          this.list.push(
              {
                id, //歌单ID
                picUrl, //歌单图片
                playCount, //播放量
                description //歌单标题
              }
          )
        }
        //对播放量进行格式化
        this.PlayCountFormat()
        this.loading = false
      })
    },
    //格式化播放量
    PlayCountFormat(){
      this.list.forEach(item=>{
        if(item.playCount>=100000){
          item.playCount = Math.floor(item.playCount /= 10000) + "万"
        }
      })
    }
  },
  mounted() {
    this.GetHotRecommend()
  }
}
</script>

<style scoped>

  .HotTopArea{
    border-bottom:2px solid #C10D0C;
    height: 33px;
  }
  .el-icon-s-help{
    font-size: 20px;
    color: red;
  }
  .el-icon-headset{
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 5px;
  }
  .el-icon-video-play{
    font-size: 20px;
    font-weight: bold;
    color: red;
  }
  .HotRecommendTitle{
    font-size: 20px;
    margin: 0 20px 0 10px;
  }
  .HotTopAreaSpan{
    margin: 0 10px;
    color: #ccc;
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
  .PlayCountSpan{
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
  }
  .Description{
    font-size: 14px;
    padding: 0 5px;
  }

</style>