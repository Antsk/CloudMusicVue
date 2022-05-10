<template>
  <div class="p-ranking-wrap">
    <div class="head-area">
      <h1>节目排行榜</h1>
      <div>
        <span class="updateTime">更新时间：{{updateTime}}</span>
        <router-link to="/">更多</router-link>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <el-card class="item-card" shadow="hover" body-style="padding:10px" v-for="item in ProgramRankingList" :key="item.programID">
      <div class="item">
        <div class="item-ranking">
          <span class="item-ranking-rank" :class="{red:item.rank <= 3}">{{ item.rank }}</span>
          <i class="el-icon-top" v-if="(item.lastRank - item.rank) > 0">{{ item.lastRank - item.rank }}</i>
          <i class="el-icon-bottom" v-if="(item.lastRank - item.rank) < 0">{{ Math.abs(item.lastRank - item.rank) }}</i>
          <i class="el-icon-minus" v-if="(item.lastRank - item.rank) === 0">{{ item.lastRank - item.rank }}</i>
        </div>
        <router-link class="item-img-wrap" to="/">
          <img class="item-img" alt="img" :src="item.coverUrl"/>
          <i class="el-icon-video-play"/>
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
        <div class="item-progress">
          <el-tooltip effect="dark" :content="'热度值：' + item.score" placement="top" :open-delay="1000">
            <el-progress :percentage="Math.floor(item.score/1000)" :show-text="false" :stroke-width="9" color="#C6C6C6"></el-progress>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ProgramRanking",
  data(){
    return{
      ProgramRankingList:[],
      updateTime:''
    }
  },
  methods:{
    getProgramRanking(){
      request.get("/dj/program/toplist",{params:{limit:10}}).then(res=>{
        this.updateTime = this.$moment(res.updateTime).format('M月DD日 HH:mm')
        for (let i = 0;i < res.toplist.length;i++){
          let {rank,lastRank,score,program:{id:programID,name:programName,coverUrl,radio:{id:radioID,name:radioName}}} = res.toplist[i]
          coverUrl += '?param=40y40'
          this.ProgramRankingList.push({
            rank, //节目当前排行
            lastRank, //节目上一次排行
            score,  //节目排行得分
            programID,  //节目ID
            programName,  //节目名
            coverUrl, //节目封面地址
            radioID,  //电台ID
            radioName //电台名
          })
        }
      })
    }
  },
  mounted() {
    this.getProgramRanking()
  }
}
</script>

<style scoped>

  .p-ranking-wrap{
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
  .updateTime{
    font-size: 14px;
    font-weight: bold;
    margin-right: 10px;
  }
  .item{
    display: flex;
    align-items: center;
  }
  .item-ranking{
    width: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }
  .item-ranking-rank{
    font-size: 14px;
  }
  .item-ranking-rank.red{
    color: #C10D0C;
  }
  .el-icon-top{
    color: #C10D0C;
    font-size: 14px;
  }
  .el-icon-bottom{
    color: #4AB8EA;
    font-size: 14px;
  }
  .el-icon-minus{
    color: #999999;
    font-size: 14px;
  }
  .item-img-wrap{
    display: block;
    position: relative;
    margin-left: 8px;
    flex-shrink: 0;
  }
  .item-img{
    width: 40px;
    height: 40px;
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
  .item-info{
    width: 220px;
    margin-left: 8px;
    flex-shrink: 0;
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
  .item-progress{
    width: 100px;
    flex-shrink: 0;
    margin-left: 10px;
  }
</style>