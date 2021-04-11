<template>
    <div class="home-wrapper">
        <banner></banner>
        <recommend-songs></recommend-songs>
        <!-- <recommend-music></recommend-music> -->
    </div>
</template>

<script>
import Banner from '@/components/home/banner/Index'
import RecommendSongs from '@/components/home/recommend-songs/Index'
// import RecommendMusic from '@/components/home/recommend-music/Index'
export default {
    data () {
        return {
        }
    },
    components: {
        Banner,
        // RecommendMusic,
        RecommendSongs
    }
}
</script>

<style>
.home-wrapper {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
