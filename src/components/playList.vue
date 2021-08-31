<template>
  <div class="playlist">
        <!-- 头部 -->
        <div class="playlist-top">
            <div class="left">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-bofang3"></use>
                </svg>
                <div class="text">
                    <div class="title">播放全部</div>
                    <div class="num">(共{{playlist.tracks.length}}首)</div>
                </div>
            </div>
            <div class="btn">
                + 收藏 ({{changeValue(playlist.subscribedCount)}})
            </div>
        </div>
        <!-- 歌曲列表 -->
        <div class="list">
            <div class="playItem" v-for="(item,index) in playlist.tracks" :key="index" @click="setPlayIndex(index)">
                <div class="left">
                    <div class="index">{{index+1}}</div>
                    <div class="content">
                        <div class="title">{{item.name}}</div>
                        <div class="anthor">
                            <span class="tag" v-for="(tag,i) in playlist.tags" :key="i">{{tag}}</span>
                            <span>
                                <div class="tagdes">{{item.al.name}}</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-bofang"></use>
                    </svg>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liebiaolist29"></use>
                    </svg>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    props:['playlist'],
    methods: {
        changeValue(num){
            let res = 0
            if(num>=100000000){
                res = num/100000000
                res = res.toFixed(2) + '亿'//拿小数点后两位
            }else if(num > 10000){
                res = num/10000
                res = res.toFixed(2) + '万'
            }
            return res
        },
        ...mapMutations(['setPlayIndex'])
    },
}
</script>

<style lang="less" scoped>
.playlist{
    width: 7.5rem;
    padding: 0 0.4rem;
    background: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    margin-top: 0.5rem;
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
</style>