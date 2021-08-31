<template>
  <div class="home">
    <!-- 顶部导航栏 -->
    <topNav></topNav>
    <!-- 轮播图 -->
    <swiperCom></swiperCom>
    <!-- 图标列表小导航 -->
    <iconList></iconList>
    <!-- 发现好歌单 -->
    <musicList></musicList>
  </div>
</template>

<script>
import topNav from '@/components/topNav.vue'
import swiperCom from '@/components/swiperCom.vue'
import iconList from '@/components/iconList.vue'
import musicList from '@/components/musicList.vue'

export default {
  name: 'Home',
  components: {
    topNav,
    swiperCom,
    iconList,
    musicList,
  },
  data(){
    return{
    }
  },
  computed: {

  }, 
}
</script>

<style lang="less" scoped>
#d1{
  //1rem == 100px 3.75rem是屏幕一半的大小
  width: 3.75rem;
  height: 3.75rem;
  background: skyblue;
}

</style>
