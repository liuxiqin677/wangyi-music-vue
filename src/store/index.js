import { createStore } from 'vuex'
import {getLyric,phoneLogin} from '@/api/index.js'
import api from '@/api/index.js'

export default createStore({
  state: {
    playlist:[
      {
        name:'晚风',
        id:1441758494,
        al:{
          id: 88188476,
          name: "晚风",
          pic: 109951164919449760,
          picUrl: "http://p4.music.126.net/lCblKUB1hLND5FxiVI1_Lw==/109951164919449758.jpg",
          pic_str: "109951164919449758",
        }
      }
    ],
    playCurrentIndex:0,
    lyric:'',
    currentTime:0,
    intervalId:0,
    user:{
      isLogin:false,
      account:{},
      userDetail:{},
    }
  },
  getters:{
    lyricList(state){
      let arr = state.lyric.split(/\n/igs).map((item,i,arr) => {
          let min = parseInt(item.slice(1,3))
          let sec = parseInt(item.slice(4,6))
          let mill = parseInt(item.slice(7,10)) 
          
          return {
            min,sec,mill,
            lyric:item.slice(12,item.length),
            content:item,
            time:mill + sec*1000 + min*60*1000
          }
      })
      arr.forEach((item,i) => {
        if(i==0){
          item.pre = 0
        }else{
          item.pre = arr[i-1].time
        }
      })
      return arr
    }
  },
  mutations: {
    setPlayList(state,value){
      state.playlist = value
    },
    pushPlayList(state,value){
      state.playlist.push(value)
    },
    setPlayIndex(state,index){
      state.playCurrentIndex = index
    },
    setLyric(state,lyric){
      state.lyric = lyric
    },
    setCurrentTime(state,value){
      state.currentTime = value
    },
    setUser(state,value){
      state.user = value
    }
  },
  actions: {
    async reqLyric({commit},payload){
      console.log(payload)
      let res = await getLyric(payload.id)
      commit('setLyric',res.data.lrc.lyric)
      console.log(res.data.lrc.lyric)
    },
    async phoneLogin({commit},payload){
      let res = await phoneLogin(payload.phone,payload.password)
      // console.log(res)
      if(res.data.code ==200){
        this.state.user.isLogin = true
        this.state.user.account = res.data.account

        let userDetail = await api.userDetail(this.state.user.account.id)
        console.log(userDetail)
        this.state.userDetail = userDetail.data
        localStorage.userData = JSON.stringify(this.state.user)
        commit('setUser', this.state.user)
      }
      return res
    }
  },
  modules: {
  }
})
