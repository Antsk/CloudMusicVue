<template>
  <div class="artist-wrap">
    <LeftContainer/>
    <RightContainer/>
  </div>
</template>

<script>
import LeftContainer from "@/components/Details/Artist/LeftContainer/LeftContainer";
import RightContainer from "@/components/Details/Artist/RightContainer/RightContainer";

export default {
  name: "Artist",
  components:{LeftContainer,RightContainer},
  mounted() {
    document.querySelector("#app").scrollIntoView({behavior:"smooth"})
  }
}
</script>

<style scoped>
  .artist-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }
</style>