<template>
    <div class="play-bar shadow">
        <div class="avatar">
            <img src="" alt="nicemusic">
        </div>
        <div class="info">
            <h2>虚构人设</h2>
            <p>张腾</p>
        </div>
        <div class="play-btn">
            <i class="iconfont icon-prev niceshangyishou" @click="prevSong"></i>
            <i
                class="iconfont icon-play nicebofang2"
                :class="playIcon"
                @click="togglePlaying"
            ></i>
            <i class="iconfont icon-next nicexiayishou" @click="nextSong"></i>
        </div>
        <div class="progress-wrap">
            <p class="play-time">01:58</p>
            <progcess-bar :percent="percent" @percentChange="onPercentBarChange"></progcess-bar>
            <p class="all-time">04:58</p>
        </div>
        <div class="volume-wrap">
            <i
                class="iconfont volume-icon"
                @click="changeMuted"
                :class="mutedIcon"
            ></i>
            <progcess-bar :percent="volumePercent" @percentChange="onVolumePercentBarChange"></progcess-bar>
        </div>
        <div class="tool">
            <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont nicegeci32"></i>
            <i class="iconfont nicebofangliebiao24"></i>
        </div>
        <audio
            ref="audio"
            :src="currentSong.url"
            @playing="audioReady"
            @error="audioError"
            @timeupdate="updateTime"
            @ended="audioEnd"
            @pause="audioPaused"
            :muted="isMuted"
        ></audio>
    </div>
</template>

<script>
import progressBar from 'components/common/progressBar/Index'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            volumePercent: 0.5,
            isMuted: false,
            currentTime: 0,
            playMode: {
                sequence: 0,
                loop: 1,
                random: 2
            }
        }
    },
    components: {
        progressBar
    },
    methods: {
        onVolumePercentBarChange (value) {
            this.$refs.audio.volume = value
        },
        onPercentBarChange (value) {

        },
        nextSong () {

        },
        prevSong () {

        },
        togglePlaying () {

        },
        changeMode () {
        },
        changeMuted () {
            this.isMuted = !this.isMuted
            this.$refs.audio.muted = this.isMuted
        }
    },
    computed: {
        // 播放暂停按钮
        playIcon () {
            return this.playing ? 'nicezanting1' : 'nicebofang2'
        },
        // 播放模式
        modeIcon () {
            return this.mode === this.playMode.sequence
            ? 'nicexunhuanbofang24'
            : this.mode === this.playMode.loop
            ? 'nicebofangqidanquxunhuan'
            : 'nicebofangqisuijibofang'
        },
        // 是否静音
        mutedIcon () {
            return this.isMuted ? 'nicejingyin1' : 'niceshengyin1'
        },
        // 进度条
        percent () {
            return this.currentTime / this.currentSong.duration
        },
        ...mapGetters([
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    watch: {
        // 监听歌曲内容变化
    }
}
</script>

<style>
.play-bar {
    width: 100%;
    height: 72px;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 8000;
    padding: 0 10px 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
