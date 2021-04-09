<template>
    <div class="banner">
        <swiper class="swiper" :options="swiperOption" v-if="bannersInit">
            <swiper-slide v-for="item in banners" :key="item.imageUrl">
                <img :src="item.imageUrl" :alt="item.typeTitle">
            </swiper-slide>
        </swiper>
        <div class="swiper-pagination" slot="pagination"></div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            banners: [],
            // swiper的使用
            swiperOption: {
                slidesPerView: 3,
                spaceBetween: 30,
                slidesPerGroup: 3,
                loop: true,
                loopFillGroupWithBlank: true,
                paginationClickable: true,
                grabCursor: true,
                pagination: {
                        el: '.swiper-pagination'
                }
            }
        }
    },
    computed: {
        bannersInit () {
            if (this.banners.length > 0) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        async getBanner () {
            try {
                let data = await this.$api.getBanner()
                if (data.code === 200) {
                    console.log(data.banners)
                    this.banners = data.banners
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    mounted () {
        this.getBanner()
    }
}
</script>

<style>
.swiper-pagination {
  width: 100%;
  bottom: -20px;
}
.swiper-pagination .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #a3a3ac;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 5px;
}

.swiper-pagination .swiper-pagination-bullet-active {
      opacity: 1;
      width: 15px;
      border-radius: 4px;
      background: #fa2800;
}

.banner {
  position: relative;
  width: 100%;
}

.banner img {
    border-radius: 3px;
    width: 100%;
}
</style>
