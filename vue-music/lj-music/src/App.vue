<template>
  <div id="app">
    <nice-header></nice-header>
    <router-view/>
    <player-bar></player-bar>
    <nice-footer></nice-footer>
    <back-top></back-top>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import './assets/styles/iconfont.css';
</style>
