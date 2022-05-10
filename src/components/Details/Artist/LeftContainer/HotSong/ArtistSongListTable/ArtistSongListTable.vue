<template>
  <div class="song-list-wrap">
    <el-table :data="songList" stripe :row-style="{height: 70 + 'px'}">
      <el-table-column type="index"/>

      <el-table-column label="歌曲">
        <template slot-scope="scope">
          <div style="display: flex;align-items: center;justify-content: space-between">
            <div class="text-overflow">
              <el-tooltip effect="dark" :content="scope.row.SongName" placement="top" :open-delay="1000">
                <router-link :to="{path:'/song',query:{id:scope.row.SongID}}">{{ scope.row.SongName }}</router-link>
              </el-tooltip>
            </div>
            <div class="BtnGroup">
              <el-tooltip effect="dark" content="播放" placement="top" :open-delay="500">
                <el-button type="text" size="mini">
                  <i class="el-icon-video-play"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="添加到播放列表" placement="top" :open-delay="500">
                <el-button type="text" size="mini">
                  <i class="el-icon-circle-plus-outline"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="收藏" placement="top" :open-delay="500">
                <el-button type="text" size="mini">
                  <i class="el-icon-folder-add"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="分享" placement="top" :open-delay="500">
                <el-button type="text" size="mini">
                  <i class="el-icon-share"/>
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="下载" placement="top" :open-delay="500">
                <el-button type="text" size="mini">
                  <i class="el-icon-download"/>
                </el-button>
              </el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="专辑" width="150">
        <template slot-scope="scope">
          <div class="text-overflow">
            <el-tooltip effect="dark" :content="scope.row.albumName" placement="top" :open-delay="1000">
              <router-link :to="{path:'/album',query:{id:scope.row.albumId}}">{{ scope.row.albumName }}</router-link>
            </el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="时长" width="100">
        <template slot-scope="scope">
          <span style="color: #999999">{{ scope.row.dt }}</span>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>


<script>
export default {
  name: "ArtistSongListTable",
  props:['songList'],
  filters:{
    singerNameFormat(singerArr){
      let str = ''
      for (let i = 0;i < singerArr.length;i++){
        if( i === singerArr.length - 1){
          str += singerArr[i].SingerName
        }else{
          str += singerArr[i].SingerName + ' / '
        }
      }
      return str
    }
  },
}
</script>

<style scoped>
  .title-left>span{
    margin-left: 20px;
  }
  h1{
    position: relative;
    top: 5px;
  }
  .text-overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .el-icon-video-play,.el-icon-circle-plus-outline,.el-icon-folder-add,.el-icon-share,.el-icon-download{
    font-size: 20px;
    font-weight: bold;
    color: #ccc;
  }
  .el-icon-video-play:hover,.el-icon-circle-plus-outline:hover,.el-icon-folder-add:hover,.el-icon-share:hover,.el-icon-download:hover{
    color: #C10D0C;
  }
  .BtnGroup{
    justify-content: flex-end;
    width: 180px;
    display: none;
  }
  tr:hover .BtnGroup{
    display: flex;
  }
</style>