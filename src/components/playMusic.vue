<template>
  <div class="playMusic">
      <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
      <div class="playTop">
          <div class="back" @click="$emit('back')">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-zuojiantou1"></use>
                </svg>
          </div>
          <div class="center">
                <div class="title">
                    <!-- 跑马灯的标签 -->
                    <marquee behavior="scroll" direction="left">{{playDetail.al.name}}</marquee>  
                </div>
          </div>
          <div class="share">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
          </div>
      </div>

      <div class="playContent" v-show="!isLyric">
          <img class="needle" :class="{active:isPaused}" src="../assets/img/needle-ab.png" alt="">
          <img class="disc" src="../assets/img/desc_touming.png" alt="">
          <img class="playImg" :src="playDetail.al.picUrl" alt="">
      </div>
      <div class="playLyric" v-show="isLyric" ref="playLyric">
          <p :class="{active:(currentTime*1000>=item.pre && currentTime*1000 < item.time)}" v-for="(item,i) in $store.getters.lyricList" :key="i">{{item.lyric}}</p>
          <!-- {{$store.state.lyric}} -->
      </div>
      <div class="playFooter">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
             </svg>
             <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
             </svg>
             <svg v-if="isPaused" class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang1"></use>
             </svg>
             <svg v-else class="icon play" aria-hidden="true" @click="play">
                <use xlink:href="#icon-bofang"></use>
            </svg>
             <svg class="icon" aria-hidden="true" @click="goPlay(1)">
                <use xlink:href="#icon-49xiayishou"></use>
             </svg>
             <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao"></use>
             </svg>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data(){
        return{
            isLyric:true
        }
    },
    computed:{
        ...mapState(['lyric','currentTime','playlist','playCurrentIndex']),
    },
    props:['playDetail','isPaused','play'],
    methods: {
        goPlay(num){
            let index = this.playCurrentIndex + num
            if(index < 0){
                index = this.playlist.length - 1
            }else if(index == this.playlist.length){
                index = 0
            }
            this.$store.commit('setPlayIndex',index)
        }
    },
    watch:{
        currentTime(newValue){
            let p = document.querySelector('p.active')
            let offsetTop = p.offsetTop
            
            this.$refs.playLyric.scrollTop = p.offsetTop
        }
    }
}
</script>

<style lang="less" scoped>
.playMusic{
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-color: white;
    .bg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-size:auto 100%;
        filter: blur(60px);
        background-position: center;
    }
    .playTop{
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 7.5rem;
        height: 1.2rem;
        position: absolute;
        left: 0;
        top: 0;
        color: #fff;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.6rem;
            height: 0.6rem;
        }
        marquee{
            width: 5rem;
            flex: 1;
        }
    }
    .playContent{
        position: absolute;
        width: 7.5rem;
        height: 7.5rem;
        left: 0;
        top: 1.5rem;
        .needle{
            width: 2.5rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(-10deg);
            transition: all 1s;
            z-index: 10;
        }
        .needle.active{
            width: 2.5rem;
            height: auto;
            position: absolute;
            left: 3.5rem;
            transform-origin: 0.3rem 0;
            transform: rotate(30deg);
            transition: all 1s;
            z-index: 10;
        }
        .disc{
            width: 5.5rem;
            height: auto;
            position: absolute;
            left: calc(50% - 2.75rem);
            top: 2.5rem;
        }
        .playImg{
            width: 3.5rem;
            height: 3.5rem;
            border-radius: 3.5rem;
            position: absolute;
            left: calc(50% - 1.75rem);
            top: 3.55rem;
        }
    }
    .playFooter{
        width: 7.5rem;
        height: 1.5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 0.4rem;
        .icon{
            fill: #fff;
            width: 0.5rem;
            height: 0.5rem;
        }
        .play{
            width: 1rem;
            height: 1rem;
        }
    }
    .playLyric{
       position: absolute;
       width: 7.5rem;
       height: 8rem;
       left: 0;
       top: calc(50% - 4rem);
       overflow: scroll;
       text-align: center;
       color: #fff;
       padding: 0.2rem 0;
        .active{
            color: red;
        }
       p{
           margin: 0.3rem 0;
       }
    }
}
</style>