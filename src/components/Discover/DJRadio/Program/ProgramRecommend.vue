<template>
  <div class="p-recommend-wrap">
    <div class="head-area">
      <h1>推荐节目</h1>
      <div>
        <router-link to="/">更多</router-link>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <el-card class="item-card" shadow="hover" body-style="padding:10px" v-for="item in ProgramList" :key="item.programID">
      <div class="item">
        <router-link class="item-img-wrap" to="/">
          <img class="item-img" alt="img" :src="item.coverUrl"/>
          <i class="el-icon-video-play" @click.prevent=""/>
        </router-link>
        <div class="item-info">
          <p class="item-info-p1">
            <el-tooltip effect="dark" :content="item.programName" placement="top" :open-delay="1000">
              <router-link to="/">{{ item.programName }}</router-link>
            </el-tooltip>
          </p>
          <p class="item-info-p2">
            <el-tooltip effect="dark" :content="item.radioName" placement="bottom" :open-delay="1000">
              <router-link to="/">{{ item.radioName }}</router-link>
            </el-tooltip>
          </p>
        </div>
        <div class="item-tag">
          <el-tag type="info"><router-link :to="{path:'/discover/djradio'}">{{ item.category }}</router-link></el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ProgramRecommend",
  data(){
    return{
      ProgramList:[]
    }
  },
  methods:{
    getRecommendProgram(){
      request.get("/program/recommend").then(res=>{
        for (let i = 0;i < res.programs.length;i++){
          let {id:programID,name:programName,coverUrl,radio:{category,id:radioID,name:radioName}} = res.programs[i]
          coverUrl += '?param=40y40'
          this.ProgramList.push({
            programID,  //节目ID
            programName,  //节目名
            coverUrl, //节目封面地址
            radioID,  //电台ID
            radioName,  //电台名
            category  //电台分类
          })
        }
      })
    },
  },
  mounted() {
    this.getRecommendProgram()
  }
}
</script>

<style scoped>
  .p-recommend-wrap{
    width: 450px;
  }
  .head-area{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 6px;
    border-bottom: 2px solid #C10D0C;
  }
  .el-icon-arrow-right{
    margin-left: 5px;
    color: red;
  }
  .item{
    display: flex;
    align-items: center;
  }
  .item-img-wrap{
    display: block;
    position: relative;
  }
  .el-icon-video-play{
    position: absolute;
    top: 25%;
    left: 25%;
    color: #c2c2c2;
    font-size: 22px;
    display: none;
  }
  .item-card:hover .el-icon-video-play{
    display:block;
  }
  .el-icon-video-play:hover{
    color: #C10D0C;
  }
  .item-img{
    width: 40px;
    height: 40px;
  }
  .item-info{
    width: 280px;
    margin-left: 8px;
  }
  .item-info-p1{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 2px 0;
  }
  .item-info-p2{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info-p2>a{
    color: #999999;
  }
  .item-info-p2>a:hover{
    color: #C10D0C;
  }
  .item-tag{
    margin-left: 8px;
  }
</style>