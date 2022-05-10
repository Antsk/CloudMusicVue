<template>
  <div class="item-wrap">
    <div class="item" v-for="item in List" :key="item.albumID">
      <div class="item-img-wrap">
        <router-link class="item-img" :to="{path:'/album',query:{id:item.albumID}}">
          <el-image lazy :src="item.picUrl"/>
          <el-tooltip effect="dark" content="播放" placement="bottom" :open-delay="500">
            <i class="el-icon-video-play"/>
          </el-tooltip>
        </router-link>
      </div>
      <div class="item-info">
        <el-tooltip effect="dark" :content="item.albumName" placement="top" :open-delay="1000">
          <p class="item-info-p1"><router-link :to="{path:'/album',query:{id:item.albumId}}">{{ item.albumName }}</router-link></p>
        </el-tooltip>
        <p class="item-info-p2"><router-link :to="{path:'/artist',query:{id:item.artistID}}">{{ item.artistName }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props:['List']
}
</script>

<style scoped>

  .item-wrap{
    display: grid;
    grid-template-columns: repeat(5,153px);
    grid-template-rows: repeat(2,1fr);
    gap: 30px 50px;
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
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>