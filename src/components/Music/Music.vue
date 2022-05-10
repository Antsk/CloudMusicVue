<template>
  <div class="music-main-wrap">

    <div class="music-info-wrap">
      <img alt="" class="music-img" :src="musicDetails.picUrl"/>
      <div class="music-info">
        <p class="music-info-songName"><router-link :to="{path:'/song',query:{id:musicDetails.musicID}}">{{ musicDetails.musicName }}</router-link></p>
        <p class="music-info-artist">
         <span v-for="(item,index) in musicDetails.ar" :title="musicDetails.ar | singerNameFormat">
           <router-link :to="{path:'/artist',query:{id:item.SingerId}}" class="singer-link">{{ item.SingerName }}</router-link>
           <span v-if="index !== musicDetails.ar.length - 1" style="color:#999999"> / </span>
         </span>
        </p>
      </div>
      <div class="music-like-icon-wrap">
        <i class="el-icon-star-off"/>
      </div>
    </div>

    <div class="music-control-wrap">
      <div class="music-control-left">
        <!--上一首按钮-->
        <el-button type="primary" circle @click="preMusic">
          <i class="el-icon-caret-left"/>
        </el-button>
        <!--播放暂停按钮-->
        <el-button type="primary" circle @click="musicPlay">
          <i :class="[isPlayMusic === true ? 'el-icon-video-pause':'el-icon-video-play']"/>
        </el-button>
        <!--下一首按钮-->
        <el-button type="primary" circle @click="nextMusic">
          <i class="el-icon-caret-right"/>
        </el-button>
      </div>
      <div class="music-control-center">
        <span class="music-startTime">{{ $moment.unix(currentPlayTime).format('mm:ss') }}</span>
        <el-slider
            @change="changeMusicTime"
            v-model="currentPlayTime"
            class="music-progress"
            :max="musicDetails.dt"
            :format-tooltip="tooltipFormat"
            @mousedown.native="isMusicProgressDrag = true"
            @mouseup.native="isMusicProgressDrag = false"
        />
        <span class="music-endTime">{{ $moment.unix(musicDetails.dt - 1).format('mm:ss') }}</span>
      </div>
      <div class="music-control-right">
        <i class="el-icon-s-unfold"/>
        <span class="music-lyric">词</span>
      </div>
    </div>

    <div class="music-other-wrap">
      <i :class="[currentVolume === 0 ? 'el-icon-turn-off-microphone':'el-icon-microphone']" @click="Mute"/>
      <el-slider v-model="currentVolume" @change="changeVolume" class="music-volume-progress"/>
      <!--播放列表-->
      <el-popover placement="top" trigger="click">
        <el-scrollbar>
          <div class="music-list">
            <h2 class="music-list-title">播放列表</h2>
            <div class="music-list-top-wrap">
              <span>共{{ musicList.length }}首歌</span>
              <i class="el-icon-delete" @click="removeAllMusicFromList">清空列表</i>
            </div>
            <el-divider class="music-list-divider"/>
            <!--播放列表表格-->
            <el-table
                :data="musicList"
                :show-header="false"
                @row-dblclick="rowDoubleClickPlayMusic"
                stripe
                empty-text="暂无歌曲"
                size="mini"
            >
              <el-table-column :width="50">
                <template slot-scope="scope">
                  <span v-if="currentPlayMusicID !== scope.row.SongId">{{ scope.$index + 1 }}</span>
                  <i v-if="currentPlayMusicID === scope.row.SongId" class="el-icon-video-play" style="color: #C10D0C;font-size: 15px"/>
                </template>
              </el-table-column>
              <el-table-column prop="SongName">

              </el-table-column>
              <el-table-column :width="100" prop="musicArtist">

              </el-table-column>
              <el-table-column :width="60" prop="dt">

              </el-table-column>
              <el-table-column :width="40">
                <template slot-scope="scope">
                  <div style="display: flex;align-items: center">
                    <i @click="removeOneMusicFromList(scope.$index,scope.row.SongId)" class="el-icon-delete" style="font-size: 20px;cursor: pointer"/>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-scrollbar>
        <i class="el-icon-s-grid" slot="reference"/>
      </el-popover>
    </div>

    <audio ref="audio" @timeupdate="musicPlayTimeUpdate"/>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Music",
  data(){
    return{
      //当前播放时间
      currentPlayTime:0,
      currentVolume:0,
      beforeMuteVolume:0,
      musicDetails:{
        dt:0
      },
      isMusicProgressDrag:false,
      isPlayMusic:false,
    }
  },
  methods:{
    getMusicUrl(id){
      return request.get('/song/url',{params:{id:id}})
    },
    getMusicDetails(id){
      request.get('/song/detail',{params:{ids:id}}).then(res=>{
        this.musicDetails = {
          musicID: res.songs[0].id,
          musicName: res.songs[0].name,
          dt: Math.ceil(res.songs[0].dt / 1000),
          picUrl:res.songs[0].al.picUrl + '?param=60y60'
        }
        this.musicDetails.ar = []
        for (let i = 0 ; i < res.songs[0].ar.length; i++){
          let {id:SingerId,name:SingerName} = res.songs[0].ar[i]
          this.musicDetails.ar.push({
            SingerId, //歌手ID
            SingerName  //歌手名
          })
        }
        localStorage.setItem('currentPlayMusicID',res.songs[0].id)
        this.$store.dispatch("getCurrentPlayMusicID")
      })
    },
    async initPlayMusic(){
      if( this.currentPlayMusicID === 0 ) return
      this.getMusicDetails(this.currentPlayMusicID)
      let URLRes = await this.getMusicUrl(this.currentPlayMusicID)
      this.$refs.audio.src = URLRes.data[0].url
    },
    //双击播放列表中某一行播放音乐
     async rowDoubleClickPlayMusic(row){
       if( this.currentPlayMusicID === row.SongId ) {
         this.$message({message:'正在播放当前音乐'})
         return
       }
       this.getMusicDetails(row.SongId)
       let URLRes = await this.getMusicUrl(row.SongId)
       this.$refs.audio.src = URLRes.data[0].url
       this.musicPlay()
    },
    //进度条拖拽显示数据格式化
    tooltipFormat(val){
      let min = Math.floor(val / 60)
      let sec = val % 60
      if( min < 10 ) min = '0' + min
      if( sec < 10 ) sec = '0' + sec
      return min + ':' + sec
    },
    //点击播放暂停按钮进行音乐播放或暂停
    musicPlay(){
      if(this.$refs.audio.paused === true){
        this.$refs.audio.volume = this.currentVolume / 100
        this.isPlayMusic = true
        this.$refs.audio.play()
      }else{
        this.isPlayMusic = false
        this.$refs.audio.pause()
      }
    },
    //修改音量
    changeVolume(val){
      this.$refs.audio.volume = val / 100
      localStorage.setItem('musicVolume',val)
    },
    //点击静音图标直接静音全部
    Mute(){
      if(this.currentVolume !== 0){
        this.beforeMuteVolume = this.currentVolume
        this.currentVolume = 0
        this.$refs.audio.volume = this.currentVolume / 100
      }else{
        this.currentVolume = this.beforeMuteVolume
        this.$refs.audio.volume = this.currentVolume / 100
      }
    },
    //播放进度条拖拽，当鼠标松开时触发，修改当前播放时间
    changeMusicTime(val){
      this.$refs.audio.currentTime = val
      if(this.$refs.audio.paused === true){
        this.$refs.audio.volume = this.currentVolume / 100
        this.isPlayMusic = true
        this.$refs.audio.play()
      }
    },
    //audio的timeupdate方法，该方法每250ms调用一次
    musicPlayTimeUpdate(){
      //判断是否进度条处于拖拽状态，处理拖拽进度条不生效问题
      if (this.isMusicProgressDrag === true) return
      //将当前音乐的播放时间赋值给页面进度条需要显示的时间
      this.currentPlayTime = Math.floor(this.$refs.audio.currentTime)
      if(this.currentPlayTime === Math.floor(this.$refs.audio.duration)){
        this.nextMusic()
      }
    },
    //下一首音乐
    nextMusic(){
      let currentPlayIndex = this.musicList.findIndex( item => item.SongId === parseInt(localStorage.getItem('currentPlayMusicID')))
      if(currentPlayIndex === this.musicList.length - 1){
        this.rowDoubleClickPlayMusic(this.musicList[0])
      }else{
        this.rowDoubleClickPlayMusic(this.musicList[currentPlayIndex + 1])
      }
    },
    //上一首音乐
    preMusic(){
      let currentPlayIndex = this.musicList.findIndex( item => item.SongId === parseInt(localStorage.getItem('currentPlayMusicID')))
      if(currentPlayIndex === 0){
        this.rowDoubleClickPlayMusic(this.musicList[this.musicList.length - 1])
      }else{
        this.rowDoubleClickPlayMusic(this.musicList[currentPlayIndex - 1])
      }
    },
    //播放列表移除一首音乐
    removeOneMusicFromList(index,ID){
      this.$store.dispatch('removeOneMusicFromList',index)
      if(ID === parseInt(localStorage.getItem('currentPlayMusicID'))){
        if(index === this.musicList.length){
          if(this.musicList.length === 0){
            this.$refs.audio.pause()
            this.isPlayMusic = false
            this.$refs.audio.src = ''
            this.musicDetails = {dt:0}
            localStorage.removeItem('currentPlayMusicID')
          }else{
            this.rowDoubleClickPlayMusic(this.musicList[index - 1])
          }
        }else{
          this.rowDoubleClickPlayMusic(this.musicList[index])
        }
      }
    },
    //播放列表移除所有歌曲
    removeAllMusicFromList(){
      this.$store.dispatch('removeMusicList')
      this.$refs.audio.pause()
      this.isPlayMusic = false
      this.$refs.audio.src = ''
      this.musicDetails = {dt:0}
      localStorage.removeItem('currentPlayMusicID')
    }
  },
  mounted() {
    //获取播放列表
    this.$store.dispatch("getMusicList")
    //获取当前播放音乐ID
    this.$store.dispatch("getCurrentPlayMusicID")
    //如果存在之前播放的音乐ID，初始化音乐信息
    this.initPlayMusic()
    //获取音量
    this.currentVolume = parseInt(localStorage.getItem('musicVolume'))
    //绑定全局事件，用于给其他组件进行调用播放音乐
    this.$bus.$on('playMusic',this.rowDoubleClickPlayMusic)
  },
  computed:{
    musicList(){
      return this.$store.state.musicList
    },
    currentPlayMusicID(){
      return this.$store.state.currentPlayMusicID
    }
  },
  watch:{

  },
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

  .el-icon-video-play,.el-icon-video-pause{
    font-size: 30px;
  }
  .el-icon-caret-left,.el-icon-caret-right{
    font-size: 20px;
  }
  .music-main-wrap{
    position: fixed;
    bottom: 0;
    height: 70px;
    width: 100%;
    background-color: #f8f8ff;
    padding: 5px 10px;
    display: flex;
  }
  .music-info-wrap{
    display: flex;
    align-items: center;
    width: 15%;
  }
  .music-img{
    height: 60px;
    width: 60px;
    border-radius: 5px;
  }
  .music-info{
    margin-left: 10px;
    width: 120px;
  }
  .music-info-songName{
    font-size: 15px;
    color: #242424;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .music-info-artist{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .singer-link{
    color: #999999;
  }
  .singer-link:hover{
    color: #C10D0C;
  }
  .music-like-icon-wrap{
    margin-left: 20px;
  }
  .el-icon-star-off{
    font-size: 24px;
    cursor: pointer;
  }
  .el-icon-star-off:hover{
    color: #C10D0C;
  }
  .music-control-wrap{
    display: flex;
    margin-left: 30px;
    flex: 1;
  }
  .music-control-left{
    display: flex;
    align-items: center;
  }
  .music-control-center{
    display: flex;
    align-items: center;
    margin-left: 10px;
    flex: 1;
  }
  .music-startTime,.music-endTime{
    padding: 0 8px;
    font-size: 15px;
  }
  .music-progress{
    flex: 1;
    margin: 0 10px;
  }
  .music-control-right{
    display: flex;
    align-items: center;
  }
  .el-icon-s-unfold{
    font-size: 20px;
    margin: 3px 8px 0;
    cursor: pointer;
  }
  .el-icon-s-unfold:hover,.el-icon-microphone:hover,.el-icon-s-grid:hover,.music-lyric:hover,.el-icon-turn-off-microphone:hover,.el-icon-delete:hover{
    color: rgba(64,158,255,0.8);
  }
  .music-lyric{
    font-size: 16px;
    cursor: pointer;
  }
  .music-other-wrap{
    width: 15%;
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .music-volume-progress{
    flex: 1;
    margin: 0 20px;
  }
  .el-icon-microphone,.el-icon-s-grid,.el-icon-turn-off-microphone{
    font-size: 20px;
    cursor: pointer;
  }
  .music-list{
    width: 500px;
    height: 500px;
  }
  .music-list-title{
    text-align: center;
  }
  .music-list-top-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .music-list-top-wrap>span{
    font-size: 15px;
  }
  .music-list-top-wrap>.el-icon-delete{
    font-size: 15px;
    cursor: pointer;
  }
  .music-list-divider{
    margin: 12px 0;
  }
</style>