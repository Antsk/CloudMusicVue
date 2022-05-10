<template>
  <div class="radio-ranking-wrap">
    <h1>电台排行榜</h1>
    <el-skeleton :loading="skeLoading">
      <template v-slot:template>
        <div style="text-align: center;width: 200px;margin: 100px auto;color: #c2c2c2">
          <i class="el-icon-loading" style="font-size: 20px"/>
          <span style="margin-left: 10px;font-size: 20px">加载中...</span>
        </div>
      </template>
      <template v-slot:default>
        <div style="display: grid;grid-template-columns: repeat(2,1fr);gap:20px;justify-content: space-between;margin-top: 20px">
          <div class="item" v-for="item in RadioRankingList">
            <router-link to="/">
              <el-image lazy class="item-img" :src="item.picUrl"/>
            </router-link>
            <div class="item-info">
              <h3 class="item-name">
                <el-tooltip effect="dark" :content="item.name" placement="top" :open-delay="1000">
                 <router-link to="/">{{ item.name }}</router-link>
                </el-tooltip>
              </h3>
              <div class="item-info-author">
                <i class="el-icon-user" />
                <router-link to="/">{{ item.nickname }}</router-link>
              </div>
              <p class="item-info-subInfo">共{{ item.programCount }}期&nbsp;&nbsp;&nbsp;&nbsp;订阅{{ item.subCount }}次</p>
            </div>
          </div>
        </div>
        <div>
          <div style="width: 200px;margin: 100px auto;text-align: center;font-size: 20px" v-if="RadioRankingList.length === 0">
            暂无电台
          </div>
        </div>
      </template>
    </el-skeleton>

    <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        @current-change="pageChange"
        :page-count="Math.ceil(RadioCount/30)">
    </el-pagination>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RadioRanking",
  data(){
    return{
      skeLoading:true,
      RadioRankingList:[],
      RadioCount: 0,
      currentPage:1
    }
  },
  methods:{
    getRadioRanking(){
      this.skeLoading = true
      this.RadioRankingList = []
      request.get("/dj/radio/hot",{params:{cateId:this.id,offset:(this.currentPage-1)*30,limit:30}}).then(res=>{
        this.RadioCount = res.count
        for (let i = 0;i < res.djRadios.length;i++){
          let {id,name,picUrl,programCount,subCount,dj:{userId,nickname}} = res.djRadios[i]
          picUrl += '?param=120y120'
          this.RadioRankingList.push({
            id, //电台ID
            name, //电台名字
            picUrl, //电台封面地址
            programCount, //电台节目期数
            subCount, //电台订阅次数
            userId, //电台创建用户ID
            nickname  //电台创建用户名
          })
        }
        this.skeLoading = false
      })
    },
    pageChange(page){
      this.currentPage = page
      this.getRadioRanking()
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.currentPage = 1
      this.getRadioRanking()
    }
  },
  mounted() {
    this.getRadioRanking()
  }
}
</script>

<style scoped>
  .radio-ranking-wrap{
    margin-top: 30px;
  }
  h1{
    border-bottom: 2px solid #C10D0C;
    padding-bottom: 10px;
  }
  .item{
    display: flex;
    padding-bottom: 20px;
    border-bottom: 1px solid #e7e7e7;
  }
  .item-img{
    width: 120px;
    height: 120px;
  }
  .item-info{
    margin-left: 15px;
  }
  .item-info>h3{
    font-size: 20px;
    height: 64px;
    line-height: 64px;
  }
  .item-name{
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .item-info-author{
    font-size: 14px;
    margin-bottom: 8px;
  }
  .el-icon-user{
    margin-right: 5px;
    font-weight: bold;
  }
  .item-info-subInfo{
    color: #999999;
    font-size: 13px;
  }
</style>