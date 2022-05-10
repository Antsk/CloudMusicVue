<template>
  <div class="CommentWrap">
    <div class="top-wrap">
      <h2>评论</h2>
      <span>共{{ commentCount }}条评论</span>
    </div>

    <el-divider class="my-divider"/>

    <div class="user-comment-wrap">
      <el-avatar style="flex-shrink: 0" :size="50" src="https://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"></el-avatar>
      <div class="user-comment">
        <el-input
            style="margin-left: 5px"
            type="textarea"
            placeholder="评论"
            maxlength="140"
            show-word-limit
            v-model="userCommentValue"
            :rows="4"
        >
        </el-input>
      <i class="el-icon-picture-outline-round"/>
      <el-button class="comment-btn" type="primary" size="small">评论</el-button>
      </div>
    </div>

    <h3>最新评论</h3>

    <el-divider class="comment-divider"/>

    <div class="comment-list-wrap" v-for="item in commentList" :key="item.commentId">
      <div class="comment-list-avatar">
        <router-link to="/"><el-avatar :size="40" :src="item.avatarUrl"/></router-link>
      </div>
      <div class="comment-list-content">
        <div class="comment-list-content-username">
          <router-link to="/"  class="username">{{ item.nickname }}</router-link>
        </div>
        <p class="comment-list-content-p-content">{{ item.content }}</p>
        <div class="comment-list-reply-wrap" v-if="item.parentCommentId">
          <p>
            <router-link to="/" class="username">{{ item.beNickName }}</router-link>：{{ item.beRepliedCommentContent }}
          </p>
        </div>
        <div class="comment-list-btn">
          <p class="comment-list-content-p">{{ item.timeStr }}</p>
          <div>
            <i class="el-icon-star-off">{{ item.likedCount }}</i>
            <el-divider direction="vertical"/>
            <a class="reply-btn">回复</a>
          </div>
        </div>
      </div>
    </div>

    <el-pagination
        style="text-align: center;margin-top: 20px"
        background
        layout="prev, pager, next"
        @current-change="pageChange"
        :page-count="Math.ceil(commentCount/20)">
    </el-pagination>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "Comment",
  props:['url','id'],
  data(){
    return{
      userCommentValue:'',
      currentPage:1,
      commentCount:0,
      commentList:[],
    }
  },
  methods:{
    GetCommentList(page){
      request.get(this.url,{params:{id:this.id,offset:(page-1)*20}}).then(res=>{
        this.commentList = []
        for(let i = 0;i < res.comments.length;i++){
          let {commentId,content, timeStr, time, parentCommentId, likedCount,user:{userId, avatarUrl, nickname}} = res.comments[i]
          avatarUrl += '?param=40y40'
          //判断是否为回复评论
          if(parentCommentId !== 0){
            let {content:beRepliedCommentContent,user:{userId:beUserId,nickname:beNickName}} = res.comments[i].beReplied[0]
            this.commentList.push({
              commentId, //评论ID
              userId, //评论用户ID
              avatarUrl, //评论用户头像地址
              nickname, //评论用户昵称
              content,  //评论内容
              timeStr,  //评论时间
              time,   //时间戳，用于分页
              likedCount, //点赞数
              beUserId, //被回复用户ID
              beNickName, //被回复用户昵称
              beRepliedCommentContent,   //被回复评论内容
              parentCommentId,  //被回复评论ID
            })
          }else{
            this.commentList.push({
              commentId, //评论ID
              userId, //评论用户ID
              avatarUrl, //评论用户头像地址
              nickname, //评论用户昵称
              content,  //评论内容
              timeStr,  //评论时间
              time,   //时间戳，用于分页
              likedCount, //点赞数
              parentCommentId  //被回复评论ID
            })
          }
        }
        this.commentCount = res.total
        this.$emit('getCommentCount',res.total)
      })
    },
    pageChange(Page){
      this.GetCommentList(Page)
      document.querySelector(".CommentWrap").scrollIntoView(true)
    }
  },
  mounted() {
    this.GetCommentList(1)
  },
  watch:{
    id(){
      this.GetCommentList(1)
    }
  }
}
</script>

<style scoped>

  .username{
    color: red;
  }
  .username:hover{
    text-decoration:underline red ;
  }
  .el-icon-picture-outline-round{
    font-size: 16px;
    margin: 10px 0 0 5px;
    cursor: pointer;
  }
  .comment-btn{
    float: right;
    margin-top: 5px;
  }
  .CommentWrap{
    margin-top: 30px;
  }
  .top-wrap>h2{
    display: inline-block;
  }
  .top-wrap>span{
    margin-left: 30px;
  }
  .my-divider{
    background-color: #C10D0C;
    height: 2px;
    margin: 18px 0;
  }
  .comment-divider{
    margin: 10px 0;
  }
  .user-comment-wrap{
    display: flex;
  }
  .user-comment{
    width: 100%;
  }
  .comment-list-wrap{
    display: flex;
    padding: 10px 0;
    border-bottom: 1px solid #ededed;
  }
  .comment-list-avatar{
    flex-shrink: 0;
  }
  .comment-list-content{
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
  }
  .comment-list-content-username{
    margin-bottom: 5px;
  }
  .comment-list-content-p{
    margin-bottom: 5px;
    color: #999;
  }
  .comment-list-content-p-content{
    margin-bottom: 5px;
    font-size: 13px;
  }
  .comment-list-reply-wrap{
    padding: 10px;
    margin-bottom: 5px;
    background-color: #F2F2F2;
  }
  .comment-list-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .el-icon-star-off{
    font-size: 13px;
    cursor: pointer;
  }
  .el-icon-star-off:hover{
    color: red;
  }
  .reply-btn{
    font-size: 13px;
  }
</style>