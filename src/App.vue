<template>
  <div id="app">
    <MainHeader></MainHeader>
    <router-view></router-view>
    <Footer></Footer>
    <el-backtop :bottom="100"/>
    <Music/>
  </div>
</template>

<script>
import MainHeader from "@/components/Header/MainHeader"
import Banner from "@/components/Discover/IndexRecommend/Banner/Banner"
import Footer from "@/components/Footer/Footer";
import Music from "@/components/Music/Music";


export default {
  name: 'App',
  components:{
    MainHeader,
    Banner,
    Footer,
    Music
  },
}
</script>

<style>
  #app{
    min-width: 1519px;
  }
  .el-menu--popup{
    min-width: 100px !important;
  }
  .el-submenu__title{
    height: 70px !important;
    line-height: 70px !important;
  }
  .el-input__inner{
    border-radius: 32px !important;
  }

</style>
