<template>
  <el-card class="MainCardWrap" body-style="padding:0px">
    <div class="TopAreaWrap">
      <img class="MainIMG" alt="img" :src="TitleImgSrc"/>
      <div class="ButtonWrap">
        <router-link :to="{path:'/discover/toplist',query:{id:topListID}}" ><h3>{{ Title }}</h3></router-link>
        <div>
          <el-tooltip effect="dark" content="播放" placement="top">
            <el-button type="text" size="mini">
              <i class="el-icon-video-play"/>
            </el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="收藏" placement="top">
            <el-button type="text" size="mini">
              <i class="el-icon-folder-add"/>
            </el-button>
          </el-tooltip>
        </div>
      </div>
    </div>

    <el-divider/>

    <!--骨架屏-->
    <el-skeleton :loading="SkeletonLoading" animated :count="10">
      <!--骨架屏临时-->
      <template v-slot:template>
        <el-card shadow="hover" class="ListCard" body-style="padding:0px">
          <el-skeleton-item variant="text" style="margin-left: 10px;width: 20%"></el-skeleton-item>
          <el-skeleton-item variant="text" style="margin-left:20px;width:50%"></el-skeleton-item>
        </el-card>
      </template>
      <!--骨架屏替换-->
      <template v-slot:default>
        <!--弹出框-->
        <el-popover
            placement="top-start"
            trigger="hover"
            :close-delay="0"
            v-for="(item,index) in List" :key="index"
        >
          <!--弹出框内容-->
          <img class="PopImg" alt="img" :src="item.picUrl"/>
          <div class="PopWrap">
            <router-link to="/">{{ item.SongName }}</router-link>
            <div>
              <el-tooltip effect="dark" content="播放" placement="top">
                <el-button type="text" size="mini">
                  <i class="el-icon-video-play"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="添加到播放列表" placement="top">
                <el-button type="text" size="mini">
                  <i class="el-icon-circle-plus-outline"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="收藏" placement="top">
                <el-button type="text" size="mini">
                  <i class="el-icon-folder-add"/>
                </el-button>
              </el-tooltip>
            </div>
          </div>

          <!--弹出框触发体-->
          <el-card class="ListCard" shadow="hover" body-style="padding:0px" slot="reference">
            <span class="RankNumber" :class="{red:index === 0 || index === 1 || index === 2}">{{ index+1 }}</span>
            <router-link :to="{path:'/song',query:{id:item.id}}" class="SongName">{{ item.SongName }}</router-link>
          </el-card>

        </el-popover>
      </template>
    </el-skeleton>

  </el-card>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "TopListItem",
  props:['Title','TitleImgSrc','topListID'],
  data(){
    return{
      List:[],
      SkeletonLoading:true
    }
  },
  methods:{
    getTopListItem(){
      this.SkeletonLoading = true
      request.get("/playlist/detail",{params:{id:this.topListID}}).then(res=>{
        for(let i = 0;i < 10;i++){
          let {id,name:SongName,al:{picUrl}} = res.playlist.tracks[i]
          picUrl += '?param=50y50'
          this.List.push({
            id, //歌曲ID
            SongName, //歌曲名
            picUrl, //歌曲图片链接
          })
        }
        this.SkeletonLoading = false
      })
    }
  },
  mounted() {
    this.getTopListItem()
  }
}
</script>

<style scoped>
  .el-icon-video-play{
    font-size: 22px;
    font-weight: bold;
    color: #C1C1C1;
  }
  .el-icon-folder-add{
    font-size: 22px;
    font-weight: bold;
    color: #C1C1C1;
  }
  .el-icon-circle-plus-outline{
    font-size: 22px;
    font-weight: bold;
    color: #C1C1C1;
  }
  .el-icon-video-play:hover,.el-icon-folder-add:hover,.el-icon-circle-plus-outline:hover{
    color: #C10D0C;
  }
  .MainCardWrap{
    width: 220px;
    margin-right: 9px;
    display: inline-block;
  }
  .TopAreaWrap{
    height: 100px;
    padding: 20px 0 0 19px;
  }
  .MainIMG{
    width: 80px;
    height: 80px;
    float: left;
  }
  .ButtonWrap{
    margin: 10px 0 0 6px;
    float: left;
  }
  .ListCard{
    height: 50px;
    line-height: 50px;
    margin: 0 10px 10px 10px;
  }
  .RankNumber{
    font-size:15px;
    display: inline-block;
    width: 32px;
    text-align: center;
    overflow: hidden;
  }
  .RankNumber.red{
    color: red;
  }
  .SongName{
    font-size: 12px;
    width:160px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .PopImg{
    width: 50px;
    height: 50px;
    float: left;
  }
  .PopWrap{
    float: left;
    margin-left: 10px;
  }
</style>