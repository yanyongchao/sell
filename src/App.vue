<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <div class="tab border-bottom-1px border-top-1px">
            <div class="tab-item">
                <router-link to="/goods">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings">评论</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller">商家</router-link>
            </div>
        </div>
        <router-view :seller="seller"></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import Header from './components/header/header.vue';
    export default {
        data: function() {
            return {
                seller: {},
            }
        },
        components: {
            'v-header': Header
        },
        created: function() {
            this.$http({
                url: '../data.json',
                method: 'get'
            }).then((res) => {
                this.seller = res.data.seller;
            })
        }
    }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    @import "./common/less/mixin";
    #app .tab {
        display: flex;
        width: 100%;
        .border-bottom-1px(rgba(7, 17, 27, .1));
        .border-top-1px(rgba(7, 17, 27, .1));
        .tab-item {
            flex: 1;
            text-align: center;
            line-height: .8rem;
            & > a {
                display: block;
                font-size: .28rem;
            }
            & > .router-link-active {
                color: rgb(240,20,20);
            }
        }
    }
</style>
