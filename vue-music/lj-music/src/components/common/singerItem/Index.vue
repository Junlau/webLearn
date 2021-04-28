<template>
    <li class="singer-item-li">
        <div class="cover">
            <div class="image">
                <el-image
                    :key="item.img1v1Url + '?param=200y200'"
                    :src="item.img1v1Url + '?param=200y200'"
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
        </div>
        <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="count" v-if="item.musicSize">单曲数{{ item.musicSize }}</p>
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
.singer-item-li {
    padding: 0 15px 30px;
    flex: 0 0 10%;
    max-width: 10%;
    list-style: none;
    box-sizing: border-box;
}
.singer-item-li .cover{
    position: relative;
    z-index: 2;
    padding-top: 100%;
    border-radius: 50%;
    background-color: #d9d9d9;
}

.singer-item-li .cover .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
}

.singer-item-li .info {
    margin-top: 15px;
    text-align: center;
}

.singer-item-li .info .name{
    font-weight: 700;
    font-size: 14px;
    line-height: 18px;
    word-break: break-word;
}

.singer-item-li .info .count{
    font-size: 12px;
    margin-top: 10px;
    color: #fa2800;
}

</style>
