<template>
  <el-card>
    <p class="p-info">
      登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机
    </p>
    <div class="LoginButtonWrap">
      <el-button>用户登录</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserInfo"
}
</script>

<style scoped>
  .p-info{
    font-size: 14px;
  }
  .LoginButtonWrap{
    width: 98px;
    margin: 20px auto 0;
  }
</style>