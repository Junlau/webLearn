<template>
    <div class="mv-wrap">
        <div class="mv-filter">
            <ul class="mv-type">
                <li v-for="item in areaList"
                    :key="item.value"
                    :class="area === item.value ? 'li-active':''"
                    @click="chooseType('area',item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
            <ul class="mv-classify">
                <li v-for="item in classifys"
                    :key="item.value"
                    :class="classify === item.value ? 'li-active':''"
                    @click="chooseType('classify',item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
            <ul class="mv-sort">
                <li v-for="item in sortList"
                    :key="item.value"
                    :class="sort === item.value ? 'li-active':''"
                    @click="chooseType('sort',item.value)"
                >
                    {{ item.label }}
                </li>
            </ul>
        </div>
        <load-more @scroll-state="load">
             <ul class="mv-list">
                <mv-item v-for="item of mvs" :key="item.id" :item="item" />
            </ul>
        </load-more>
        <div class="load-bottom" v-show="loading">
            <nice-loading />
        </div>
    </div>
</template>

<script>
import utils from '@/utils/utils'
import loadMore from '@/components/common/loadMore/Index'
import mvItem from '@/components/common/mvItem/Index'

export default {
    data () {
        return {
            // 语种
            area: '全部',
            areaList: [
                {
                value: '全部',
                label: '全部'
                },
                {
                value: '内地',
                label: '内地'
                },
                {
                value: '港台',
                label: '港台'
                },
                {
                value: '欧美',
                label: '欧美'
                },
                {
                value: '日本',
                label: '日本'
                },
                {
                value: '韩国',
                label: '韩国'
                }
            ],
            // 分类
            classify: '全部',
            classifys: [
                {
                value: '全部',
                label: '全部'
                },
                {
                value: '官方版',
                label: '官方版'
                },
                {
                value: '原生',
                label: '原生'
                },
                {
                value: '现场版',
                label: '现场版'
                },
                {
                value: '网易出品',
                label: '网易出品'
                }
            ],
            // 排序
            sort: '上升最快',
            sortList: [
                {
                value: '上升最快',
                label: '上升'
                },
                {
                value: '最热',
                label: '最热'
                },
                {
                value: '最新',
                label: '最新'
                }
            ],
            // 请求参数
            params: {
                // 返回数量
                limit: 12,
                // 偏移数量
                offset: 0,
                // 分类
                type: '全部',
                // 语种
                area: '全部',
                order: '上升最快'
            },
            mvs: [],
            // 是否显示加载动画
            loading: false,
            // 是否还有数据
            loadStatus: true
        }
    },
    components: {
        loadMore,
        mvItem
    },
    methods: {
        chooseType (type, value) {
            if (type === 'area') {
                this.area = value
                this.params.area = value
            } else if (type === 'classify') {
                this.classify = value
                this.params.type = value
            } else if (type === 'sort') {
                this.sort = value
                this.params.order = value
            }
            this.params.offset = 12
            this.loadStatus = true
            this.mvs = []
            this.getMvData()
        },
        async getMvData () {
            try {
                this.loadMore = false
                let res = await this.$api.getMvAll(this.params)
                if (res.code === 200) {
                    console.log(res)
                    this.mvs = this.mvs.concat(this._normalizeVideos(res.data))
                    if (res.hasMore) {
                        this.loading = true
                        this.loadStatus = true
                        this.params.offset += 12
                    } else {
                        this.loading = false
                    }
                }
            } catch (error) {
                this.$message.error(error)
            }
        },
        _normalizeVideos (list) {
            let ret = []
            list.map(item => {
                if (item.id) {
                    ret.push(
                        {
                            id: item.id,
                            nickName: item.artistName,
                            name: item.name,
                            playCount: item.playCount,
                            duration: utils.formatTime(item.duration),
                            image: item.cover
                        }
                    )
                }
            })
            return ret
        },
        // 加载更多
        load () {
            if (this.loadStatus) {
                setTimeout(() => {
                this.getMvData()
                }, 1000)
            }
        }
    },
    mounted () {
        this.getMvData()
    }
}
</script>

<style>
.mv-wrap {
    max-width: 1380px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}

.mv-wrap .mv-filter ul {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.mv-wrap .mv-filter li {
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

.mv-wrap .mv-filter .li-active {
    background-color: #fa2800;
    color:white;
}

.mv-wrap .mv-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding: 0;
}

</style>
