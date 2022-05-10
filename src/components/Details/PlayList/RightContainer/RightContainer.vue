<template>
  <el-card class="right-card">
    <div class="subscribe">
      <h3>喜欢这个歌单的人</h3>
      <el-divider class="my-divider"/>
      <div class="user-avatar">
        <router-link to="/" v-for="item in subscribe">
          <el-image :src="item.avatarUrl" :title="item.nickname"/>
        </router-link>
      </div>

      <div class="hot-playlist">
        <h3>热门歌单</h3>
        <el-divider class="my-divider"/>
        <div class="item" v-for="item in hotPlayList">
          <router-link class="item-img" :to="{path:'/playlist',query:{id:item.playlistId}}">
            <el-image :src="item.coverImgUrl"/>
          </router-link>
          <div class="item-info text-overflow">
            <router-link class="item-info-title text-overflow" :to="{path:'/playlist',query:{id:item.playlistId}}" :title="item.playlistName">
              {{ item.playlistName }}
            </router-link>
            <div class="item-info-author text-overflow">
              <span>by</span>
              <router-link class="text-overflow" :to="{path:'/user',query:{id:item.userId}}" :title="item.nickname">
                {{ item.nickname }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div class="download-info-wrap">
        <h3>网易云音乐多端下载</h3>
        <el-divider class="my-divider"/>
        <div class="download-info-bg"></div>
        <p>同步歌单，随时畅听320k好音乐</p>
      </div>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RightContainer",
  data(){
    return{
      subscribe:[],
      hotPlayList:[],
    }
  },
  methods:{
    getSubscribeUser(data){
      this.subscribe = data
    },
    getHotPlaylist(){
      request.get("/top/playlist",{params:{limit:5}}).then(res=>{
        for (let i = 0;i < res.playlists.length;i++){
          let {name:playlistName,id:playlistId,coverImgUrl,creator:{userId,nickname}} = res.playlists[i]
          coverImgUrl += '?param=50y50'
          this.hotPlayList.push({
            playlistId, //歌单ID
            playlistName, //歌单名
            coverImgUrl,  //歌单封面地址
            userId,  //歌单创建者ID
            nickname  //歌单创建者用户名
          })
        }
      })
    }
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{

  },
  mounted() {
    this.$bus.$on('getSubscribeUser',this.getSubscribeUser)
    this.getHotPlaylist()
  },
  beforeDestroy() {
    this.$bus.$off('getSubscribeUser')
  }
}
</script>

<style scoped>
  .right-card{
    width: 245px;
    margin-left: 5px;
    height: 100%;
  }
  .my-divider{
    margin: 12px 0;
  }
  .user-avatar{
    display: grid;
    grid-template-columns: repeat(4,40px);
    gap: 14px
  }
  .hot-playlist{
    margin-top: 25px;
  }
  .item{
    display: flex;
    margin-top: 15px;
  }
  .item-img{
    display: inline-block;
    width: 50px;
    height: 50px;
    flex-shrink: 0;
  }
  .text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item-info{
    margin-left: 10px;
  }
  .item-info-title{
    display: block;
    font-size: 15px;
  }
  .item-info-author{
    margin-top: 5px;
  }
  .item-info-author>span{
    color: #999999;
  }
  .download-info-wrap{
    margin-top: 25px;
  }
  .download-info-wrap>p{
    color: #999999;
    font-size: 13px;
  }
  .download-info-bg{
    height: 65px;
    background: url("https://s2.music.126.net/style/web2/img/sprite.png?cd241681a02d451eef6a32e3185db756") no-repeat 0 -392px;
    margin-bottom: 10px;
  }
</style>