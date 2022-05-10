<template>
  <div class="artist-desc">
    <div class="title-wrap">
      <div class="title-red"></div>
      <h2>歌手简介</h2>
    </div>
    <p>{{ desc }}</p>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ArtistDesc",
  data(){
    return{
      desc:''
    }
  },
  methods:{
    getArtistDescData(){
      request.get('/artist/desc',{params:{id:this.id}}).then(res=>{
        this.desc = res.briefDesc
      })
    }
  },
  mounted() {
    this.getArtistDescData()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.getArtistDescData()
    }
  }
}
</script>

<style scoped>
  .title-wrap{
    display: flex;
  }
  .title-red{
    height: 27px;
    width: 5px;
    background-color: #C10D0C;
  }
  h2{
    margin-left: 15px;
  }
  p{
    margin-top: 10px;
    text-indent: 2em;
    font-size: 14px;
    color: #666666;
    line-height: 30px;
  }
</style>