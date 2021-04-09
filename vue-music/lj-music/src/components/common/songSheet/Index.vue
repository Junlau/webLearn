<template>
    <div class="list">
        <div class="item" v-for="item in sheetList" :key="item.id">
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
                            <span>{{ item.playCont }}</span>
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
    }
}
</script>

<style>
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}
.item {
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 15px 30px;
}
</style>
