<template>
    <div class="recommend-music">
        <h2 class="title">推荐歌曲</h2>
        <song-list :songList="songs"></song-list>
    </div>
</template>

<script>
import songList from '@/components/common/songList/Index'

export default {
    data () {
       return {
           songs: []
       }
    },
    components: {
        songList
    }
}
</script>

<style>

</style>
