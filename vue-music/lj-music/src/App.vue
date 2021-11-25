<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view></router-view>
    <player-bar v-if="playList.length"></player-bar>
    <!--
    <nice-footer></nice-footer>
    <back-top></back-top> -->
  </div>
</template>

<script>
import NiceHeader from '@/components/common/header/Index'
import playerBar from '@/components/common/playBar/Index'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    NiceHeader,
    playerBar
  },
  computed: {
    ...mapGetters([
      'playList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  }
}
</script>

<style>
@import './assets/styles/iconfont.css';
@import './assets/styles/common.css';
</style>
