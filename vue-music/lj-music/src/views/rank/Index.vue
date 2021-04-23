<template>
    <div class="rank-wrapper">
        <div class="music-rank">
            <div class="top">
                <div class="line"></div>
                <span class="title">云音乐特色榜</span>
            </div>
            <song-sheet class="music-sheet" :sheetList="musicSheet" @itemClick="itemPressed"></song-sheet>
        </div>
        <div class="global-rank">
            <div class="top">
                <div class="line"></div>
                <span class="title">全球媒体榜</span>
            </div>
            <song-sheet class="global-sheet" :sheetList="globalSheet" @itemClick="itemPressed"></song-sheet>
        </div>
    </div>
</template>

<script>
import songSheet from '@/components/common/songSheet/Index'
export default {
    data () {
        return {
            musicSheet: [],
            globalSheet: []
        }
    },
    components: {
        songSheet
    },
    methods: {
        async getTopList () {
            try {
                let res = await this.$api.getToplist()
                if (res.code === 200) {
                    let ranks = res.list
                    this.musicSheet = ranks.slice(0, 4)
                    this.globalSheet = ranks.slice(4, ranks.length)
                }
            } catch (error) {
                console.log(error)
            }
        },
        itemPressed (id) {
            console.log(id)
        }
    },
    mounted () {
        this.getTopList()
    }
}
</script>

<style>
.rank-wrapper {
    max-width: 1380px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

.top {
    display: inline-block;
    position: relative;
    margin-bottom: 20px;
}

.top .line {
    background-color: rgb(250, 40, 0);
    height: 100%;
    width: 3px;
    position: absolute;
    left: 0;
    top: 0;
}

.top .title {
    color: #4a4a4a;
    margin-left: 20px;
}

</style>
