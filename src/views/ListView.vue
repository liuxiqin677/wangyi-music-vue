<template>
  <div class="listView">
      <listviewTop :playlist="state.playlist"></listviewTop>
      <playList :playlist="state.playlist"></playList>
  </div>
</template>

<script>
import {getPlayListDetail} from '../api/index'
import {onMounted,reactive} from 'vue'
import store from '../store/index'
// useRoute相当于vue2的this.$route,必须写到setup中
// useRouter相当于vue2的this.$router,必须写到setup中
import { useRoute, useRouter } from "vue-router"

import listviewTop from '../components/listviewTop.vue'
import playList from '../components/playList.vue'

export default {
    setup(props) {
        const route = useRoute()
        // console.log(route)
        let state = reactive({
            list:[],
            playlist:{
                // 为了避免一开始传过去的数据还没定义，所以人为的定义空值
                creator:{},
                tracks:[]
            }
        })
        onMounted(async() => {
            let id = route.query.id
            let res = await getPlayListDetail(id)
            state.playlist = res.data.playlist
            store.commit('setPlayList',state.playlist.tracks)
            console.log(state.playlist.tracks)
        })
        return{
            state
        }
    },
    components:{
        listviewTop,
        playList
    }
}
</script>

<style>

</style>