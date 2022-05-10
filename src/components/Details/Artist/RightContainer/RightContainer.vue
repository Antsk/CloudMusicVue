<template>
  <el-card class="right-card">
    <div class="similar-singer">
      <h3>相似歌手</h3>
      <el-divider class="my-divider"/>
      <div class="item-wrap">
        <div class="item" v-for="item in similarSinger">
          <router-link :to="{path:'/artist',query:{id:item.SingerID}}">
            <img class="item-img" alt="" :src="item.picUrl"/>
          </router-link>
          <p class="item-singerName"><router-link :to="{path:'/artist',query:{id:item.SingerID}}">{{ item.SingerName }}</router-link></p>
        </div>
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
      similarSinger:[]
    }
  },
  methods:{
    getSimilarSingerData(){
      this.similarSinger = []
      request.get('/simi/artist',{params:{id:this.id}}).then(res=>{
        for (let i = 0;i < 6;i++){
          let {id:SingerID,name:SingerName,picUrl} = res.artists[i]
          picUrl += '?param=60y60'
          this.similarSinger.push({
            SingerID,   //相似歌手ID
            SingerName, //相似歌手名
            picUrl      //相似歌手头像地址
          })
        }
      })
    }
  },
  mounted() {
    this.getSimilarSingerData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getSimilarSingerData()
    }
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
  .item-wrap{
    display: grid;
    grid-template-columns: repeat(3,60px);
    gap: 10px 10px;
  }
  .item-img{
    width: 60px;
    height: 60px;
  }
  .item-singerName{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    text-align: center;
    color: #333333;
    margin-top: 5px;
  }
</style>