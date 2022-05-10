<template>
  <div class="new-radio-wrap">
    <h1>优秀新电台</h1>
    <el-skeleton :loading="skeLoading">
      <template v-slot:template>
        <div style="text-align: center;width: 200px;margin: 100px auto;color: #c2c2c2">
          <i class="el-icon-loading" style="font-size: 20px"/>
          <span style="margin-left: 10px;font-size: 20px">加载中...</span>
        </div>
      </template>
      <template v-slot:default>
        <div style="display: grid;grid-template-columns: repeat(5,160px);row-gap: 10px;justify-content: space-between;margin-top: 20px">
          <div v-for="(item,index) in NewRadioList" :key="index">
            <router-link to="/">
              <img alt="img" class="new-radio-item-img" :src="item.picUrl"/>
            </router-link>
            <div class="new-radio-item-name">
              <router-link to="/">{{ item.name }}</router-link>
            </div>
            <p class="new-radio-item-desc">{{ item.rcmdtext }}</p>
          </div>
        </div>
        <div>
          <div style="width: 200px;margin: 100px auto;text-align: center;font-size: 20px" v-if="NewRadioList.length === 0">暂无更多新电台</div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "ExcellentNewRadio",
  data(){
    return{
      NewRadioList:[],
      skeLoading: true
    }
  },
  methods:{
    GetNewRadio(){
      this.skeLoading = true
      this.NewRadioList = []
      request.get("/dj/recommend/type",{params:{type:this.id}}).then(res=>{
        for (let i = 0;i < res.djRadios.length;i ++){
          let {id,name,rcmdtext,picUrl} = res.djRadios[i]
          picUrl += '?param=160y160'
          this.NewRadioList.push({
            id, //电台id
            name, //电台名字
            rcmdtext, //电台描述
            picUrl  //电台图片地址
          })
        }
        this.skeLoading = false
      })
    }
  },
  mounted() {
    this.GetNewRadio()
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  },
  watch:{
    id(){
      this.GetNewRadio()
    }
  }
}
</script>

<style scoped>

  h1{
    border-bottom: 2px solid #C10D0C;
    padding-bottom: 10px;
  }
  .new-radio-wrap{
    margin-top: 20px;
  }
  .new-radio-item-img{
    width: 160px;
    height: 160px;
  }
  .new-radio-item-name{
    font-size: 16px;
    margin:5px 0;
  }
  .new-radio-item-name>a{
    color: #333;
  }
  .new-radio-item-name>a:hover{
    color: #C10D0C;
  }
  .new-radio-item-desc{
    color: #999999;
    font-size: 13px;
  }
</style>