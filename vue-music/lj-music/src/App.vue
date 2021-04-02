<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view/>
    <!-- <player-bar></player-bar>
    <nice-footer></nice-footer>
    <back-top></back-top> -->
  </div>
</template>

<script>
import NiceHeader from '@/components/common/header/Index'
export default {
  name: 'App',
  components: {
    NiceHeader
  }
}
</script>

<style>
@import './assets/styles/iconfont.css';
</style>
