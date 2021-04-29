<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view></router-view>
    <player-bar></player-bar>
    <!--
    <nice-footer></nice-footer>
    <back-top></back-top> -->
  </div>
</template>

<script>
import NiceHeader from '@/components/common/header/Index'
import playerBar from '@/components/common/playBar/Index'
export default {
  name: 'App',
  components: {
    NiceHeader,
    playerBar
  }
}
</script>

<style>
@import './assets/styles/iconfont.css';
@import './assets/styles/common.css';
</style>
