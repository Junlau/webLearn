<template>
    <div class="playlist-wrap">
        <div class="filter shadow">
            <div class="title" @click="openFilter">
                {{ currentCat }}
                <i class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"></i>
                <!-- vue自带 -->
                <transition name="fade">
                    <div class="filter-box shadow" v-if="showFilter">
                        <div class="box-item" v-for="item in cateList" :key="item.type">
                            <h2>
                                <i class="iconfont" :class="item.icon"></i> {{ item.type }}
                            </h2>
                            <ul>
                                <li
                                    v-for="sub in item.list"
                                    :key="sub.name"
                                    :class="currentCat === sub.name ? 'li-active' : ''"
                                    @click="typeItemPressed(sub.name)"
                                >
                                    {{ sub.name }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
            <div class="hot-tag">
                <p>热门标签：</p>
                <ul class="tags">
                    <li
                        v-for="item in hotCategories"
                        :key="item.id"
                        :class="currentCat == item.name ? 'li-active' : ''"
                        @click="typeItemPressed(item.name)"
                    >
                        {{ item.name }}
                    </li>
                </ul>
            </div>
            <div class="type">
                <div
                    class="type-item"
                    :class="sortType === 'hot' ? 'item-active': ''"
                    @click="chooseType('hot')"
                >
                    热门
                </div>
                <div
                    class="type-item"
                    :class="sortType === 'new' ? 'item-active': ''"
                    @click="chooseType('new')"
                >
                    最新
                </div>
            </div>
        </div>
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
           hotCategories: [],
           sortType: 'hot',
           currentCat: '全部',
           limit: 40,
           offset: 0,
           pageTotal: 0,
           fullscreenLoading: false,
           showFilter: false,
           cateList: [],
           typeList: [
                {
                key: 0,
                value: '语种',
                icon: 'niceyuyan'
                },
                {
                key: 1,
                value: '风格',
                icon: 'nicefengge'
                },
                {
                key: 2,
                value: '场景',
                icon: 'nicekafeidengdai'
                },
                {
                key: 3,
                value: '情感',
                icon: 'niceqingganqingshu'
                },
                {
                key: 4,
                value: '主题',
                icon: 'nicepifugexinghuazhuti-xianxing'
                }
            ]
        }
    },
    methods: {
        itemPressed () {
        },
        typeItemPressed (name) {
            this.currentCat = name
            this.getPlayList()
        },
        chooseType (name) {
            this.sortType = name
            this.getPlayList()
        },
        openFilter () {
            this.showFilter = !this.showFilter
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
                this.fullscreenLoading = false
                this.$message.error('error')
            }
        },
        async getHotList () {
            try {
                let res = await this.$api.getHotlist()
                if (res.code === 200) {
                    this.hotCategories = res.tags
                }
            } catch (error) {
                this.$message.error('error')
            }
        },
        async getCatList () {
            try {
                let res = await this.$api.getCatList()
                if (res.code === 200) {
                    this.cateList = this.categoryGroup(res.sub, 'category')
                }
            } catch (error) {
                this.$message.error('error')
            }
        },
        categoryGroup (list, field) {
            let obj = {}
            for (let i = 0; i < list.length; i++) {
                for (let item in list[i]) {
                    if (item === field) {
                        let carray = obj[list[i][item]]
                        if (!carray) {
                            carray = []
                        }
                        carray.push(list[i])
                        obj[list[i][item]] = carray
                        break
                    }
                }
            }

            let att = []

            let type = ''
            let category = ''
            let icon = ''

            this.typeList.map(item => {
                type = item.value
                category = item.key
                icon = item.icon
                att.push({
                    type,
                    category,
                    icon,
                    list: obj[item.key]
                })
            })
            return att
        }
    },
    mounted () {
        this.getHotList()
        this.getPlayList()
        this.getCatList()
    }
}
</script>

<style>
.fade-enter {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-enter-active {
  transition: all 0.5s;
}

.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 30px, 0);
}

.fade-leave-active {
  transition: all 0.5s;
}

.playlist-wrap {
    max-width: 1380px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

.playlist-wrap .filter {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-radius: 5px;
}

.playlist-wrap .filter .title {
    width: auto;
    height: 100%;
    padding: 0 5px 0 15px;
    background-color: #fa2800;
    border-radius: 5px 0px 5px 5px;
    margin-right: 15px;
    color: #ffffff;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.playlist-wrap .filter .title i {
    transform: rotate(90deg);
    margin-left: 10px;
    font-size: 18px;
}

.playlist-wrap .filter .hot-tag {
    flex: 1;
    height: 100%;
    border-radius: 5px 0px 5px 5px;
    margin-right: 15px;
    color: #161e27;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.playlist-wrap .filter .hot-tag .tags {
    height: 100%;
    margin-right: 15px;
    color: #161e27;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;
}

.playlist-wrap .filter .hot-tag .tags li {
    list-style: none;
    padding-left: 10px;
    cursor: pointer;
    color: #161e27;
}

.playlist-wrap .filter .hot-tag .tags li:hover {
    color: #888;
}

.playlist-wrap .filter .hot-tag .tags .li-active {
    color: #fa2800;
}

.playlist-wrap .filter .hot-tag .tags .li-active:hover {
    color: #fa2800;
}

.playlist-wrap .filter .type {
    height: 100%;
    color: #161e27;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.playlist-wrap .filter .type .type-item{
    color: #161e27;
    font-size: 14px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
    margin-right: 10px;
    border-radius: 4px;
    background-color: #f7f7f7;
    cursor: pointer;
}

.playlist-wrap .filter .type .type-item:hover{
    background-color: #f7f7f7;
}

.playlist-wrap .filter .type .item-active{
    background-color: #fa2800;
    color: white;
}

.playlist-wrap .filter .type .item-active:hover{
    background-color: #fa2800;
    color: white;
}

.playlist-wrap .filter .title .filter-box {
    width: 720px;
    height: 400px;
    overflow-y: scroll;
    background-color: white;
    border-radius: 5px;
    z-index: 100;
    position: absolute;
    color: black;
    top: 50px;
    left: 0;
    padding: 15px 10px 0 16px;
}

.filter-box::-webkit-scrollbar {
    width: 0 !important
}

.playlist-wrap .filter .title .filter-box .box-item{
    margin-bottom: 20px;
}

.playlist-wrap .filter .title .filter-box .box-item h2{
    font-size: 15px;
    margin-bottom: 15px;
    color: #161e27;
}

.playlist-wrap .filter .title .filter-box .box-item ul{
    display: flex;
    flex-wrap: wrap;
    padding: 0;
}

.playlist-wrap .filter .title .filter-box .box-item ul li{
    padding: 8px 18px;
    list-style: none;
    border-radius: 16px;
    cursor: pointer;
    font-size: 12px;
    color: #161e27;
    background-color: #f7f7f7;
    margin: 5px;
}

.playlist-wrap .filter .title .filter-box .box-item ul li:hover{
    color: white;
    background-color: #fa2800;
}

.playlist-wrap .filter .title .filter-box .box-item ul .li-active{
    color: white;
    background-color: #fa2800;
}

</style>
