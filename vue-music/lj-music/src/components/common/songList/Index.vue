<template>
    <div class="song-list">
        <div class="song-item" v-for="(item, index) in songList" :key="item.id">
            <div class="song-wrapper shadow">
                <h2 class="number">{{ utils.formatZero(index + 1, 2) }}</h2>
                <div class="avatar">
                    <el-image
                    :key="item.picUrl + '?param=300y300'"
                    :src="item.picUrl + '?param=300y300'"
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
                <div class="info">
                    <p class="name">{{ item.name }}</p>
                    <p class="author"> {{ artistName(item) }}
                        <!-- <span
                        class="author"
                        v-for="artist of item.song.artists"
                        :key="artist.id"
                        >
                        {{ artist.name }}
                        </span> -->
                    </p>
                </div>
                <p class="album">《{{ item.song.album.name }}》</p>
                <p class="duration transition">
                    {{ utils.formatTime(item.song.duration) }}
                </p>
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
        songList: {
            type: Array
        }
    },
    methods: {
        artistName (item) {
            console.log(item)
            let name = ''
            item.song.artists.forEach(artist => {
                name = name + '/' + artist.name
            })
            name = name.substr(1)
            return name
        }
    }
}
</script>

<style>
.song-list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
}

.song-item {
    flex: 0 0 50%;
    max-width: 50%;
    margin-bottom: 20px;
    padding: 0 15px 30px;
    height: 80px;
    box-sizing: border-box;
}

.song-item .song-wrapper {
    display: flex;
    flex-wrap: nowrap;
    justify-content: start;
    align-items: center;
    height: 80px;
}

.song-item .number {
    font-size: 15px;
    color: #000000;
    margin-right: 30px;
    margin-left: 30px;
}

.song-item .avatar {
    width: 55px;
    height: 55px;
    border-radius: 5px;
    position: relative;
    margin-right: 30px;
}

.song-item .avatar img {
    width: 55px;
    height: 55px;
    border-radius: 5px;
    background-size: 100% auto;
}

.song-item .avatar .layer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    opacity: 0;
}

.song-item .song-wrapper .info {
    width: 15%;
    color: #333333;
    font-weight: bold;
}

.song-item .song-wrapper .info p {
    display: inline-block;
}

.song-item .song-wrapper .info .author {
    font-size: 12px;
    color: #666666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}

.song-item .song-wrapper .album {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    margin-left: 80px;
}

.song-item .song-wrapper .duration {
    font-size: 14px;
    color: #333333;
    font-weight: bold;
    padding-right: 30px;
    box-sizing: border-box;
}

</style>
