<template>
    <div class="seller" id="seller1-hook">
        <div class="seller-content">
            <div class="overview">
                <h1 class="title">{{seller.name}}</h1>
                <div class="desc">
                    <div class="star"><Star :size="36" :score="seller.score"></Star></div>
                    <span class="text">({{seller.ratingCount}})</span>
                    <span class="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul class="remark">
                    <li class="block">
                        <h2 class="title">起送价</h2>
                        <div class="content">
                            <span class="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">商家配送</h2>
                        <div class="content">
                            <span class="stress">{{seller.delivery}}</span>元
                        </div>
                    </li>
                    <li class="block">
                        <h2 class="title">平均配送时间</h2>
                        <div class="content">
                            <span class="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div class="favorite">
                    <span class="icon-favorite" :class="{'active': favorite}"></span>
                    <span class="text">{{favoriteText}}</span>
                </div>
            </div>
            <Split></Split>
            <div class="bulletin">
                <h2 class="title">公告与活动</h2>
                <div class="content-wrapper">
                    <p class="content">{{seller.bulletin}}</p>
                </div>
                <ul v-if="seller.supports" class="supports">
                    <li class="support-item border-1px" v-for="(item, index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="text">{{seller.supports[index].description}}</span>
                    </li>
                </ul>
            </div>
            <Split></Split>
            <div class="info">
                <h1 class="title">商家信息</h1>
                <ul>
                    <li class="info-item" v-for="info in seller.infos">{{info}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Star from '../star/star.vue'
    import Split from '../split/split.vue'
    import BScroll from 'better-scroll'

    export default {
        props: {
            seller: {
                type: Object,
            },
        },
        data: function() {
            return {
                favorite: false
            }
        },
        computed: {
            favoriteText: function() {
                return this.favorite ? '已收藏' : '未收藏';
            }
        },
        created: function() {
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        },
        mounted: function() {
            this.BScroll = new BScroll(document.getElementById('seller1-hook'), {
                click: true
            });
        },
        components: {
            Star: Star,
            Split: Split
        },
        watch: {
            seller: function() {
                if(!this.BScroll) {
                    this.$nextTick(() => {
                        this.BScroll = new BScroll(document.getElementById('seller1-hook'), {
                            click: true
                        });
                    })
                }else {
                    this.$nextTick(() => {
                        this.BScroll.refresh();
                    })
                }
            }
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
    .seller {
        position: absolute;
        left: 0;
        top: 3.54rem;
        bottom: 0;
        width: 100%;
        overflow: hidden;
        .seller-content {
            .overview {
                padding: .36rem;
                .title {
                    font-size: .28rem;
                    color: rgb(7, 17, 27);
                    line-height: .28rem;
                    margin-bottom: .16rem;
                }
                .desc {
                    font-size: 0;
                    margin-bottom: .36rem;
                    .star {
                        display: inline-block;
                        margin-right: .16rem;
                    }
                    .text {
                        font-size: .20rem;
                        color: rgb(77, 85, 93);
                        line-height: .36rem;
                        margin-right: .24rem;
                    }
                }
            }
            .remark {
                padding: .36rem 0;
                border-top: 1px solid rgba(7, 17, 27, .1);
                display: flex;
                .block {
                    flex: 1;
                    text-align: center;
                    border-right: 1px solid rgba(7, 17, 27, .1);
                    &:last-child {
                        border: none;
                    }
                    .title {
                        font-size: .20rem;
                        color: rgb(147, 153, 159);
                        line-height: .20rem;
                        margin-bottom: .08rem;
                    }
                    .content {
                        font-size: .20rem;
                        font-weight: 200;
                        color: rgb(7, 17, 27);
                        line-height: .48rem;
                        .stress {
                            font-size: .48rem;
                        }
                    }
                }
            }
            .bulletin {
                padding: .36rem .36rem 0 .36rem;
                .title {
                    font-size: .28rem;
                    color: rgb(7, 17, 27);
                    line-height: .28rem;
                    margin-bottom: .16rem;
                }
                .content-wrapper {
                    padding: 0 .24rem .32rem .24rem;
                    font-size: .24rem;
                    font-weight: 200;
                    color: rgb(240, 20, 20);
                    line-height: .48rem;
                }
                .supports {
                    .support-item {
                        padding: .32rem .24rem;
                        height: .32rem;
                        font-size: 0;
                        border-top: 1px solid rgba(7, 17, 27, .1);
                        .icon {
                            display: inline-block;
                            width: .32rem;
                            height: .32rem;
                            vertical-align: top;
                            margin-right: .12rem;
                            background-size: .32rem .32rem;
                            &.decrease {
                             .bg-image("./decrease_4");
                             }
                            &.discount {
                             .bg-image("./discount_4");
                             }

                            &.guarantee {
                             .bg-image("./guarantee_4");
                             }
                            &.invoice {
                             .bg-image("./invoice_4");
                             }
                            &.special {
                             .bg-image("./special_4");
                             }
                        }
                        .text {
                            font-size: .24rem;
                            font-weight: 200;
                            color: rgb(7, 17, 27);
                            line-height: .32rem;
                            vertical-align: top;
                        }
                    }
                }
            }
            .info {
                padding: .36rem;
                .title {
                    font-size: .28rem;
                    color: rgb(7, 17, 27);
                    line-height: .28rem;
                    margin-bottom: .24rem;
                }
                .info-item {
                    padding: .32rem .24rem .32rem .24rem;
                    border-top: 1px solid rgba(7, 17, 27, .1);
                    font-size: .24rem;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: .32rem;
                }
            }
        }
    }
</style>
