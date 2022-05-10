<template>
  <div>
    <div class="item-wrap">
      <div class="item" v-for="item in List" :key="item.albumID">
        <div class="item-img-wrap">
          <router-link class="item-img" :to="{path:'/album',query:{id:item.albumID}}">
            <el-image :src="item.picUrl"/>
            <el-tooltip effect="dark" content="播放" placement="bottom" :open-delay="500">
              <i class="el-icon-video-play"/>
            </el-tooltip>
          </router-link>
        </div>
        <div class="item-info">
          <el-tooltip effect="dark" :content="item.albumName" placement="top" :open-delay="1000">
            <p class="item-info-p1"><router-link :to="{path:'/album',query:{id:item.albumID}}">{{ item.albumName }}</router-link></p>
          </el-tooltip>
          <p class="item-info-p2">{{ item.publishTime }}</p>
        </div>
      </div>
    </div>
    <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        :disabled="pageDisable"
        layout="prev, pager, next"
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-count="Math.ceil(size/12)">
    </el-pagination>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ArtistAlbum",
  data(){
    return{
      List:[],
      size:0,
      currentPage:1,
      pageDisable:false,
    }
  },
  methods:{
    getArtistAlbumData(){
      request.get('/artist/album',{params:{id:this.id,offset:(this.currentPage-1)*12,limit:12}}).then(res=>{
        this.List = []
        this.size = res.artist.albumSize
        for (let i = 0;i < res.hotAlbums.length;i++){
          let {id:albumID,name:albumName,publishTime,picUrl} = res.hotAlbums[i]
          picUrl += '?param=130y130'
          publishTime = this.$moment.unix(publishTime / 1000).format('yyyy.MM.DD')
          this.List.push({
            albumID,  //专辑ID
            albumName,  //专辑名
            picUrl,   //专辑封面地址
            publishTime //专辑发布时间
          })
        }
      })
    },
    pageChange(){
      this.getArtistAlbumData()
    }
  },
  mounted() {
    this.getArtistAlbumData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getArtistAlbumData()
    }
  }
}
</script>

<style scoped>
  .item-wrap{
    display: grid;
    grid-template-columns: repeat(4,153px);
    gap: 30px 30px;
  }
  .item{
    width: 153px;
    height: 173px;
  }
  .item-img-wrap{
    width: 153px;
    height: 130px;
    background: url("https://s2.music.126.net/style/web2/img/coverall.png?75ce2e07c15efa05e69f5595103aa710") no-repeat 0 -845px;
  }
  .item-img{
    display: block;
    width: 130px;
    height: 130px;
    position: relative;
  }
  .el-icon-video-play{
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 30px;
    display: none;
    color: #c2c2c2;
  }
  .el-icon-video-play:hover{
    color: #C10D0C;
  }
  .item-img:hover .el-icon-video-play{
    display: block;
  }
  .item-info-p1{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 15px;
    margin: 3px 0;
  }
  .item-info-p1>a{
    color: #000000;
  }
  .item-info-p1>a:hover{
    text-decoration: underline #000000;
  }
  .item-info-p2{
    color: #666666;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>