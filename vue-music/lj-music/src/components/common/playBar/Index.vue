<template>
    <div class="play-bar shadow">
        <div class="avatar">
            <img :src="currentSong.picUrl" alt="nicemusic">
        </div>
        <div class="info">
            <h2>{{ currentSong.name }}</h2>
            <p>{{ currentSong.song.artists[0].name }}</p>
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
            <p class="play-time">{{ formatTime(currentTime) }}</p>
            <progress-bar :percent="percent" @percentChange="onPercentBarChange"></progress-bar>
            <p class="all-time">{{ formatTime(durationTime) }}</p>
        </div>
        <div class="volume-wrap">
            <i
                class="iconfont volume-icon"
                @click="changeMuted"
                :class="mutedIcon"
            ></i>
            <progress-bar :percent="volumePercent" @percentChange="onVolumePercentBarChange"></progress-bar>
        </div>
        <div class="tool">
            <i class="iconfont" :class="modeIcon" @click="changeMode"></i>
            <i class="iconfont nicegeci32"></i>
            <i class="iconfont nicebofangliebiao24"></i>
        </div>
        <audio
            ref="audio"
            :src="audioUrl"
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
import progressBar from '@/components/common/progressBar/Index'
import { mapGetters, mapMutations } from 'vuex'
export default {
    data () {
        return {
            songReady: false,
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
        ...mapMutations({
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        onVolumePercentBarChange (value) {
            this.volumePercent = value
            this.$refs.audio.volume = value
        },
        onPercentBarChange (value) {
            const currentTime = this.durationTime * value
            this.currentTime = this.$refs.audio.currentTime = currentTime
            if (!this.playing) {
                this.togglePlaying()
            }
        },
        nextSong () {

        },
        prevSong () {

        },
        togglePlaying () {
            if (!this.songReady) {
                return
            }
            this.setPlayingState(!this.playing)
        },
        changeMode () {
        },
        changeMuted () {
            this.isMuted = !this.isMuted
            this.$refs.audio.muted = this.isMuted
        },
        // 格式化时间
        formatTime (interval) {
            interval = interval | 0
            const m = (interval / 60) | 0
            const s = interval % 60
            return `${this.utils.formatZero(m, 2)}:${this.utils.formatZero(s, 2)}`
        },
        audioReady () {
            console.log('准备')
            clearTimeout(this.timer)
            this.songReady = true
        },
        audioError () {
            console.log('错误')
            clearTimeout(this.timer)
            this.songReady = true
        },
        updateTime (e) {
            this.currentTime = e.target.currentTime
        },
        audioEnd () {
            this.currentTime = 0
            this.nextSong()
        },
        audioPaused () {
            this.setPlayingState(false)
        }
    },
    computed: {
        ...mapGetters([
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ]),
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
            return this.currentTime / this.durationTime
        },
        audioUrl () {
            console.log(this.currentSong.id)
            return 'https://music.163.com/song/media/outer/url?id=' + this.currentSong.id + '.mp3'
        },
        durationTime () {
            return this.currentSong.song.duration / 1000
        }
    },
    watch: {
        // 监听播放状态
        playing (isPlaying) {
            if (!this.songReady) {
                return
            }
            this.$nextTick(() => {
                console.log(isPlaying)
                const audio = this.$refs.audio
                if (audio) {
                    isPlaying ? audio.play() : audio.pause()
                }
            })
        },
        currentSong (newSong, oldSong) {
            if (!newSong.id || newSong.id === oldSong.id) {
                return
            }
            this.songReady = false
            this.$nextTick(() => {
                const audio = this.$refs.audio
                if (audio) {
                    audio.src = 'https://music.163.com/song/media/outer/url?id=' + newSong.id + '.mp3'
                    audio.volume = this.volumePercent
                    audio.play()
                    this.id = newSong.id
                }
            })
            // 若歌曲 5s 未播放，则认为超时，修改状态确保可以切换歌曲。
            clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                this.songReady = true
            }, 5000)
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.$refs.audio.play()
        })
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

.play-bar .avatar {
    width: 60px;
    height: 60px;
    border-radius: 5px;
    background: red;
    font-size: 10px;
    margin-left: 20px;
}

.play-bar .avatar img{
    width: 60px;
    height: 60px;
    border-radius: 5px;
}

.play-bar .info {
    height: 100%;
    margin-top: 0;
    margin-left: 30px;
}

.play-bar .info h2 {
    color: black;
    font-size: 14px;
}

.play-bar .info p {
    color: #999999;
    font-size: 12px;
}

.play-bar .play-btn {
    height: 100%;
    margin-top: 0;
    margin-left: 30px;
    flex-shrink: 0;
}

.play-bar .play-btn {
    height: 100%;
    margin-top: 0;
    margin-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-bar .play-btn .icon-prev,.icon-next{
    font-size: 40px;
    margin-top: 0;
    margin-left: 20px;
    cursor: pointer;
}

.play-bar .play-btn .icon-play{
    font-size: 60px;
    margin-top: 0;
    margin-left: 20px;
    cursor: pointer;
}

.play-bar .progress-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 40%;
}

.play-bar .volume-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 200px;
    margin-left: 20px;
}

.play-bar .volume-wrap i {
    font-size: 30px;
    cursor: pointer;
}

.play-bar .tool {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    margin-left: 30px;
}

.play-bar .tool i{
    font-size: 30px;
    cursor: pointer;
}

</style>
