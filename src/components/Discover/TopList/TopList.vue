<template>
  <div class="TopListWrap">
    <LeftAside></LeftAside>
    <RightContainer></RightContainer>
  </div>

</template>

<script>
import LeftAside from "@/components/Discover/TopList/LeftAside/LeftAside";
import RightContainer from "@/components/Discover/TopList/RightContainer/RightContainer";

export default {
  name: "TopList",
  components:{LeftAside,RightContainer},
  beforeDestroy() {
    this.$store.commit('editTopListID',19723756)
  }
}
</script>

<style scoped>

  .TopListWrap{
    width: 1000px;
    margin: 0 auto;
    display: flex;
  }

</style>