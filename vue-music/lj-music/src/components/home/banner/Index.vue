<template>
    <div class="banner">
        <swiper :options="swiperOption"
        v-show="bannersInit"
        @slideChangeTransitionEnd="onSwiperSlideChangeTransitionEnd">
            <swiper-slide v-for="item in banners" :key="item.imageUrl">
                <img :src="item.imageUrl" :alt="item.typeTitle">
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
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
                centeredSlides: true,
                paginationClickable: true,
                grabCursor: true,
                pagination: '.swiper-pagination',
                slideChangeTransitionEnd: swiper => {
                        // 这个位置放swiper的回调方法
                        console.log('123')
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
                console.log(data)
                if (data.code === 200) {
                    console.log(data)
                }
            } catch (error) {
                console.log(error)
            }
        },
        slideChangeTransitionEnd (a) {
            console.log(a)
        }
    },
    mounted () {
        this.getBanner()
    }
}
</script>

<style>
.banner >>> .swiper-pagination {
  width: 100%;
  bottom: -20px;
}
.swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background: #a3a3ac;
    opacity: 0.8;
    border-radius: 50%;
    margin: 0 5px;
}

.swiper-pagination-bullet-active {
      opacity: 1;
      width: 15px;
      border-radius: 4px;
      background: #fa2800;
}

.banner {
  position: relative;
}

.banner img {
    border-radius: 3px;
}
</style>
