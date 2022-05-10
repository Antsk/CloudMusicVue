<template>
  <el-table
      :data="List"
      style="width: 100%"
      :row-key="List.id"
  >
    <el-table-column type="index">

    </el-table-column>
    <el-table-column label="标题" width="400">
      <template v-slot="scope">
        <div style="position: relative">
          <router-link to="/" style="display: inline-block">{{ scope.row.SongName }}</router-link>
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
    <el-table-column prop="SingerName" label="歌手">
      <template v-slot="scope">
        <router-link to="/">{{ scope.row.SingerName }}</router-link>
      </template>
    </el-table-column>
    <el-table-column prop="dt" label="时长" width="100px">
      <template v-slot="scope">
        <span style="color: #999">{{ scope.row.dt }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "SongList",
  props:['List'],
}
</script>

<style scoped>

  .el-icon-video-play,.el-icon-circle-plus-outline,.el-icon-folder-add,.el-icon-share,.el-icon-download{
    font-size: 20px;
    font-weight: bold;
    color: #ccc;
  }
  .el-icon-video-play:hover,.el-icon-circle-plus-outline:hover,.el-icon-folder-add:hover,.el-icon-share:hover,.el-icon-download:hover{
    color: red;
  }
  .BtnGroup{
    position: absolute;
    right: 0;
    top: -7px;
    display: none;
  }
  tr:hover .BtnGroup{
    display: block;
  }
</style>