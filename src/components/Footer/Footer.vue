<template>
  <div class="ft-wrap">
    <div class="ft-contain">
      <div class="copyright">
        <p>
          <a class="listA" href="/" target="_blank">服务条款</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">隐私政策</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">儿童隐私政策</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">版权投诉指引</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">联系我们</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">广告合作</a>
          <span class="divide">|</span>
          <a class="listA" href="/" target="_blank">廉正举报</a>
        </p>
        <p class="copyPara2">
          <span class="copyPara2-copy">网易公司版权所有©1997-2022</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="/">浙网文[2021] 1186-054号</a>
        </p>
        <p>
          <a class="copyPara3-a" href="/">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
          <a>
            <span class="PoliceLogo"></span>
            <a href="/">浙公网安备 33010902002564号</a>
          </a>
        </p>
      </div>

      <ul class="icon-ul">
        <li class="unit">
          <a class="logo" href="/" style="background-position: -60px -457px"></a>
          <br>
          <span>Amped Studio</span>
        </li>
        <li class="unit">
          <a class="logo" href="/" style="background-position: 0 0"></a>
          <br>
          <span>用户认证</span>
        </li>
        <li class="unit">
          <a class="logo" href="/" style="background-position: -60px -50px"></a>
          <br>
          <span>独立音乐人</span>
        </li>
        <li class="unit">
          <a class="logo" href="/" style="background-position: 0 -101px"></a>
          <br>
          <span>赞赏</span>
        </li>
        <li class="unit">
          <a class="logo" href="/" style="background-position: -60px -457px;"></a>
          <br>
          <span>视频奖励</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

  .ft-wrap{
    height: 172px;
    border-top:1px solid #d3d3d3;
    background-color: #f2f2f2;
  }
  .ft-contain{
    width: 1000px;
    margin: 0 auto;
  }
  .copyright{
    padding-top: 50px;
    float: left;
  }
  .copyPara2{
    margin: 5px 0;
  }
  .copyPara2-copy{
    margin-right: 14px;
  }
  .copyPara3-a{
    margin-right: 10px;
  }
  .listA{
    color: #999;
  }
  .listA:hover{
    color: #C10D0C;
  }
  .divide{
    margin: 0 4px;
    color: #c2c2c2;
  }
  .icon-ul{
    margin-top: 47px;
    float: right;
    width: 500px;
  }
  .unit{
    float: left;
    width: 100px;
    height: 70px;
    text-align: center;
  }
  .PoliceLogo{
    background: url('https://s2.music.126.net/style/web2/img/3rd/police.png?92ef45abd4911c7c953646daf0915756') no-repeat;
    display: inline-block;
    width: 14px;
    height: 14px;
    background-size: cover;
  }
  .logo{
    background: url("https://s2.music.126.net/style/web2/img/foot_enter_new.png?6b1d4389d1b56e4f2247f9bbb30b1c0d");
    background-size: 110px 552px;
    display: inline-block;
    width: 50px;
    height: 45px;
    margin: 0 auto;
  }

</style>