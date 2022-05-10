<template>
  <div>
    <div class="ArtistMV-wrap">
      <div class="item" v-for="item in MVList">
        <router-link to="/" class="item-img-linkWrap">
          <el-image class="item-img" :src="item.imgurl"/>
          <i class="el-icon-video-play"/>
        </router-link>
        <p class="item-name"><router-link :title="item.MVName" to="/">{{ item.MVName }}</router-link></p>
      </div>
    </div>
    <div v-if="MVList.length === 0" style="width: 200px;margin: 100px auto;text-align: center;font-size: 24px;font-weight: 400;color: #333333">
      该歌手暂无MV
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ArtistMV",
  data(){
    return{
      MVList:[]
    }
  },
  methods:{
    getArtistMVListData(){
      this.MVList = []
      request.get('/artist/mv',{params:{id:this.id}}).then(res=>{
        for (let i = 0;i < res.mvs.length;i++){
          let {id:MVID,name:MVName,imgurl} = res.mvs[i]
          imgurl += '?param=150y150'
          this.MVList.push({
            MVID, //MVID
            MVName, //MV名字
            imgurl  //MV封面地址
          })
        }
      })
    }
  },
  mounted() {
    this.getArtistMVListData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getArtistMVListData()
    }
  }
}
</script>

<style scoped>
  .ArtistMV-wrap{
    display: grid;
    grid-template-columns: repeat(4,150px);
    gap: 25px 35px;
  }
  .item-img-linkWrap{
    display: block;
    position: relative;
  }
  .el-icon-video-play{
    position: absolute;
    top: 55px;
    left: 55px;
    font-size: 40px;
    color: #FFFFFF;
    display: none;
  }
  .item-img-linkWrap:hover .el-icon-video-play{
    display: block;
  }
  .el-icon-video-play:hover{
    color: #C10D0C;
  }
  .item-img{
    width: 150px;
    height: 150px;
  }
  .item-name{
    margin-top: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 15px;
  }
</style>