<template>
  <el-card class="right-card-wrap">
    <div class="similar-song-wrap">
      <h3>相似歌曲</h3>
      <el-divider class="my-divider"/>
      <div class="item" v-for="item in similarList">
        <div class="item-left">
          <div class="item-song-name"><router-link :to="{path:'/song',query:{id:item.songId}}">{{ item.SongName }}</router-link></div>
          <div class="item-singer">
            <span v-for="(item2,index) in item.artist">
              <router-link :to="{path:'/artist',query:{id:item2.SingerId}}" >{{ item2.SingerName }}</router-link>
              <el-divider direction="vertical" v-if="index !== item.artist.length - 1 "/>
            </span>
          </div>
        </div>
        <div class="item-right">
          <i class="el-icon-caret-right"></i>
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <div class="download-info-wrap">
      <h3>网易云音乐多端下载</h3>
      <el-divider class="my-divider"/>
      <div class="download-info-bg"></div>
      <p>同步歌单，随时畅听320k好音乐</p>
    </div>
  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "RightContainer",
  data(){
    return{
      similarList:[]
    }
  },
  methods:{
    getSimilar(id){
      request.get("/simi/song",{params:{id:id}}).then(res=>{
        this.similarList = []
        for (let i = 0;i < 5;i++){
          let {name:SongName,id:songId} = res.songs[i]
          this.similarList.push({
            songId, //推荐歌曲的ID
            SongName, //推荐歌曲的名字
          })
          this.$set(this.similarList[i],'artist',[])
          for (let j = 0;j < res.songs[i].artists.length;j++){
            let {name:SingerName,id:SingerId} = res.songs[i].artists[j]
            this.similarList[i].artist.push({
              SingerId, //推荐歌曲的歌手ID
              SingerName  //推荐歌曲的歌手名
            })
          }
        }
      })
    }
  },
  mounted() {
    this.getSimilar(this.id)
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getSimilar(this.id)
    }
  }
}
</script>

<style scoped>

  .right-card-wrap{
    width: 245px;
    margin-left: 5px;
    height: 100%;
  }
  .my-divider{
    margin: 12px 0;
  }
  .item{
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .item-left{
    width: 156px;
  }
  .item-song-name,.item-singer{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 13px;
  }
  .item-song-name>a{
    color: #333333;
  }
  .item-song-name:hover{
    text-decoration: underline #333333;
  }
  .item-singer>a{
    color: #999999;
  }
  .item-singer a:hover{
    text-decoration: underline #999999;
  }
  .el-icon-caret-right,.el-icon-plus{
    color: #A3A3A3;
    font-size: 18px;
    margin-left: 5px;
  }
  .el-icon-caret-right:hover,.el-icon-plus:hover{
    cursor: pointer;
    color: #C10D0C;
  }
  .download-info-wrap{
    margin-top: 20px;
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