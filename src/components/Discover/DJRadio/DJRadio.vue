<template>
  <el-card class="DJRadio-card-wrap">
    <TopSelector></TopSelector>
    <div class="program-wrap" v-if="id === undefined">
      <ProgramRecommend/>
      <ProgramRanking/>
    </div>
    <ExcellentNewRadio v-if="id !== undefined"/>
    <RadioRanking v-if="id !== undefined"/>
  </el-card>
</template>

<script>
import TopSelector from "@/components/Discover/DJRadio/TopSelector/TopSelector";
import ExcellentNewRadio from "@/components/Discover/DJRadio/ExcellentNewRadio/ExcellentNewRadio";
import RadioRanking from "@/components/Discover/DJRadio/RadioRanking/RadioRanking";
import ProgramRecommend from "@/components/Discover/DJRadio/Program/ProgramRecommend";
import ProgramRanking from "@/components/Discover/DJRadio/Program/ProgramRanking";

export default {
  name: "DJRadio",
  components:{TopSelector,ExcellentNewRadio,RadioRanking,ProgramRecommend,ProgramRanking},
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped>
  .DJRadio-card-wrap{
    width: 1000px;
    margin: 0 auto;
  }
  .program-wrap{
    display: flex;
    justify-content: space-between;
  }
</style>