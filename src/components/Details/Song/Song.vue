<template>
  <div class="song-wrap">
    <LeftContainer/>
    <RightContainer/>
  </div>
</template>

<script>
import LeftContainer from "@/components/Details/Song/LeftContainer/LeftContainer";
import RightContainer from "@/components/Details/Song/RightContainer/RightContainer";


export default {
  name: "Song",
  components:{LeftContainer,RightContainer},
  mounted() {
    document.querySelector("#app").scrollIntoView({behavior:"smooth"})
  }
}
</script>

<style scoped>

  .song-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }
</style>