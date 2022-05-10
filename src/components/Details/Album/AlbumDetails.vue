<template>
  <div class="album-wrap">
    <LeftContainer/>
    <RightContainer/>
  </div>
</template>

<script>
import LeftContainer from "@/components/Details/Album/LeftContainer/LeftContainer";
import RightContainer from "@/components/Details/Album/RightContainer/RightContainer";


export default {
  name: "AlbumDetails",
  components:{LeftContainer,RightContainer}
}
</script>

<style scoped>
  .album-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }
</style>