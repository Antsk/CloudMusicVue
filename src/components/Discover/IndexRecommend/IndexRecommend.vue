<template>
  <div>
    <Banner></Banner>
    <div class="DiscoverWrap">
      <div class="RecommendWrap">
        <HotRecommend></HotRecommend>
        <NewAlbum></NewAlbum>
        <TopList></TopList>
      </div>
      <div class="InfoWrap">
        <UserInfo></UserInfo>
        <SingerInfo></SingerInfo>
        <DJInfo></DJInfo>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/Discover/IndexRecommend/Banner/Banner";
import HotRecommend from "@/components/Discover/IndexRecommend/Recommends/HotRecommend"
import UserInfo from "@/components/Discover/IndexRecommend/Info/UserInfo";
import NewAlbum from "@/components/Discover/IndexRecommend/Recommends/NewAlbum";
import TopList from "@/components/Discover/IndexRecommend/Recommends/HotTopList/TopList";
import SingerInfo from "@/components/Discover/IndexRecommend/Info/SingerInfo";
import DJInfo from "@/components/Discover/IndexRecommend/Info/DJInfo";

export default {
  name: "IndexRecommend",
  components:{Banner,HotRecommend,UserInfo,NewAlbum,TopList,SingerInfo,DJInfo},

}
</script>

<style scoped>
  .DiscoverWrap{
    width: 1000px;
    min-height: 700px;
    margin: 0 auto;
    display: flex;
  }
  .RecommendWrap{
    width: 730px;
  }
  .InfoWrap{
    width: 265px;
    margin-left: 5px;
  }
</style>