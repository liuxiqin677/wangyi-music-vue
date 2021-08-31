<template>
  <div class="playContentRoller">
      <div class="left" @click="show=!show">
          <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
          <div class="content">
              <div class="title">{{playlist[playCurrentIndex].al.name}}</div>
              <div class="tips">横滑可以切换上下首哦</div>
          </div>
      </div>
      <div class="right">
          <svg v-if="isPaused" class="icon" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofang1"></use>
          </svg>
          <svg v-else class="icon" aria-hidden="true" @click="play">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-liebiao"></use>
          </svg>
      </div>
      <playMusic :play="play" :isPaused='isPaused' @back="show=!show" v-show="show" :playDetail="playlist[playCurrentIndex]"></playMusic>
      <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import playMusic from '../components/playMusic.vue'
export default {
    data(){
        return{
            isPaused:false,
            show:false
        }
    },
    computed:{
        ...mapState(['playlist','playCurrentIndex'])
    },
    mounted() {
        console.log(this.$refs.audio)
        this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    updated() {
        console.log(this.playlist[this.playCurrentIndex])
        this.$store.dispatch('reqLyric',{id:this.playlist[this.playCurrentIndex].id})
    },
    methods: {
        play(){
            if(this.$refs.audio.paused){
                this.$refs.audio.play()
                this.isPaused = true
                this.UpdateTime()
            }else{
                this.$refs.audio.pause()
                this.isPaused = false
                clearInterval(this.$store.state.id)
            }
        },
        UpdateTime(){
            this.$store.state.id = setInterval(() => {
                this.$store.commit('setCurrentTime',this.$refs.audio.currentTime)
            },1000)
        }
    },
    components:{
        playMusic
    }
}
</script>

<style lang="less" scoped>
.playContentRoller{
    width: 7.5rem;
    height: 1.2rem;
    position: fixed;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ccc;
    background: #fff;
    .left{
        display: flex;
        padding: 0 0.4rem;
        img{
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 0.4rem;
        }    
        .content{
            margin-left: -0.2rem;
            padding: 0 0.4rem;
            .tips{
                font-size: 0.2rem;
                color: #999;
            }
            .title{
                width: 3.3rem;
                // border: 1px solid black;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
        }
    }
    .right{
        .icon{
            margin: 0 0.2rem;
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>