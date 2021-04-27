<template>
    <div class="singer-wrap">
        <div class="singer-filter">
            <ul class="singer-type">
                <li v-for="item in langs"
                    :key="item.value"
                    :class="lang === item.value ? 'li-active':''"
                    @click="typeButtonPressed(item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
            <ul class="singer-sex">
                <li v-for="item in classifys"
                    :key="item.value"
                    :class="classify === item.value ? 'li-active':''"
                    @click="sexButtonPressed(item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
            <ul class="singer-name">
                <li v-for="item in ens"
                    :key="item.value"
                    :class="en === item.value ? 'li-active':''"
                    @click="nameButtonPressed(item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
        </div>
        <load-more @scroll-state="load">
             <ul class="singer-list">
                <singer-item v-for="item of singers" :key="item.id" :item="item" />
            </ul>
        </load-more>
    </div>
</template>

<script>
import loadMore from '@/components/common/loadMore/Index'
import singerItem from '@/components/common/singerItem/Index'
export default {
    data () {
        return {
            lang: -1,
            langs: [
                {
                value: -1,
                label: '全部'
                },
                {
                value: 7,
                label: '华语'
                },
                {
                value: 96,
                label: '欧美'
                },
                {
                value: 8,
                label: '日本'
                },
                {
                value: 16,
                label: '韩国'
                },
                {
                value: 0,
                label: '其他'
                }
            ],
            // 分类
            classify: -1,
            classifys: [
                {
                value: -1,
                label: '全部'
                },
                {
                value: 1,
                label: '男歌手'
                },
                {
                value: 2,
                label: '女歌手'
                },
                {
                value: 3,
                label: '乐队'
                }
            ],
            // 字母A_Z
            en: -1,
            ens: [],
            // 请求参数
            params: {
                // 返回数量
                limit: 40,
                // 偏移数量
                offset: 0,
                // 分类
                type: -1,
                // 语种
                area: -1,
                // 字母A_Z
                initial: -1
            },
            // 歌手列表
            singers: [],
            // 是否显示加载动画
            loading: false,
            // 是否还有数据
            loadStatus: true
        }
    },
    components: {
        loadMore,
        singerItem
    },
    methods: {
        // 获取字母表
        getEn () {
            let ens = []
            for (let i = 0; i < 26; i++) {
                ens.push({
                    value: String.fromCharCode(97 + i),
                    label: String.fromCharCode(65 + i)
                })
            }
            ens.unshift({
                    value: -1,
                    label: '热门'
                })
            ens.push({
                value: 0,
                label: '其他'
            })
            this.ens = ens
        },
        typeButtonPressed (value) {
            this.lang = value
            this.params.area = value
        },
        sexButtonPressed (value) {
            this.classify = value
            this.params.type = value
        },
        nameButtonPressed (value) {
            this.en = value
            this.params.initial = value
        },
        async getSingerList () {
            try {
                this.loadStatus = false
                let res = await this.$api.getSingerList(this.params)
                if (res.code === 200) {
                    this.singers = this.singers.concat(res.artists)
                    if (res.more) {
                        this.loading = true
                        this.loadStatus = true
                        this.params.offset += 30
                    } else {
                        this.loading = false
                    }
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        load () {
            if (this.loadStatus) {
            setTimeout(() => {
                this.getSingerList()
            }, 1000)
      }
        }
    },
    mounted () {
        this.getEn()
        this.getSingerList()
    }
}
</script>

<style>
.singer-wrap {
    max-width: 1380px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.singer-wrap .singer-filter ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.singer-wrap .singer-filter li {
    list-style: none;
    height: 28px;
    padding-left: 9px;
    padding-right: 9px;
    border-radius: 14px;
    margin-right: 15px;
    box-sizing: border-box;
    line-height: 28px;
    font-size: 14px;
    color: #777777;
    cursor: pointer;
}

.singer-wrap .singer-filter .li-active {
    background-color: #fa2800;
    color:white;
}

.singer-wrap .singer-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0;
}

</style>
