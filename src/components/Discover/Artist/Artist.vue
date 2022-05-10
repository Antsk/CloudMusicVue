<template>
  <div class="Artist-wrap">
    <LeftAside/>
    <RightContainer/>
  </div>
</template>

<script>
import LeftAside from "@/components/Discover/Artist/LeftAside/LeftAside";
import RightContainer from "@/components/Discover/Artist/RightContainer/RightContainer";

export default {
  name: "Artist",
  components:{LeftAside,RightContainer},
}
</script>

<style scoped>

  .Artist-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }
</style>