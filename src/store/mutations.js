const mutations = {
    ADDMUSIC(state,musicInfo){
        //判断歌曲是否重复添加
        for (let i = 0 ; i < state.musicList.length;i++){
            if (musicInfo.SongId === state.musicList[i].SongId)
                return
        }
        state.musicList.push(musicInfo)
        localStorage.setItem('musicList',JSON.stringify(state.musicList))
    },
    GETMUSICLIST(state,musicList){
        if(musicList !== null) state.musicList = musicList
    },
    GETCURRENTPLAYMUSICID(state,musicID){
        state.currentPlayMusicID = musicID
    },
    SETCURRENTPLAYMUSICID(state,musicID){

    },
    REMOVEONEMUSICFROMLIST(state,musicIndex){
        state.musicList.splice(musicIndex,1)
        localStorage.setItem('musicList',JSON.stringify(state.musicList))
    },
    REMOVEMUSICLIST(state){
        state.musicList = []
        localStorage.removeItem('musicList')
    }
}
export default mutations