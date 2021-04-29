<template>
    <div class="progress-bar-wrap" @mouseup.self="progressMouseUp($event)">
        <div class="progress-bar" ref="progressBar" @click="progressClick">
            <div class="bar-inner">
                <div class="progress" ref="progress"></div>
                <!-- prevent阻止冒泡 -->
                <div class="progress-btn" ref="progressBtn" @mousedown.prevent="progressMouseDown($event)" @mouseup="progressMouseUp($event)"></div>
            </div>
        </div>
    </div>
</template>

<script>
const progressBtnWidth = 12
export default {
    data () {
        return {
            playProcess: 0
        }
    },
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    methods: {
        progressMouseDown (event) {
            let that = this
            this.touch.initiated = true
            this.touch.startX = event.pageX
            this.touch.left = this.$refs.progress.clientWidth
            document.onmousemove = function (e) {
                // 计算移动位置
                const deltaX = e.pageX - that.touch.startX
                // 计算便宜位置
                const offsetWith = Math.min(
                    // 最大
                    that.$refs.progressBar.clientWidth - progressBtnWidth,
                    // 实际
                    Math.max(0, that.touch.left + deltaX)
                )
                if (offsetWith > that.$refs.progressBar.clientWidth) {
                    console.left('xxxx')
                }
                that._offset(offsetWith)
            }
        },
        progressMouseUp (event) {
            // 鼠标没有按下返回值是0 按下左键返回值是1 按下右键返回值是2
            if (event.button === 0) {
                if (document.onmousemove === null) {
                    return
                }
                document.onmousemove = null
                document.onmouseup = null
                this.touch.initiated = false
                this._triggerPercent()
            }
        },
        _offset (offsetWith) {
            this.$refs.progress.style.width = `${offsetWith}px`
        },
        _triggerPercent () {
            this.$emit('percentChange', this._getPercent)
        },
        // 计算百分比
        _getPercent () {
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            return this.$refs.progress.clientWidth / barWidth
        },
        // 点击控制进度
        progressClick (event) {
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = event.pageX - rect.left - 6
            this._offset(offsetWidth)
            this._triggerPercent()
        },
        // 设置进度条位置
        setProgressOffset (percent) {
            if (percent >= 0 && !this.touch.initiated) {
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const offsetWidth = percent * barWidth
                this._offset(offsetWidth)
            }
        }
    },
    created () {
        this.touch = {}
    },
    watch: {
        percent (newPercent) {
            this.setProgressOffset(newPercent)
        }
    }
}
</script>

<style>
.progress-bar-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}

.progress-bar-wrap .progress-bar {
    position: relative;
    width: 100%;
    flex: 1;
    height: 3px;
    background-color: rgba(0, 0, 0, .05);
    border-radius: 2px;
    cursor: pointer;
    margin: 0 25px;
}

.progress-bar-wrap .progress-bar .bar-inner{
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
}

.progress-bar-wrap .progress-bar .bar-inner .progress{
    width: 0px;
    background-color: #fa2b00;
    height: 3px;
    border-radius: 2px;
}

.progress-bar-wrap .progress-bar .bar-inner .progress-btn {
    position: absolute;
    z-index: 100;
    right: -12px;
    width: 12px;
    height: 12px;
    top: -4.5px;
    background-color: #fa2b00;
    transition: all 0.3s;
    border-radius: 50%;
}

.progress-bar-wrap .progress-bar .bar-inner .progress-btn::after {
    position: absolute;
    content: " ";
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
}

.progress-bar-wrap .progress-bar .bar-inner .progress-btn:hover {
    transform: scale(1.2);
}

</style>
