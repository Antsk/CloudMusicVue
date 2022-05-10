const actions = {
    //添加一首音乐到播放列表
    addMusic(context,musicInfo){
        context.commit('ADDMUSIC',musicInfo)
    },
    //获取所有播放列表歌曲
    getMusicList(context){
        context.commit('GETMUSICLIST',JSON.parse(localStorage.getItem('musicList')))
    },
    getCurrentPlayMusicID(context){
        if( localStorage.getItem('currentPlayMusicID') !== null)
        context.commit('GETCURRENTPLAYMUSICID',parseInt(localStorage.getItem('currentPlayMusicID')))
    },
    setCurrentPlayMusicID(context,musicID){

    },
    //从播放列表移除一首音乐
    removeOneMusicFromList(context,musicIndex){
        context.commit('REMOVEONEMUSICFROMLIST',musicIndex)
    },
    //移除播放列表所有音乐
    removeMusicList(context){
        context.commit('REMOVEMUSICLIST')
    }
}
export default actions