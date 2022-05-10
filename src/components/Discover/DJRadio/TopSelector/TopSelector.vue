<template>
  <div class="swiper-container">
    <div class="swiper" :style="{transform : 'translateX('+ X + 'px)'}">
      <div class="swiper-item">
        <div class="dj-cateList-wrap">
            <router-link :to="{path:'/discover/djradio',query:{id:item.id}}" v-for="item in cateList" :key="item.id">
              <div class="dj-cateList-item" :class="{active:item.id == CateID}">
                <div class="dj-cateList-item-img" :class="{active:item.id == CateID}" :style="{backgroundImage:'url(' + item.picWebUrl + ')'}"></div>
                <div class="dj-cateList-item-font">{{ item.name }}</div>
              </div>
            </router-link>
        </div>
      </div>
      <div class="swiper-item">
        <div class="dj-cateList-wrap">
          <router-link to="/">
            <div class="dj-cateList-item" >
              <div style="width:48px;height:48px;margin:2px auto 0;background-image: url('https://music.163.com/style/web2/img/index_radio/radio_faq.png')"></div>
              <div class="dj-cateList-item-font">常见问题</div>
            </div>
          </router-link>
          <router-link to="/">
            <div class="dj-cateList-item" >
              <div style="width:48px;height:48px;margin:2px auto 0;background-image: url('https://music.163.com/style/web2/img/index_radio/radio_apply.png')"></div>
              <div class="dj-cateList-item-font">我要做主播</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <i class="el-icon-arrow-left" @click="left"/>
    <i class="el-icon-arrow-right" @click="right"/>
    <div class="swiper-radio-wrap">
      <a class="swiper-radio" :class="{active:index === 1}" @click="change(1)"></a>
      <a class="swiper-radio" :class="{active:index === 2}" @click="change(2)"></a>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "TopSelector",
  data(){
    return{
      X:0,
      index:1,
      cateList:[]
    }
  },
  methods:{
    left(){
      if(this.index === 1){
        this.X -= 958
        this.index = 2
      }else{
        this.index--
        this.X += 958
      }
    },
    right(){
      if(this.index === 2){
        this.X += 958
        this.index = 1
      }else{
        this.index++
        this.X -= 958
      }
    },
    change(ind){
      this.index = ind
      this.X = 0
      this.X -= (ind-1)*958
    },
    //获取电台分类数据
    GetCateList(){
      request.get("/dj/catelist").then(res=>{
        for(let i = 0;i < res.categories.length;i++){
          let {picWebUrl,name,id} = res.categories[i]
          this.cateList.push({
            picWebUrl, //电台分类图片地址
            name, //电台分类名字
            id  //电台分类ID
          })
        }
      })
    }
  },
  mounted() {
    this.GetCateList()
  },
  computed:{
    CateID(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped>

  .dj-cateList-wrap{
    display: grid;
    grid-template-columns: repeat(9,70px);
    grid-template-rows: repeat(2,1fr);
    justify-content: space-between;
    gap: 30px 20px;
  }
  .dj-cateList-item{
    display: inline-block;
    height: 70px;
    width: 70px;
    text-align: center;
    border-radius: 4px;
  }
  .dj-cateList-item:hover{
    background-color: #F5F5F5;
  }
  .dj-cateList-item.active{
    color: #C10D0C;
    border-radius: 4px;
    background-image: url("https://s2.music.126.net/style/web2/img/index_radio/radio_bg.png?e7059a9db20af85eaf26b0f214012062");
    background-position-x: -70px;
  }
  .dj-cateList-item-img.active,.dj-cateList-item:hover .dj-cateList-item-img{
    background-position-x: -48px;
  }
  .dj-cateList-item-img{
    width: 48px;
    height: 48px;
    margin: 2px auto 0;
  }
  .dj-cateList-item-font{
    font-size: 13px;
  }
  .el-icon-arrow-left{
    position: absolute;
    top: 45%;
    left: 10px;
    font-size: 30px;
    cursor: pointer;
    opacity: 0.5;
  }
  .el-icon-arrow-right{
    position: absolute;
    top: 45%;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
    opacity: 0.5;
  }
  .el-icon-arrow-left:hover,.el-icon-arrow-right:hover{
    opacity: 1;
  }
  .swiper-container{
    overflow: hidden;
    width: 100%;
    height: 250px;
    position: relative;
  }
  .swiper{
    display: flex;
    height: 250px;
    transition-duration: 300ms;
  }
  .swiper-item{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 958px;
    flex-shrink: 0;
  }
  .swiper-radio.active,.swiper-radio:hover{
    opacity: 1;
    background-color: #C10D0C;
  }
  .swiper-radio{
    opacity: 0.3;
    width: 10px;
    height: 10px;
    background-color: #999999;
    border-radius: 50%;
    display: inline-block;
    margin: 0 5px
  }
  .swiper-radio-wrap{
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
  }
</style>