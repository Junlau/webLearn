<template>
    <div class="home-wrap container">
        <banner></banner>
    </div>
</template>

<script>
import Banner from '@/components/home/banner/Index'
export default {
    data () {
        return {
            index: 1
        }
    },
    components: {
        Banner
    }
}
</script>

<style>

</style>
