<template>
    <div class="header">
        <div class="container">
            <div class="logo">
                <a href="index.html"></a>
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <router-link :to="{name:'home'}" tag="a">发现音乐</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'rank'}" tag="a">排行榜</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'playlist'}" tag="a">歌单</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:''}" tag="a">歌手</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:''}" tag="a">视频</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:''}" tag="a">MV</router-link>
                    </li>
                </ul>
            </div>
            <div class="search" v-on:click="searchButtonPressed">
                <i class="iconfont nicesearch-o"></i>
            </div>
            <div class="login">
                <div class="line"></div>
                <div class="no-login">登录</div>
            </div>
            <div class="search-wrap" v-if="searchshow" >
                <div class="overlay" v-on:click="closeSearchWrapper"></div>
                <div class="search-body">
                    <div class="search-content">
                        <div class="search-top">
                            <div class="bg-effect"></div>
                            <div class="search-form">
                                <input
                                v-model="keyword"
                                v-on:keyup.enter="search"
                                type="text"
                                class="text"
                                placeholder="请输入搜索关键词并按回车键…"
                            />
                            </div>
                        </div>
                        <div class="search-hot">
                            <div class="title">
                                <i class="iconfont niceremensousuo"></i>
                                <span>热门搜索</span>
                            </div>
                            <ul class="tags">
                                <li v-for="item in hots" :key="item.first">
                                    {{item.first}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="btn-close" v-on:click="closeSearchWrapper">
                        <span class="close-light"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            keyword: '',
            hots: [],
            searchshow: false
        }
    },
    methods: {
        searchButtonPressed () {
            this.searchshow = true
            this.getSearchHot()
        },
        closeSearchWrapper () {
            this.searchshow = false
        },
        async getSearchHot () {
            try {
                let res = await this.$api.getSearchHot()
                if (res.code === 200) {
                    this.hots = res.result.hots
                }
            } catch (error) {
                console.log(error)
            }
        },
        search () {
            if (this.keyword.split(' ').join('').length !== 0) {
                this.closeSearchWrapper()
                console.log(this.keyword)
            }
        }
    }
}
</script>

<style>
.header {
    width: 100%;
    height: 70px;
    background-color: white;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /*阴影*/
    box-shadow: 0px 5px 40px -1px rgba(2, 10, 18, 0.1);
    z-index: 2000;
}

.container {
  max-width: 1380px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
}

.logo {
    width: 146px;
    align-items: center;
    margin-right: 30px;
}

.logo a {
    width: 100%;
    display: block;
    height: 70px;
    background-image: url(../../../assets/images/logo_black.png);
    background-repeat: no-repeat;
    background-size: 146px 26px;
    background-position: 0px center;
}

.nav {
    flex: 1 1 auto;
}

.nav li {
    list-style: none;
    display: inline-block;
    font-size: 14px;
    height: 100%;
    padding: 0 15px;
}

.nav li a {
    position: relative;
    text-decoration: none;
    color: #161e27;
}

.nav li .router-link-active {
    color: #fa2800;
}

.nav li .router-link-active::after {
    content: "";
    position: absolute;
    background-color: #fa2800;
    left: 0;
    right: 0;
    bottom: -12px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin: 0 auto;
    opacity: 1;
}

.search {
    display: flex;
    height: 100%;
}

.search i {
    font-size: 22px;
    color: #161e27;
    padding: 0 15px;
    cursor: pointer;
}

.login {
    display: flex;
    /* align-items: center; */
    cursor: pointer;
    position: relative;
    padding-left: 20px;
}

.login .line {
    width: 1px;
    height: 22px;
    background: #e1e1e1;
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -11px;
}

.login .no-login {
    font-size: 14px;
}

.login .no-login:hover {
    color: #fa2800;
}

.search-wrap {
    /* fixed 脱离了 flex */
    position: fixed;
    display: flex;
    justify-content: center;
    align-items:center;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
}

.search-wrap .overlay {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    position: absolute;
    background: rgba(120, 129, 147, .22);
    opacity: 1;
    transition: opacity .3s;
}

.search-wrap .search-body {
    position: relative;
    opacity: 1;
    width: 100%;
    max-width: 790px;
    justify-content: center;
}

.search-wrap .search-body .search-content {
    background-color: #fff;
    position: relative;
    border-radius: 4px;
    box-shadow: 0 10px 50px -5px rgba(6, 39, 67, 0.12);
    padding: 0;
    border: 0;
    width: 100%;
    overflow: hidden;
}

.search-wrap .search-body .search-content .search-top {
    position: relative;
    overflow: hidden;
    padding: 3rem;
}

.search-wrap .search-body .search-content .bg-effect {
    background-image: url(../../../assets/images/personal.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    filter: blur(8px);
    transform: scale(1.05);
    background-position: center;
}

.search-wrap .search-body .search-content .search-top .search-form {
    position: relative;
    padding: 3rem 0;
}

.search-wrap .search-body .search-content .search-top .search-form .text{
    width: 100%;
    height: calc(1.5em + 1.71875rem + 2px);
    text-align: center;
    background-color: rgba(255, 255, 255, 0.03);
    border-radius: 5px;
    border-color: transparent;
    color: #fff;
}

.search-wrap .search-body .search-content .search-top .search-form .text:focus {
    background-color: rgba(255, 255, 255, 0.04);
    outline: 1px solid transparent;
}

.search-wrap .search-body .search-content .search-top .search-form .text:hover {
    background-color: rgba(255, 255, 255, 0.04);
    border-color: transparent;
}

.search-wrap .search-body .search-content .search-top .search-form .text::placeholder {
    color: #fff;
    opacity: 1
}

.search-hot {
    padding: 1.5rem 3rem;
}

.search-hot .title {
    margin-bottom: 15px;
}

.search-hot .title i{
    color: #fa2800;
    font-size: 1.625rem;
    margin-right: 8px;
}
.search-hot .title span{
    font-size: 15px;
}

.search-hot .tags{
    width: 100%;
    margin: 0 -0.25rem;
    padding: 0;
}

.search-hot .tags li {
    list-style: none;
    display: inline-block;
    padding: 0.25rem;
    margin: 0.25rem;
    cursor: pointer;
    background-color: #f4f4f5;
    text-align: center;
    vertical-align: middle;
    font-weight: 400;
    color: #6D7685;
    border-radius: 4px;
    font-size: .75rem;
}

.search-hot .tags li:hover {
    color: #161E27;
}

.btn-close {
    position: absolute;
    bottom: -50px;
    cursor: pointer;
    width: 100%;
    text-align: center;
}

.btn-close .close-light {
    display: inline-block;
    background-image: url('../../../assets/images/close.svg');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    vertical-align: middle;
    width: 28px;
    height: 28px;
}

</style>
