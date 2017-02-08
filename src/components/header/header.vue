<template>
    <div class="header">
        <div class="content-wrapper clear">
            <div class="avator">
                <img src="./01avatar.png" alt=""/>
            </div>
            <div class="content">
                <div class="title clear">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support clear" v-if="seller.supports">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports">
                <span class="count">{{seller.supports.length}}个</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <transition name="fade">
            <div class="detail" v-show="detailShow">
                <div class="detail-wrapper clear">
                    <div class="detail-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="star">
                            <Star :size="48" :score="seller.score"></Star>
                        </div>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">优惠信息</div>
                            <div class="line"></div>
                        </div>
                        <ul v-if="seller.supports" class="supports">
                            <li v-for="(item, index) in seller.supports">
                                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                                <span class="text">{{seller.supports[index].description}}</span>
                            </li>
                        </ul>
                        <div class="title">
                            <div class="line"></div>
                            <div class="text">商家公告</div>
                            <div class="line"></div>
                        </div>
                        <p>
                            粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深的消费者青睐，发展至今成为粥类引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。
                        </p>
                    </div>
                </div>
                <div class="detail-close" @click="hideDetail">
                    <i class="icon-close"></i>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import Star from '../star/star.vue'
    export default {
        props: {
            seller: Object,
        },
        data: function() {
            return {
                detailShow: false
            }
        },
        created: function() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        },
        methods: {
            showDetail: function() {
                this.detailShow = true;
            },
            hideDetail: function() {
                this.detailShow = false;
            }
        },
        components: {
            Star: Star
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .bg-image(@url) {
        background-image: url("@{url}@2x.png");
        @media all and (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
            background-image: url("@{url}@3x.png");
        }
    }
    .header {
        background: url("./bg.png");
        background-size: cover;
        color: #fff;
        .content-wrapper {
            padding: .48rem .24rem .36rem .48rem;
            position: relative;
            .avator {
                float: left;
                img {
                    width: 1.28rem;
                    height: 1.28rem;
                    border-radius: .02rem;
                }
            }
            .content {
                float: left;
                margin: .04rem 0 .04rem .32rem;
                position: relative;
                .brand {
                    width: .6rem;
                    height: .36rem;
                    display: inline-block;
                    .bg-image("./brand");
                    background-size: .6rem .36rem;
                    background-repeat: no-repeat;
                    float: left;
                    margin-right: .12rem;
                }
                .name {
                    font-size: .32rem;
                    line-height: .36rem;
                    float: left;
                    text-shadow: 0 0 1px #8b8580;
                    font-weight: bold;
                }
                .description {
                    line-height: .57rem;
                    font-size: .24rem;
                    text-shadow: 0 0 1px #7f7972;
                    margin-bottom: .03rem;
                }
                .support {
                    .icon {
                        width: .24rem;
                        height: .24rem;
                        float: left;
                        &.decrease {
                            .bg-image("./decrease_1");
                        }
                        &.discount {
                            .bg-image("./discount_1");
                        }

                        &.guarantee {
                            .bg-image("./guarantee_1");
                        }
                        &.invoice {
                            .bg-image("./invoice_1");
                        }
                        &.special {
                            .bg-image("./special_1");
                        }

                        background-size: .24rem .24rem;
                        margin-right: .08rem;
                    }
                    .text {
                        float: left;
                        line-height: .24rem;
                        font-size: .2rem;
                        text-shadow: 0 0 1px #7a7776;
                    }
                }
            }
            .support-count {
                position: absolute;
                right: .24rem;
                bottom: .30rem;
                background: #393839;
                padding: 0 .16rem;
                text-align: center;
                border-radius: .28rem;
                font-size: 0;
                padding: 0 .16rem;
                .count {
                    line-height: .48rem;
                    font-size: .20rem;
                }
                i.icon-keyboard_arrow_right {
                    font-size: .20rem;
                    line-height: .48rem;
                    display: inline-block;
                    vertical-align: top;
                    margin: .02rem 0 0 .04rem;
                }
            }
        }
        .bulletin-wrapper {
            height: .56rem;
            background: #403833;
            line-height: .56rem;
            padding: 0 .44rem 0 .24rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: relative;
            .bulletin-title {
                display: inline-block;
                width: .44rem;
                height: .24rem;
                .bg-image('./bulletin');
                background-size: .44rem .24rem;
                margin-top: .16rem;
            }
            .bulletin-text {
                font-size: .20rem;
                margin: 0 .08rem;
                vertical-align: top;
            }
            i.icon-keyboard_arrow_right {
                position: absolute;
                right: .24rem;
                top: .18rem;
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: 1s ease 0s;
        }
        .fade-enter-active {
            opacity: 1;
            background: rgba(7, 17, 27, 0.8);
        }
        .fade-leave-active {
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
        .fade-enter {
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
        .detail {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(7, 17, 27, .8);
            overflow: auto;
            z-index: 9999;
            .detail-wrapper {
                min-height: 100%;
                .detail-main {
                    margin-top: 1.28rem;
                    padding-bottom: 1.28rem;
                    .name {
                        font-size: .32rem;
                        line-height: .32rem;
                        font-weight: 700;
                        text-align: center;
                        margin-bottom: .32rem;
                    }
                    .star {
                        text-align: center;
                        padding: 2px 0;
                    }
                    .title {
                        display: flex;
                        width: 80%;
                        margin: .56rem auto .48rem auto;
                        .line {
                            flex: 1;
                            position: relative;
                            top: -.20rem;
                            border-bottom: .02rem solid rgba(255, 255, 255, .2);
                        }
                        .text {
                            padding: 0 .24rem;
                            font-size: .32rem;
                            font-weight: 700;
                        }
                    }
                    .supports {
                        margin: 0 10%;
                        padding: 0 .24rem;
                        font-size: 0;
                        li {
                            margin-bottom: .24rem;
                            &:nth-last-of-type {
                                 margin-bottom: 0rem;
                             }
                            .icon {
                                display: inline-block;
                                width: .32rem;
                                height: .32rem;
                                margin-right: .12rem;
                                &.decrease {
                                 .bg-image("./decrease_2");
                                 }
                                &.discount {
                                 .bg-image("./discount_2");
                                 }

                                &.guarantee {
                                 .bg-image("./guarantee_2");
                                 }
                                &.invoice {
                                 .bg-image("./invoice_2");
                                 }
                                &.special {
                                 .bg-image("./special_2");
                                 }

                                background-size: .32rem .32rem;
                            }
                            .text {
                                font-size: .24rem;
                                font-weight: 200;
                                vertical-align: top;
                            }
                        }

                    }
                    p {
                        margin: 0 10%;
                        padding: 0 .24rem;
                        font-size: .24rem;
                        line-height: .48rem;
                        font-weight: 200;
                        color: rgb(255, 255, 255);
                    }
                }
            }
            .detail-close {
                position: relative;
                width: .64rem;
                height: .64rem;
                margin: -1.28rem auto 0 auto;
                font-size: .64rem;
                clear: both;
                font-size: .64rem;
            }
        }
    }
</style>
