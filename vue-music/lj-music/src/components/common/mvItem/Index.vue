<template>
    <li class="mv-item-li">
        <div class="cover">
            <div class="image">
                <el-image
                    :key="item.image + '?param=352y197'"
                    :src="item.image + '?param=325y197'"
                    lazy
                >
                    <div slot="placeholder" class="image-slot flex-center flex-column">
                        <i class="iconfont niceicon-3"></i>
                        <p>加载中<span class="dot">...</span></p>
                    </div>
                        <div slot="error" class="image-slot flex-center">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </div>
            <div class="count">
                <i class="arrow"></i>
                <span>{{ utils.tranNumber(item.playCount, 0) }}</span>
            </div>
            <div class="action">
                <button
                    class="play flex-center"
                    title="播放"
                    v-if="!item.isLive"
                >
                    <i class="iconfont nicebofang1"></i>
                </button>
                <button
                    class="play flex-center"
                    title="播放"
                    v-else
                >
                    <i class="iconfont nicebofang1"></i>
                </button>
            </div>
            <div class="foot">
                <p>{{ item.nickName }}</p>
                <p>{{ item.duration }}</p>
            </div>
        </div>
        <div class="info">
            <p class="name">{{ item.name }}</p>
        </div>
    </li>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        item: {
            type: Object
        }
    }
}
</script>

<style>
.mv-item-li {
    padding: 0 15px 30px;
    flex: 0 0 25%;
    max-width: 25%;
    list-style: none;
    box-sizing: border-box;
}
.mv-item-li .cover{
    position: relative;
    z-index: 2;
    padding-top: 56%;
    border-radius: 2px;
    background-color: #000;
}

.mv-item-li .cover .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.mv-item-li .cover .count {
    position: absolute;
    right: 16px;
    top: 1px;
    height: 24px;
    padding-left: 9px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
    background-size: cover;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.mv-item-li .cover .count:after {
    content: '';
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
    background-size: cover;
}

.mv-item-li .cover .arrow {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #ffffff;
    margin-right: 5px;
}

.mv-item-li .cover .action {
    display: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.mv-item-li .cover .action .play {
    width: 32px;
    height: 32px;
    padding: 0;
    border: none;
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
    background-color: #fa2800;
}

.mv-item-li .cover .action .play i {
    font-size: 12px;
}

.mv-item-li .cover .foot {
    width: 100%;
    height: 35px;
    background: rgba(0,0,0, 0.6);
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 12px;
}

.mv-item-li .cover .foot p {
    color: #ffffff;
}

.mv-item-li .cover:hover .action {
    display: flex;
}

.mv-item-li .info {
    margin-top: 15px;
}

.mv-item-li .info .name{
    text-align: left;
    font-size: 14px;
    line-height: 18px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #999999;
}

.mv-item-li .info .count{
    font-size: 12px;
    margin-top: 10px;
    color: #fa2800;
}

</style>
