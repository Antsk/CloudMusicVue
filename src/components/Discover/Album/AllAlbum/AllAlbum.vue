<template>
  <div class="all-album-wrap">
    <div class="head-area">
      <h1>全部新碟</h1>
      <div class="head-filter-wrap">
        <router-link :class="{active:area === 'ALL'}" :to="{path:'/discover/album',query:{area:'ALL'}}">全部</router-link>
        <el-divider direction="vertical"/>
        <router-link :class="{active:area === 'ZH'}" :to="{path:'/discover/album',query:{area:'ZH'}}">华语</router-link>
        <el-divider direction="vertical"/>
        <router-link :class="{active:area === 'EA'}" :to="{path:'/discover/album',query:{area:'EA'}}">欧美</router-link>
        <el-divider direction="vertical"/>
        <router-link :class="{active:area === 'KR'}" :to="{path:'/discover/album',query:{area:'KR'}}">韩国</router-link>
        <el-divider direction="vertical"/>
        <router-link :class="{active:area === 'JP'}" :to="{path:'/discover/album',query:{area:'JP'}}">日本</router-link>
      </div>
    </div>
    <el-divider class="my-divider"/>
    <el-skeleton :loading="skeLoading">
      <template v-slot:template>
        <div style="text-align: center;width: 200px;margin: 100px auto;color: #c2c2c2">
          <i class="el-icon-loading" style="font-size: 20px"/>
          <span style="margin-left: 10px;font-size: 20px">加载中...</span>
        </div>
      </template>
      <template v-slot:default>
        <Item :List="showList"/>
      </template>
    </el-skeleton>
    <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        :disabled="pageDisable"
        layout="prev, pager, next"
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-count="Math.ceil(albumList.length/35)">
    </el-pagination>
  </div>
</template>

<script>
import request from "@/utils/request";
import Item from "@/components/Discover/Album/Item/Item";

export default {
  name: "AllAlbum",
  components:{Item},
  data(){
    return{
      albumList:[],
      showList:[],
      currentPage:1,
      skeLoading:false,
      pageDisable:false
    }
  },
  methods:{
    getAlbums(){
      this.skeLoading = true
      this.pageDisable = true
      request.get("/top/album",{params:{area:this.area}}).then(res=>{
        this.albumList = []
        for (let i = 0;i < res.monthData.length;i++){
          let {name:albumName,id:albumID,picUrl,artist:{id:artistID,name:artistName}} = res.monthData[i]
          picUrl += '?param=130y130'
          this.albumList.push({
            albumID,  //专辑ID
            albumName,  //专辑名
            picUrl, //专辑封面地址
            artistName, //歌手名
            artistID  //歌手ID
          })
        }
        this.cutAlbumList(0)
        this.skeLoading = false
        this.pageDisable = false
      })
    },
    cutAlbumList(cutLength){
      this.showList = this.albumList.slice(cutLength*35,(cutLength+1)*35)
    },
    pageChange(page){
      scrollTo(0,567)
      this.cutAlbumList(page-1)
    }
  },
  computed:{
    area(){
      if(this.$route.query.area === undefined) return "ALL"
      else return this.$route.query.area
    }
  },
  watch:{
    area(){
      this.currentPage = 1
      this.getAlbums()
    }
  },
  mounted() {
    this.getAlbums()
  }
}
</script>

<style scoped>

  .all-album-wrap{
    margin-top: 30px;
  }
  .my-divider{
    background-color: #C10D0C;
    margin: 12px 0;
    height: 2px;
  }
  .head-area{
    display: flex;
    align-items: end;
  }
  .head-filter-wrap{
    margin-left: 20px;
  }
  .active{
    color: #C10D0C;
  }
</style>