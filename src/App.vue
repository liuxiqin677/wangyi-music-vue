<template>
  <div>
      <router-view/>
      <playContentRoller></playContentRoller>
  </div>
</template>

<script>
import playContentRoller from './components/playContentRoller.vue'
export default {
  components:{
    playContentRoller
  },
  mounted() {
    let userData = JSON.parse(localStorage.userData)
    this.$store.commit('setUser',userData)
  },
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: '微软雅黑';
}
.icon{
  width: 0.30rem;
  height: 0.30rem;
}
a{
  color:#333;
  text-decoration: none;
}
</style>
