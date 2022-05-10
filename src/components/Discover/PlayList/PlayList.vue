<template>
  <el-card class="playlist-wrap">
    <div class="head-area-wrap">
      <div class="head-area-left-wrap">
        <h1>{{ cat }}</h1>
        <el-popover
            placement="bottom"
            trigger="hover"
            width="720"
        >
          <div class="pop-head">
            <router-link :to="{path:'/discover/playlist',query:{cat:'全部'}}">
              <el-button size="small">全部风格</el-button>
            </router-link>
          </div>

          <el-divider class="pop-head-divider"/>

          <div class="pop-bottom">

            <div class="pop-bottom-item">
              <div class="pop-bottom-item-left">
                <i class="el-icon-bangzhu pop-icon"/><strong>语种</strong>
              </div>
              <div class="pop-bottom-item-right">
                <div v-for="(item,index) in yuzhongList" :key="index">
                  <router-link :class="{active:$route.query.cat === item}" :to="{path:'/discover/playlist',query:{cat:item}}">{{ item }}</router-link>
                  <el-divider direction="vertical"/>
                </div>
              </div>
            </div>

            <div class="pop-bottom-item">
              <div class="pop-bottom-item-left">
                <i class="el-icon-coffee-cup pop-icon"/><strong>风格</strong>
              </div>
              <div class="pop-bottom-item-right">
                <div v-for="(item,index) in fenggeList" :key="index">
                  <router-link :class="{active:$route.query.cat === item}" :to="{path:'/discover/playlist',query:{cat:item}}">{{ item }}</router-link>
                  <el-divider direction="vertical"/>
                </div>
              </div>
            </div>

            <div class="pop-bottom-item">
              <div class="pop-bottom-item-left">
                <i class="el-icon-sunny pop-icon"/><strong>场景</strong>
              </div>
              <div class="pop-bottom-item-right">
                <div v-for="(item,index) in changjingList" :key="index">
                  <router-link :class="{active:$route.query.cat === item}" :to="{path:'/discover/playlist',query:{cat:item}}">{{ item }}</router-link>
                  <el-divider direction="vertical"/>
                </div>
              </div>
            </div>

            <div class="pop-bottom-item">
              <div class="pop-bottom-item-left">
                <i class="el-icon-mobile-phone pop-icon"/><strong>情感</strong>
              </div>
              <div class="pop-bottom-item-right">
                <div  v-for="(item,index) in qingganList" :key="index">
                  <router-link :class="{active:$route.query.cat === item}" :to="{path:'/discover/playlist',query:{cat:item}}">{{ item }}</router-link>
                  <el-divider direction="vertical"/>
                </div>
              </div>
            </div>

            <div class="pop-bottom-item">
              <div class="pop-bottom-item-left">
                <i class="el-icon-service pop-icon"/><strong>主题</strong>
              </div>
              <div class="pop-bottom-item-right">
                <div v-for="(item,index) in zhutiList" :key="index">
                  <router-link :class="{active:$route.query.cat === item}" :to="{path:'/discover/playlist',query:{cat:item}}">{{item}}</router-link>
                  <el-divider direction="vertical"/>
                </div>
              </div>
            </div>
          </div>

          <el-button slot="reference" size="small">选择分类<i class="el-icon-arrow-down el-icon--right"/></el-button>
        </el-popover>
      </div>
      <div class="head-area-right-wrap">
        <el-button size="small">热门</el-button>
      </div>
    </div>

    <el-skeleton :loading="SkeletonLoading">
      <template v-slot:template>
        <div style="text-align: center;width: 200px;margin: 100px auto;color: #c2c2c2">
          <i class="el-icon-loading" style="font-size: 20px"/>
          <span style="margin-left: 10px;font-size: 20px">加载中...</span>
        </div>
      </template>

      <template v-slot:default>
        <div style="margin-top: 20px;display: grid;grid-template-columns:repeat(5,160px);justify-content: space-between;row-gap: 20px">
          <el-card class="ListCard" body-style="padding:0px" shadow="hover" v-for="item in playList" :key="item.id">
            <div style="width: 160px;height: 160px">
              <router-link :to="{path:'/playlist',query:{id:item.id}}"><el-image lazy alt="img" :src="item.coverImgUrl"/></router-link>
            </div>
            <el-tooltip effect="dark" content="播放量" placement="top">
              <i class="el-icon-headset"/>
            </el-tooltip>
            <span class="PlayCountSpan">{{ item.playCount }}</span>
            <el-tooltip effect="dark" content="播放" placement="top">
              <el-button type="text" size="mini" style="float: right;margin:5px 10px 0 0;padding: 0">
                <i class="el-icon-video-play"/>
              </el-button>
            </el-tooltip>
            <hr/>
            <el-tooltip effect="dark" :content="item.playlistName" placement="top" :open-delay="1000">
              <router-link :to="{path:'/playlist',query:{id:item.id}}"><p class="playlistName">{{ item.playlistName }}</p></router-link>
            </el-tooltip>

            <div class="author-warp">
              <span style="color: #999999">by</span>
              <el-tooltip effect="dark" :content="item.nickname" placement="bottom" :open-delay="1000">
                <router-link to="/">{{item.nickname}}</router-link>
              </el-tooltip>
            </div>
          </el-card>
        </div>
      </template>
    </el-skeleton>

    <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :current-page.sync="currentPage"
        :page-count="Math.ceil(playlistTotal/35)">
    </el-pagination>

  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "PlayList",
  data(){
    return{
      //"categories": {"0": "语种","1": "风格","2": "场景","3": "情感", "4": "主题"}
      yuzhongList:[],
      fenggeList:[],
      changjingList:[],
      qingganList:[],
      zhutiList:[],
      playList:[],
      playlistTotal:0,
      SkeletonLoading:true,
      currentPage:1,
    }
  },
  methods:{
    //获取分类数据
    GetCatList(){
      request.get("/playlist/catlist").then(res=>{
        res.sub.forEach(item=>{
          switch (item.category){
            case 0:
              this.yuzhongList.push(item.name);
              break;
            case 1:
              this.fenggeList.push(item.name);
              break;
            case 2:
              this.changjingList.push(item.name);
              break;
            case 3:
              this.qingganList.push(item.name);
              break;
            case 4:
              this.zhutiList.push(item.name);
              break;
            default:
              console.log('错误，未找到分类');
          }
        })
      })
    },
    //获取歌单数据
    GetPlayList(page){
      this.SkeletonLoading = true
      request.get("/top/playlist",{params:{cat:this.cat,limit:35,offset:(page-1)*35}}).then(res=>{
        this.playList = []
        this.playlistTotal = res.total
        for(let i = 0;i < res.playlists.length;i++){
          let {id,name:playlistName,playCount,coverImgUrl,creator:{nickname}} = res.playlists[i]
          coverImgUrl += '?param=160y160'
          this.playList.push({
            id, //歌单ID
            playlistName, //歌单名
            playCount,  //播放量
            coverImgUrl,  //歌单封面地址
            nickname,  //歌单创建用户名
          })
        }
        this.PlayCountFormat()
        this.SkeletonLoading = false
      })
    },
    //格式化播放量
    PlayCountFormat(){
      this.playList.forEach(item=>{
        if(item.playCount>=100000){
          item.playCount = Math.floor(item.playCount /= 10000) + "万"
        }
      })
    },
    pageChange(currentPage){
      this.GetPlayList(currentPage)
    }
  },
  mounted() {
    this.GetCatList()
    this.GetPlayList(1)
  },
  computed:{
    cat(){
      if(this.$route.query.cat === undefined) return '全部'
      else return this.$route.query.cat
    }
  },
  watch:{
    cat(){
      this.currentPage = 1
      this.GetPlayList(this.currentPage)
    }
  }
}
</script>

<style scoped>

  .active{
    color: #C10D0C;
  }
  .pop-icon{
    font-size: 15px;
    margin-right: 5px;
  }
  .pop-head-divider{
    margin: 15px 0;
  }
  h1{
    display: inline-block;
    margin-right: 10px;
  }
  .playlist-wrap{
    width: 1000px;
    margin: 0 auto;
  }
  .head-area-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    border-bottom: 2px solid #C10D0C;
    padding-bottom: 10px;
  }
  .head-area-left-wrap{
    display: flex;
    align-items: center;
  }
  .pop-bottom-item{
    margin: 20px 0;
    display: flex;
    align-items: center;
  }
  .pop-bottom-item-left{
    flex-shrink: 0;
  }
  .pop-bottom-item-right{
    border-left: 1px solid #999999;
    margin-left: 10px;
    padding-left: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .ListCard{
    width: 160px;
    height: 250px;
  }
  .playlistName{
    font-size: 14px;
    padding: 0 5px;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .el-icon-headset{
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 5px;
  }
  .el-icon-video-play{
    font-size: 20px;
    font-weight: bold;
    color: red;
  }
  .PlayCountSpan{
    font-size: 15px;
    font-weight: bold;
    margin-left: 5px;
  }
  .author-warp{
    padding: 3px 5px 0 5px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .author-warp>span{
    margin-right: 5px;
  }
</style>