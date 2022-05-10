<template>
  <div class="LeftAsideWrap">
    <el-card class="MainCardWrap" body-style="padding:0px">
      <h2 class="Title">云音乐特色榜</h2>


        <el-skeleton :loading="SkeletonLoading" animated :count="4">
          <template v-slot:template>
            <el-card shadow="hover" class="list-card" >
              <div style="display: flex">
                <el-skeleton-item variant="image" style="width: 50px;height: 50px;flex-shrink: 0"></el-skeleton-item>
                <div style="margin-left:10px;width: 100%;">
                  <el-skeleton-item variant="text" style="width: 70%"></el-skeleton-item>
                  <el-skeleton-item variant="text" style="margin-top: 10px;width: 50%"></el-skeleton-item>
                </div>
              </div>
            </el-card>
          </template>

          <template v-slot:default>
            <div style="display: flex;flex-direction: column">
              <el-card
                  class="list-card"
                  shadow="hover"
                  v-for="item in featureList"
                  :key="item.id"
                  :class="{active: item.id == queryID}"
              >
                <router-link :to="{path:'/discover/toplist',query:{id:item.id}}">
                  <div class="list-card-flex-wrap">
                    <img class="IMG" alt="logo" :src="item.coverImgUrl"/>
                    <div class="list-name-wrap">
                      <el-tooltip effect="dark" :content="item.ListName" placement="top" :open-delay="500">
                        <h3 class="list-h3">{{item.ListName}}</h3>
                      </el-tooltip>
                      <span class="update-span">{{ item.updateFrequency }}</span>
                    </div>
                  </div>
                </router-link>
              </el-card>
            </div>
          </template>
        </el-skeleton>


      <el-divider/>

      <h2 class="Title">全球媒体榜</h2>


      <el-skeleton :loading="SkeletonLoading" animated :count="31">
        <template v-slot:template>
          <el-card shadow="hover" class="list-card" >
            <div style="display: flex;width: 208px">
              <el-skeleton-item variant="image" style="width: 50px;height: 50px;flex-shrink: 0"></el-skeleton-item>
              <div style="margin-left:10px;width: 100%;">
                <el-skeleton-item variant="text" style="width: 70%"></el-skeleton-item>
                <el-skeleton-item variant="text" style="margin-top: 10px;width: 50%"></el-skeleton-item>
              </div>
            </div>
          </el-card>
        </template>

        <template v-slot:default>
          <div style="display: flex;flex-direction: column">
            <el-card
                class="list-card"
                shadow="hover"
                v-for="item in globalList"
                :key="item.id"
                :class="{active: item.id == queryID}"
            >
              <router-link :to="{path:'/discover/toplist',query:{id:item.id}}">
                <div class="list-card-flex-wrap">
                  <img class="IMG" alt="logo" :src="item.coverImgUrl"/>
                  <div class="list-name-wrap">
                    <el-tooltip effect="dark" :content="item.ListName" placement="top" :open-delay="500">
                      <h3 class="list-h3">{{item.ListName}}</h3>
                    </el-tooltip>
                    <span class="update-span">{{ item.updateFrequency }}</span>
                  </div>
                </div>
              </router-link>
            </el-card>
          </div>
        </template>
      </el-skeleton>

    </el-card>
  </div>

</template>

<script>
import request from "@/utils/request";
import {mapState} from "vuex";

export default {
  name: "CloudMusicList",
  data(){
    return{
      SkeletonLoading: true,
      AllTopListData:[],
      featureList:[],
      globalList:[],
    }
  },
  methods:{
    GetAllTopList(){
      this.SkeletonLoading = true
      request.get("/toplist").then(res=>{
        for(let i = 0;i < res.list.length;i++){
          let {id,name:ListName,updateFrequency,coverImgUrl} = res.list[i]
          coverImgUrl += '?param=50y50'
          this.AllTopListData.push({
            id, //歌单ID
            ListName, //歌单名
            updateFrequency, //歌单更新频率
            coverImgUrl //歌单封面
          })
        }
        this.featureList = this.AllTopListData.slice(0,4)
        this.globalList = this.AllTopListData.slice(5)
        this.SkeletonLoading = false
      })
    }
  },
  mounted() {
    this.GetAllTopList()
  },
  computed:{
    queryID(){
      if(this.$route.query.id === undefined) return 19723756
      else return this.$route.query.id
    }
  }
}
</script>

<style scoped>


  .LeftAsideWrap{
    width: 250px;
  }
  .MainCardWrap{
    margin-top: 10px;
  }
  .Title{
    margin: 20px;
  }
  .list-card{
    border-radius: 0;
    border: none;
    cursor: pointer;
  }
  .list-card.active{
    background-color: #E6E6E6;
  }
  .list-card:hover{
    background-color: #F4F2F2;
  }
  .list-card-flex-wrap{
    display: flex;
  }
  .list-name-wrap{
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .list-h3{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .update-span{
    display: block;
    margin-top: 5px;
    color: #999;
  }
</style>