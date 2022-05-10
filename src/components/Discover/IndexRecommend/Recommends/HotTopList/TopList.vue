<template>
  <el-card style="margin-top: 10px">
    <div class="TopArea">
      <i class="el-icon-s-help"/>
      <router-link :to="{path:'/discover/toplist'}"><span class="TopListTitle">榜单</span></router-link>
      <span class="More">
        <router-link :to="{path:'/discover/toplist'}">更多</router-link>
        <i class="el-icon-right"/>
      </span>
    </div>

    <div class="TopListItemWrap">
      <TopListItem :topListID="TopIncreaseID" Title="飙升榜" TitleImgSrc="http://p3.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg?param=80y80" ></TopListItem>
      <TopListItem :topListID="TopNewSongID" Title="新歌榜"  TitleImgSrc="http://p3.music.126.net/wVmyNS6b_0Nn-y6AX8UbpQ==/109951166952686384.jpg?param=80y80" ></TopListItem>
      <TopListItem :topListID="TopOriginalID" Title="原创榜" TitleImgSrc="http://p3.music.126.net/iFZ_nw2V86IFk90dc50kdQ==/109951166961388699.jpg?param=80y80" ></TopListItem>
    </div>
  </el-card>
</template>

<script>
import TopListItem from "@/components/Discover/IndexRecommend/Recommends/HotTopList/TopListItem";
import request from "@/utils/request";

export default {
  name: "TopList",
  components:{TopListItem},
  data(){
    return{
      TopIncreaseID:19723756, //飙升榜歌单ID
      TopNewSongID:3779629, //新歌榜歌单ID
      TopOriginalID:2884035, //原创榜歌单ID
    }
  },
  methods:{

  },
  mounted() {

  }
}
</script>

<style scoped>
  .TopArea{
    border-bottom:2px solid #C10D0C;
    height: 33px;
  }
  .el-icon-s-help{
    font-size: 20px;
    color: red;
  }
  .TopListTitle{
    font-size: 20px;
    margin: 0 20px 0 10px;
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
  .TopListItemWrap{
    margin-top: 10px;
  }
</style>