<template>
  <el-card class="right-card-wrap">
    <h1>{{ title }}</h1>
    <el-divider class="my-divider"/>
    <div class="filler-wrap">
      <router-link class="filter-link" :class="{active:item.initial == initial}" :to="{path:'/discover/artist',query:{area:area,type:type,initial:item.initial}}" v-for="item in filterInitial">{{ item.name }}</router-link>
    </div>
    <el-skeleton :loading="skeLoading">
      <template v-slot:template>
        <div style="text-align: center;width: 200px;margin: 200px auto;color: #c2c2c2">
          <i class="el-icon-loading" style="font-size: 20px"/>
          <span style="margin-left: 10px;font-size: 20px">加载中...</span>
        </div>
      </template>
      <template v-slot:default>
        <div class="item-wrap">
          <div class="item" v-for="item in singerList" :key="item.id">
            <div style="overflow: hidden">
              <router-link :to="{path:'/artist',query:{id:item.id}}" class="item-img">
                <el-image lazy :src="item.img1v1Url" style="overflow: hidden"></el-image>
              </router-link>
            </div>
            <div class="item-info">
              <router-link to="/">{{ item.singerName }}</router-link>
              <router-link to="/"><i class="el-icon-user-solid"/></router-link>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RightContainer",
  data(){
    return{
      skeLoading:false,
      singerList:[],
      filterInitial:[
        {
          name:'热门',
          initial:-1
        },
        {
          name:'A',
          initial:'A'
        },
        {
          name:'B',
          initial:'B'
        },
        {
          name:'C',
          initial:'C'
        },
        {
          name:'D',
          initial:'D'
        },
        {
          name:'E',
          initial:'E'
        },
        {
          name:'F',
          initial:'F'
        },
        {
          name:'G',
          initial:'G'
        },
        {
          name:'H',
          initial:'H'
        },
        {
          name:'I',
          initial:'I'
        },
        {
          name:'J',
          initial:'J'
        },
        {
          name:'K',
          initial:'K'
        },
        {
          name:'L',
          initial:'L'
        },
        {
          name:'M',
          initial:'M'
        },
        {
          name:'N',
          initial:'N'
        },
        {
          name:'O',
          initial:'O'
        },
        {
          name:'P',
          initial:'P'
        },
        {
          name:'Q',
          initial:'Q'
        },
        {
          name:'R',
          initial:'R'
        },
        {
          name:'S',
          initial:'S'
        },
        {
          name:'T',
          initial:'T'
        },
        {
          name:'U',
          initial:'U'
        },
        {
          name:'V',
          initial:'V'
        },
        {
          name:'W',
          initial:'W'
        },
        {
          name:'X',
          initial:'X'
        },
        {
          name:'Y',
          initial:'Y'
        },
        {
          name:'Z',
          initial:'Z'
        },
        {
          name:'其他',
          initial:0
        },
      ]
    }
  },
  methods:{
    getSingerList(){
      this.skeLoading = true
      request.get("/artist/list",{params:{limit:100,area:this.area,type:this.type,initial:this.initial}}).then(res=>{
        this.singerList = []
        for (let i = 0;i < res.artists.length;i++){
          let {id,name:singerName,img1v1Url} = res.artists[i]
          img1v1Url += '?param=140y140'
          this.singerList.push({
            id, //歌手id
            singerName, //歌手名
            img1v1Url  //歌手图片地址
          })
        }
        this.skeLoading = false
      })
    }
  },
  computed:{
    area(){
      if(this.$route.query.area === undefined) return -1
      else return this.$route.query.area
    },
    type(){
      if(this.$route.query.type === undefined) return -1
      else return this.$route.query.type
    },
    initial(){
      if(this.$route.query.initial === undefined) return -1
      else return this.$route.query.initial
    },
    title(){
      if(this.area == -1) return '推荐歌手'
      if(this.area == 7) return '华语'
      if(this.area == 96) return '欧美'
      if(this.area == 8) return '日本'
      if(this.area == 16) return '韩国'
      if(this.area == 0) return '其他'
    }
  },
  watch:{
    area(){
      this.getSingerList()
    },
    type(){
      this.getSingerList()
    },
    initial(){
      this.getSingerList()
    }
  },
  mounted() {
    this.getSingerList()
  }
}
</script>

<style scoped>

  .el-icon-user-solid{
    color: #C10D0C;
  }
  .right-card-wrap{
    width: 795px;
    margin: 5px 0 0 5px;
  }
  h1{
    margin-top: 20px;
  }
  .my-divider{
    background-color: #C10D0C;
    height: 3px;
    margin: 18px 0;
  }
  .filler-wrap{
    margin-bottom: 18px;
  }
  .filler-wrap a:nth-child(1){
    width: 48px;
  }
  .filler-wrap a:nth-last-child(1){
    width: 48px;
  }
  .filter-link{
    font-size: 14px;
    display: inline-block;
    height: 25px;
    width: 25px;
    text-align: center;
  }
  .filter-link.active{
    background-color: #C20C0C;
    border-radius: 2px;
    color: #FFFFFF;
  }
  .item-wrap{
    display: grid;
    grid-template-columns: repeat(5,140px);
    gap: 13px;
  }
  .item-img{
    display: block;
    width: 140px;
    height: 140px;
  }
  .item-img:hover{
    transform: scale(1.2);
    transition: .5s;
  }
  .item-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 5px 0 10px 0 ;
  }
</style>