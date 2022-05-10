<template>
  <div class="HeaderContain">
    <div style="margin: 0 200px">
      <el-row type="flex" >
        <el-col :span="4">
          <router-link to="/">
            <img src="../../assets/images/favicon.png" alt="logo" style="margin-left: 10px"/>
            <h1 class="LogoTitle" >网易云音乐</h1>
          </router-link>
        </el-col>
        <el-col :span="12">
              <el-menu
                  :default-active="this.$route.path"
                  mode="horizontal"
                  background-color = "#242424"
                  active-text-color = "#FF0000"
                  text-color = "#ccc"
                  style="border-bottom:none"
                  router
              >
                <el-submenu :show-timeout="0" :hide-timeout="0" index="/discover">
                    <template slot="title">发现音乐</template>
                    <el-menu-item index="/discover/recommend">推荐</el-menu-item>
                    <el-menu-item index="/discover/toplist">排行榜</el-menu-item>
                    <el-menu-item index="/discover/playlist">歌单</el-menu-item>
                    <el-menu-item index="/discover/djradio">主播电台</el-menu-item>
                    <el-menu-item index="/discover/artist">歌手</el-menu-item>
                    <el-menu-item index="/discover/album">新碟上架</el-menu-item>
                </el-submenu>
                <el-menu-item index="/my">我的音乐</el-menu-item>
                <el-menu-item index="friend">关注</el-menu-item>
                <el-menu-item index="5">商城</el-menu-item>
                <el-menu-item index="6">音乐人</el-menu-item>
                <el-menu-item index="download">下载客户端</el-menu-item>
              </el-menu>
        </el-col>
        <el-col :span="4">
          <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              style="margin: 19px 0 0 10px;width: 170px"
              size="small"
              >
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button class="creator-btn" size="small" style="margin-top: 19px" type="info">
            创作者中心
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-dropdown style="margin: 19px 0 0 19px" v-if="userInfo.account !== undefined">
            <div class="block"><el-avatar :size="30" :src="userInfo.profile.avatarUrl + '?param=30y30'"></el-avatar></div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-user-solid">我的主页</el-dropdown-item>
              <el-dropdown-item icon="el-icon-message">我的消息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
              <el-dropdown-item icon="el-icon-postcard">VIP会员</el-dropdown-item>
              <el-dropdown-item icon="el-icon-setting" divided>个人设置</el-dropdown-item>
              <el-dropdown-item icon="el-icon-circle-check">实名认证</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" divided @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" class="login-btn" @click.native="login" v-if="userInfo === undefined || userInfo.account === undefined">登录</el-button>
<!--          <el-button type="text" @click.native="checkLogin">1</el-button>-->
        </el-col>
      </el-row>
    </div>

    <LoginDialog :loginVisible="loginVisible" @closeLoginDialog="loginDialogClose" @getUserInfo="getUserInfo"/>
  </div>
</template>

<script>
import LoginDialog from "@/components/Header/LoginDialog/LoginDialog";
import request from "@/utils/request";

export default {
  name: "MainHeader",
  components:{LoginDialog},
  data(){
    return{
      loginVisible:false,
      userInfo:{}
    }
  },
  methods:{
    login(){
      this.loginVisible = true
    },
    loginDialogClose(){
      this.loginVisible = false
    },
    getUserInfo(data){
      this.userInfo = data
    },
    checkLogin(){
      request.get("/login/status",{params:{timestamp:Date.now()}}).then(res=>{
        console.log('登录状态检查',res)
      })
    },
    logout(){
      request.get("/logout",{params:{timestamp:Date.now()}}).then(res=>{
        console.log('已退出登录',res)
        this.userInfo = {}
      })
    }
  },
  mounted() {
    request.get("/login/status",{params:{timestamp:Date.now()}}).then(res=>{
      if(res.data.account !== null){
        this.userInfo = res.data
      }
    })
  }
}
</script>

<style scoped>
  .HeaderContain{
    background-color: #242424;
    height: 70px;
  }
  .LogoTitle{
    display: inline-block;
    line-height: 70px;
    margin-left: 15px;
    vertical-align:middle;
    color: #fff
  }
  .el-menu .el-menu-item{
    height: 70px;
    line-height: 70px;
  }
  .creator-btn{
    background-color: #242424;
    border:1px solid #4F4F4F;
    border-radius:20px;
  }
  .login-btn{
    margin-top: 13px;
    color: #787878;
  }
</style>