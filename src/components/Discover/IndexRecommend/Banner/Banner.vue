<template>
  <div id="Banner">
    <div class="BannerWrap">
      <el-carousel :interval="5000" arrow="always" @change="SetBackground" height="364px">
        <el-carousel-item v-for="(BannerSrcValue,index) in BannerSrc" :key="index">
          <router-link to="/"><img class="BannerImg" :src="BannerSrcValue" alt="banner"></router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="BannerBackground" :style="{backgroundImage: 'url(' + BannerBackgroundSrc + ')'}"></div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Banner",
  data(){
    return{
      BannerBackgroundSrc:"",
      BannerSrc:[],
    }
  },
  methods:{
    SetBackground(index){
      this.BannerBackgroundSrc = this.BannerSrc[index]
    },
    GetBanner(){
      request.get("/banner",{params:{type:0}}).then(res=>{
        this.BannerSrc = res.banners.map(v => v.imageUrl)
        this.SetBackground(0)
      })
    }
  },
  mounted() {
    this.GetBanner()
  },
}
</script>

<style scoped>
#Banner{
  position: relative;
}
#BannerBackground{
  width: 100%;
  height: 100%;
  filter: blur(15px);
  position: absolute;
  top: 0;
  z-index: -1;
}
.BannerWrap{
  position: relative;
  width: 1000px;
  height: 364px;
  margin: 0 auto;
  z-index: 9;
}
.BannerImg{
  width: 1000px;
}
</style>