<template>
  <!-- 整体的头部预览描述部分 -->
  <div class="serachTop">
      <!-- 头部Nav部分 -->
      <div class="serachTopNav">
        <!-- 左边返回部分 -->
        <div class="back" @click="$router.go(-1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zuojiantou1"></use>
            </svg>
            
        </div>
        <!-- 中间搜索部分 -->
        <div class="right">
            <input type="text" v-model="serachKeyWord" :placeholder="placeholder" @keydown.enter="saveKeyWord">
        </div>
      </div>
      <!-- 历史部分 -->
      <div class="history" v-show="searchSongs.length==0">
          <div class="historyLeft">
              历史
          </div>
          <div class="historyRight">
              <div @click="historySerach(item)" class="keywordItem" v-for="(item,i) in keywordList" :key="i">{{item}}</div>
          </div>
      </div>

    <div class="playlist" v-show="searchSongs.length!=0">
        <!-- 头部 -->
        <div class="playlist-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang3"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{searchSongs.length}}首)</div>
                </div>
            </div>
           
        </div>
        <!-- 歌曲列表 -->
        <div class="list">
            <div class="playItem" v-for="(item,index) in searchSongs" :key="index" @click="setPlayIndex(index)">
                <div class="left">
                    <div class="index">{{index+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="anthor">
                            <span class="tag" v-for="(tag,i) in searchSongs.tags" :key="i">{{tag}}</span>
                            <span>
                                <div class="tagdes">{{item.album.name}}</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true" @click="setPlay(item,index)">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiaolist29"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {serachMusic} from '@/api/index.js'

export default {
    data(){
        return{
            placeholder:'陈奕迅',
            keywordList:[],
            serachKeyWord:'',
            searchSongs:[]
        }
    },
    beforeMount() {
        this.keywordList = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
    },
    methods: {
        async saveKeyWord(){
            this.keywordList.push(this.serachKeyWord)
            // 去重
            this.keywordList = Array.from(new Set(this.keywordList))
            if(this.keywordList > 10){
                this.keywordList = this.keywordList.slice(this.keywordList.length - 10,this.keywordList.length)
            }
            localStorage.keywordList = JSON.stringify(this.keywordList)
            let res = await serachMusic(this.serachKeyWord)
            this.searchSongs = res.data.result.songs
            // console.log(this.searchSongs)
            this.serachKeyWord = ''
        },
        historySerach(keyword){
            this.serachKeyWord = keyword;
            this.saveKeyWord()
        },
        setPlay(item,index){
            item.al = item.album
            item.al.picUrl = item.album.artist.img1v1Url
            this.$store.commit('pushPlayList',item)
            this.$store.commit('setPlayIndex',this.$store.state.playlist.length-1)
        }
    },
}
</script>

<style lang="less" scoped>
.serachTop{
    width: 7.5rem;
    padding: 0 0.4rem;
    height: calc(100vh - 1.2rem);
    
    .serachTopNav{
        display: flex;
        width: 100%;
        height: 1.2rem;
        padding: 0 0.4rem;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        .icon{
            width: 0.5rem;
            height: 0.5rem;
        }
        .right{
            padding: 0 0 0 0.4rem;
            flex: 1;
            input{
                border: none;
                outline: none;
                border-bottom: 1px solid #666;
                width: 100%;
                height: 0.5rem;
            }
        }
        
    }
    .history{
        display: flex;
        margin-top: 1.2rem;
        .historyLeft{
            width: 1rem;
            height: 0.6rem;
            font-weight: 900;
            margin: 0.2rem 0rem;
            line-height: 0.6rem;
        }
        .historyRight{
            color:#666;
            display: flex;
            flex-wrap: wrap;
            flex: 1;
            .keywordItem{
                background-color: #eee;
                height: 0.6rem;
                padding: 0 0.2rem;
                border-radius: 0.4rem;
                line-height: 0.6rem;
                margin: 0.2rem 0.1rem;
            }
        }
    }
    .playlist{
    width: 7.5rem;
    padding: 0 0.4rem;
    background: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.5rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;

    .playlist-top{
        display: flex;
        justify-content: space-between;
        height: 1rem;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            .icon{
                width: 0.4rem;
                height: 0.4rem;
            }
            .title{
                font-size: 0.34rem;
                font-weight: 600;
                margin-left: 0.2rem;
            }
            .num{
                font-size: 0.3rem;
                color: #666;
                margin-left: 0.1rem;
            }
            .text{
                display: flex;
                align-items: center;
            }
        }
        .btn{
            font-size: 0.3rem;
            color: #fff;
            background: orangered;
            line-height: 0.6rem;
            padding: 0.1rem;
            border-radius: 0.4rem;
            margin-right: -0.2rem;
        }
    }
    .list{
        .playItem{
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1rem;
            margin-bottom: 0.6rem;
            .left{
                display: flex;
                align-items: center;
                .index{
                    color: #666;
                    width: 0.4rem;
                }
                .content{
                    margin-left: 0.4rem;
                }
                .title{
                    font-size: 0.32rem;
                    font-weight: 600;
                    margin-bottom: 0.1rem;
                }
                .tag{
                    font-size: 0.2rem;
                    white-space: nowrap;
                    color: orangered;
                    border: 1px solid orangered;
                    border-radius: 0.05rem;
                    margin-right: 0.06rem;
                }
                .tagdes{
                    width: 120px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    // border: 1px solid black;
                }
                .anthor{
                    color: #666;
                    display: flex;
                    justify-content: center;
                }
            }
            .right{
                .icon{
                    margin: 0 0.2rem;
                    width: 0.38rem;
                    height: 0.38rem;
                }
            }
        }
    }
    }
}
</style>