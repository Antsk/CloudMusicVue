<template>
  <el-card class="album-card-wrap">
    <HotAlbum/>
    <AllAlbum/>
  </el-card>
</template>

<script>
import HotAlbum from "@/components/Discover/Album/HotAlbum/HotAlbum";
import AllAlbum from "@/components/Discover/Album/AllAlbum/AllAlbum";

export default {
  name: "index",
  components:{HotAlbum,AllAlbum}
}
</script>

<style scoped>

  .album-card-wrap{
    width: 1000px;
    margin: 0 auto;
  }
</style>