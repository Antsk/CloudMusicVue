<template>
  <el-card class="left-aside-card-wrap">
      <div class="item">
        <h2>推荐</h2>
        <router-link to="/discover/artist" class="item-link" :class="{active:$route.query.area === undefined && $route.query.type === undefined}">
          <div class="item-list-style"></div>
          <span class="item-p">推荐歌手</span>
        </router-link>
        <router-link :to="{path:'/discover/artist',query:{area:-1,type:-1}}" class="item-link" :class="{active:$route.query.area == -1&& $route.query.type == -1}">
          <div class="item-list-style"></div>
          <span class="item-p">入驻歌手</span>
        </router-link>
      </div>
      <div class="item" v-for="item in artList">
        <h2>{{ item.name }}</h2>
        <router-link class="item-link" :class="{active:item.area == $route.query.area && item.type[index2] == $route.query.type}" :to="{path:'/discover/artist',query:{area:item.area,type:item.type[index2]}}" v-for="(item2,index2) in item.typeName">
          <div class="item-list-style"></div>
          <span class="item-p">{{ item.name }}{{ item2 }}</span>
        </router-link>
      </div>
  </el-card>
</template>

<script>
export default {
  name: "LeftAside",
  data(){
    return{
      //推荐歌手分类
      recommendList:[
        {
          name:'推荐歌手',
          area:undefined,
          type:undefined,
        },
        {
          name:'入驻歌手',
          area:-1,
          type:-1,
        },
      ],
      // 歌手分类
      artList:[
        {
          name:'华语',
          area:7,
          type:[1,2,3],
          typeName:['男歌手','女歌手','组合/乐队'],
        },
        {
          name:'欧美',
          area:96,
          type:[1,2,3],
          typeName:['男歌手','女歌手','组合/乐队'],
        },
        {
          name:'日本',
          area:8,
          type:[1,2,3],
          typeName:['男歌手','女歌手','组合/乐队'],
        },
        {
          name:'韩国',
          area:16,
          type:[1,2,3],
          typeName:['男歌手','女歌手','组合/乐队'],
        },
        {
          name:'其他',
          area:0,
          type:[1,2,3],
          typeName:['男歌手','女歌手','组合/乐队'],
        },
      ],
    }
  },
}
</script>

<style scoped>

  .left-aside-card-wrap{
    width: 200px;
    height: 100%;
    margin-top: 5px;
  }
  .item{
    padding-bottom: 5px;
    border-bottom: 1px solid #d3d3d3;
    margin-top: 10px;
  }
  .item-p{
    margin: 10px 0;
    font-size: 13px;
  }
  .item-list-style{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #999999;
    margin:0 10px;
  }
  .item-link{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    width: 100%;
  }
  .item-link.active,.item-link:hover{
    border-radius: 2px;
    border-bottom: 3px solid #C10D0C;
    color: #C10D0C;
  }
  .item-link.active .item-list-style,.item-link:hover .item-list-style{
    background-color: #C10D0C;
  }
</style>