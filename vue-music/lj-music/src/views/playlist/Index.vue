<template>
    <div class="playlist-wrap">
        <div class="filter shadow"></div>
        <song-sheet :sheetList="playlistSheet" @itemClick="itemPressed" v-loading="fullscreenLoading"></song-sheet>
        <div class="page-wrap"></div>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    components: {
        songSheet
    },
    data () {
        return {
           playlistSheet: [],
           sortType: 'hot',
           currentCat: '全部',
           limit: 40,
           offset: 0,
           pageTotal: 0,
           fullscreenLoading: false
        }
    },
    methods: {
        itemPressed () {
        },
        // 获取数据
        async getPlayList () {
            this.fullscreenLoading = true
            let param = {
                order: this.sortType,
                cat: this.currentCat,
                limit: this.limit,
                offset: this.offset
            }
            try {
                let res = await this.$api.getPlayList(param)
                this.fullscreenLoading = false
                if (res.code === 200) {
                    this.playlistSheet = res.playlists
                    this.pageTotal = res.total
                }
            } catch (error) {
                this.$message.error('error')
            }
        }
    },
    mounted () {
        this.getPlayList()
    }
}
</script>

<style>
.playlist-wrap {
    max-width: 1380px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}
</style>
