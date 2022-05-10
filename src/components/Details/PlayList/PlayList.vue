<template>
  <div class="PlayList-wrap">
    <LeftContainer/>
    <RightContainer/>
  </div>
</template>

<script>
import LeftContainer from "@/components/Details/PlayList/LeftContainer/LeftContainer";
import RightContainer from "@/components/Details/PlayList/RightContainer/RightContainer";


export default {
  name: "PlayList",
  components:{LeftContainer,RightContainer}
}
</script>

<style scoped>

  .PlayList-wrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }
</style>