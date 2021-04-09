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
.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
</style>
