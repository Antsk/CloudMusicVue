//引入VueRouter
import VueRouter from 'vue-router'

//创建router实例对象，去管理一组一组的路由规则
const router =  new VueRouter({
    routes:[
        {
            path:"/",
            redirect:"/discover/recommend"
        },
        {
            path:"/discover",
            component: ()=> import("../components/Discover/Discover"),
            children:[
                {
                    path:"recommend",
                    name:"IndexRecommend",
                    component: ()=> import("../components/Discover/IndexRecommend/IndexRecommend")
                },
                {
                    path:"toplist",
                    name:"TopList",
                    component: ()=> import("../components/Discover/TopList/TopList")
                },
                {
                    path:"playlist",
                    name:"PlayList",
                    component: ()=> import("../components/Discover/PlayList/PlayList")
                },
                {
                    path:"djradio",
                    name:"DJRadio",
                    component: ()=> import("../components/Discover/DJRadio/DJRadio")
                },
                {
                    path:"artist",
                    name:"Artist",
                    component: ()=> import("../components/Discover/Artist/Artist")
                },
                {
                    path:"album",
                    name:"Album",
                    component: ()=> import("../components/Discover/Album/index")
                },
            ]
        },
        {
            path:"/song",
            name:"SongDetail",
            component: ()=> import("../components/Details/Song/Song")
        },
        {
            path:"/playlist",
            name:"PlayListDetail",
            component: ()=> import("../components/Details/PlayList/PlayList")
        },
        {
            path:"/album",
            name:"AlbumDetail",
            component: ()=> import("../components/Details/Album/AlbumDetails")
        },
        {
            path:"/artist",
            name:"ArtistDetail",
            component: ()=> import("../components/Details/Artist/Artist")
        },
        {
            path:"/my",

        }
    ]
})

export default router