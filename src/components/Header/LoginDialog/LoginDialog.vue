<template>
  <el-dialog title="登录" width="530px" style="padding: 0" :visible="loginVisible" @open="createQRImg" :before-close="closeLoginDialog">
    <div class="main-body">
      <img alt="" class="scan-img" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png?param=125y220"/>
      <div class="login-wrap">
        <h2>扫码登录</h2>
        <div class="QR-img-wrap" v-loading="QRLoading">
          <img alt="" v-if="QRSrc" :src="QRSrc" style="width: 192px;height: 192px"/>
          <div class="QR-img-mask" :style="maskStyle"></div>
          <div class="QR-img-refresh" :style="refreshBtnStyle">
            <p>二维码已失效</p>
            <el-button size="small" type="primary" @click="createQRImg">点击刷新</el-button>
          </div>
          <div class="QR-img-scanned" :style="scannedStyle">
            <i class="el-icon-success"/>
            <p>扫描成功</p>
            <p>请在手机上确认</p>
            <el-button size="small" type="primary" @click="createQRImg" style="margin-top: 5px">刷新二维码</el-button>
          </div>
        </div>
        <p class="">
          使用<router-link class="download-app" to="/">网易云音乐APP</router-link>扫码登录
        </p>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "LoginDialog",
  props:['loginVisible'],
  data(){
    return{
      QRSrc:'',
      QRLoading:true,
      maskStyle:{
        display:'none'
      },
      refreshBtnStyle:{
        display:'none'
      },
      scannedStyle:{
        display:'none'
      }
    }
  },
  methods:{
    async createQRImg(){
      this.QRLoading = true
      clearInterval(this.timer)
      this.maskStyle.display = 'none'
      this.refreshBtnStyle.display = 'none'
      this.scannedStyle.display = 'none'
      let keyRes = await this.generateKey()
      let key = keyRes.data.unikey
      let QRRes = await this.generateQR(key)
      this.QRSrc = QRRes.data.qrimg
      this.QRLoading = false
      this.timer = setInterval(async ()=>{
        const checkRes = await this.checkStatue(key)
        // console.log(checkRes)
        //800二维码过期
        if(checkRes.code === 800){
          if(this.scannedStyle.display === 'block'){
            this.scannedStyle.display = 'none'
          }
          this.maskStyle.display = 'block'
          this.refreshBtnStyle.display = 'block'
          clearInterval(this.timer)
        }
        //802待确认
        if(checkRes.code === 802){
          this.maskStyle.display = 'block'
          this.scannedStyle.display = 'block'
        }//803授权登录成功
        if(checkRes.code === 803){
          clearInterval(this.timer)
          this.$emit('closeLoginDialog')
          let loginRes = await this.checkLoginStatus()
          console.log(loginRes)
          if(loginRes.data.code === 200){
            this.$emit('getUserInfo',loginRes.data)
          }
        }
      },3000)
    },
    closeLoginDialog(){
      clearInterval(this.timer)
      this.$emit('closeLoginDialog')
    },
    generateKey(){
      return request.get("/login/qr/key",{params:{timestamp:Date.now()}})
    },
    generateQR(key){
      return request.get("/login/qr/create",{params:{key:key,qrimg:true,timestamp:Date.now()}})
    },
    checkStatue(key){
      return request.get("/login/qr/check",{params:{key:key,timestamp:Date.now()}})
    },
    checkLoginStatus(){
      return request.get("/login/status",{params:{timestamp:Date.now()}})
    }
  },
}
</script>

<style scoped>

  .main-body{
    padding: 0 50px;
    display: flex;
  }
  .login-wrap{
    text-align: center;
    margin-left: 40px;
  }
  .scan-img{
    display: block;
    height: 256px;
  }
  .download-app{
    margin: 0 5px;
    color: #0B74BE;
  }
  .QR-img-wrap{
    width: 192px;
    height: 192px;
    position: relative;
  }
  .QR-img-mask{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.65);
  }
  .QR-img-refresh{
    position: absolute;
    top: 64px;
    left: 56px;
    color: #FFFFFF;
  }
  .QR-img-refresh>button{
    margin-top: 10px;
  }
  .QR-img-scanned{
    position: absolute;
    top: 40px;
    left: 48px;
    color: #FFFFFF;
    font-size: 15px;
  }
  .el-icon-success{
    color: green;
    font-size: 24px;
  }
</style>