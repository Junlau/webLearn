<template>
    <div class="list">
        <div class="item" v-for="item in sheetList" :key="item.id" v-on:click="itemClick( item.id )">
            <div class="wrapper">
                <a>
                    <div class="cover">
                        <div class="image">
                            <el-image
                                :key="item.picUrl || item.coverImgUrl + '?param=300y300'"
                                :src="item.picUrl || item.coverImgUrl + '?param=300y300'"
                                lazy
                            >
                                <div
                                    slot="placeholder"
                                    class="image-slot flex-center flex-column"
                                    >
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
                    </div>
                </a>
            </div>
            <div class="info">
                <span class="name">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        sheetList: {
            type: Array
        }
    },
    mounted () {
        console.log(this.sheetList)
    },
    methods: {
        itemClick (id) {
            this.$emit('itemClick', id)
        }
    }
}
</script>

<style>
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    box-sizing: border-box;
}
.item {
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 15px 30px;
    box-sizing: border-box;
}

.wrapper {
    position: relative;
    padding-right: 10px;
}

.wrapper .cover {
    position: relative;
    z-index: 2;
    border-radius: 2px;
    background-color: #d9d9d9;
    height: 100%;
    /* 确定高度大小 100%是相对于父视图的宽度 */
    padding-top: 100%;
}

.cover .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
}

.cover .image::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    -webkit-box-shadow: 1px 1px 0 rgba(0,0,0,.05) inset, -1px -1px 0 rgba(0,0,0,.05) inset;
    box-shadow: inset 1px 1px 0 rgba(0,0,0,.05), inset -1px -1px 0 rgba(0,0,0,.05);
}

.cover .count {
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

.cover .count .arrow {
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 0 4px 6px;
    border-color: transparent transparent transparent #ffffff;
    margin-right: 5px;
}

.cover .count .arrow::after {
    content: "";
    position: absolute;
    right: -14px;
    top: 0;
    width: 14px;
    height: 24px;
    background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
    background-size: cover;
}

.info {
    margin-top: 15px;
}

.info .name {
    font-size: 14px;
}
</style>
