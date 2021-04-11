<template>
    <div class="recommend-songs">
        <h2 class="title">推荐歌单</h2>
        <song-sheet :sheetList="recommendedSongLists"></song-sheet>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    data () {
        return {
            recommendedSongLists: [],
            limit: 16
        }
    },
    components: {
        songSheet
    },
    methods: {
        async getSongList () {
            try {
                let res = await this.$api.getPersonalized(this.limit)
                console.log(res)
                if (res.code === 200) {
                    this.recommendedSongLists = res.result
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    // 生命周期 - 挂载完成（可以访问DOM元素）
    mounted () {
        this.getSongList()
    }
}
</script>

<style>
.recommend-songs{
    margin-top: 40px;
}
.recommend-songs .title {
    margin: 0 0 15px 0;
}
</style>
