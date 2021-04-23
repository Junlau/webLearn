<template>
    <div class="recommend-music">
        <h2 class="title">推荐歌曲</h2>
        <song-list :songList="songs"></song-list>
    </div>
</template>

<script>
import songList from '@/components/common/songList/Index.vue'

export default {
    data () {
       return {
           songs: []
       }
    },
    components: {
        songList
    },
    methods: {
        async getNewSongs () {
            try {
                let res = await this.$api.getNewSongs()
                if (res.code === 200) {
                    this.songs = res.result
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted () {
        this.getNewSongs()
    }
}
</script>

<style>
.recommend-music {
    width: 100%;
    box-sizing: border-box;
}

.recommend-music .title {
    margin: 0 0 15px 0;
}

</style>
