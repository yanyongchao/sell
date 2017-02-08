<template>
    <div class="ratings" id="ratings-hook">
        <div class="ratings-content">
            <div class="overview">
                <div class="overview-left">
                    <h2 class="score">{{seller.score}}</h2>
                    <div class="title">综合评分</div>
                    <div class="rank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="title">服务态度</span>
                        <div class="star"><Star :size="36" :score="seller.serviceScore"></Star></div>
                        <span class="score">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="title">商品评分</span>
                        <div class="star"><Star :size="36" :score="seller.foodScore"></Star></div>
                        <span class="score">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="title">送达时间</span>
                        <span class="delivery">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <Split></Split>
            <RatingSelect :select-type="selectType" :only-content="onlyContent" :ratings="ratings"></RatingSelect>
            <div class="rating-wrapper">
                <ul>
                    <li v-for="rating in ratings" class="rating-item">
                        <div class="avatar">
                            <img :src="rating.avatar"/>
                        </div>
                        <div class="content">
                            <h2 class="name">{{rating.username}}</h2>
                            <div class="star-wrapper">
                                <div class="star"><star :size="24" :score="rating.score"></star></div>
                                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                            </div>
                            <p class="text">{{rating.text}}</p>
                            <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                                <span
                                        :class="{'icon-thumb_up': rating.rateType===1, 'icon-thumb_down': rating.rateType===0}"></span>
                                <span class="food-name" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="time">
                                {{rating.rateTime | formatTime}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Star from '../star/star.vue'
    import Split from '../split/split.vue'
    import RatingSelect from '../ratingselect/ratingselect.vue'
    import formatTime from '../../common/js/common.js'
    import BScroll from 'better-scroll'
    const ALL = 2;

    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data: function () {
            return {
                selectType: ALL,
                onlyContent: false,
                ratings: []
            }
        },
        components: {
            Star: Star,
            Split: Split,
            RatingSelect: RatingSelect
        },
        created: function() {
            this.$http({
                url: '../../data.json',
                method: 'get',
            }).then(function (res) {
                var data = res.data;
                this.ratings = data.ratings;
                let ratings = document.getElementById('ratings-hook');
                this.$nextTick(() => {
                    this.scroll = new BScroll(ratings, {
                        click: true
                    });
                });
            })
        },
        filters: {
            formatTime: formatTime
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .ratings {
        position: absolute;
        top: 3.54rem;
        bottom: 0;
        left: 0;
        width: 100%;
        overflow: hidden;
        .overview {
            display: flex;
            padding: .36rem 0;
            .overview-left {
                flex: 0 0 2.6rem;
                width: 2.6rem;
                border-right: .01rem solid rgba(7, 17, 27, .1);
                text-align: center;
                .score {
                    font-size: .48rem;
                    color: rgb(255, 153, 0);
                    line-height: .56rem;
                    margin-bottom: .12rem;
                }
                .title {
                    font-size: .24rem;
                    color: rgb(7, 17, 27);
                    line-height: .24rem;
                    margin-bottom: .16rem;
                }
                .rank {
                    font-size: .20rem;
                    color: rgb(7, 17, 27);
                    line-height: .20rem;
                    margin-bottom: .12rem;
                }
            }
            .overview-right {
                flex: 1;
                padding-left: .48rem;
                @media all and (max-width: 320px){
                    padding-left: .24rem;
                }
                .score-wrapper {
                    font-size: 0;
                    margin-bottom: .16rem;
                    .title {
                        font-size: .24rem;
                        display: inline-block;
                        color: rgb(7, 17, 27);
                        line-height: .36rem;
                        margin-right: .24rem;
                        vertical-align: top;
                    }
                    .star {
                        display: inline-block;
                        margin-right: .24rem;
                    }
                    .score {
                        font-size: .24rem;
                        color: rgb(255, 153, 0);
                        line-height: .36rem;
                    }
                }
                .delivery-wrapper {
                    font-size: 0;
                    .title {
                        font-size: .24rem;
                        color: rgb(7, 17, 27);
                        line-height: .36rem;
                        margin-right: .24rem;
                    }
                    .delivery {
                        font-size: .24rem;
                        color: rgb(147, 153, 159);
                        line-height: .36rem;
                        vertical-align: top;
                    }
                }
            }
        }
        .rating-wrapper {
            padding: 0 .36rem;
            .rating-item {
                display: flex;
                padding: .36rem 0;
                position: relative;
                .avatar {
                    flex: 0 0 .56rem;
                    width: .56rem;
                    overflow: hidden;
                    margin-right: .24rem;
                    img {
                        width: .56rem;
                        height: .56rem;
                        border-radius: 50%;
                    }
                }
                .content {
                    flex: 1;
                    .name {
                        font-size: .20rem;
                        color: rgb(7, 17, 27);
                        line-height: .24rem;
                        margin-bottom: .08rem;
                    }
                    .star-wrapper {
                        margin-bottom: .12rem;
                        .star {
                            display: inline-block;
                        }
                        .delivery {
                            display: inline-block;
                            font-size: .20rem;
                            font-weight: 200;
                            color: rgb(147, 153, 159);
                            line-height: .24rem;
                            margin-left: .12rem;
                        }
                    }
                    .text {
                        font-size: .24rem;
                        color: rgb(7, 17, 27);
                        line-height: .36rem;
                        margin-bottom: .16rem;
                    }
                    .recommend {
                        font-size: 0;
                        .icon-thumb_up, .icon-thumb_down {
                            color: rgb(0, 160, 220);
                            line-height: .32rem;
                            font-size: .24rem;
                            margin-right: .16rem;
                        }
                        .food-name {
                            border: 1px solid rgba(7, 17, 27, .1);
                            border-radius: .02rem;
                            background: rgb(255, 255, 255);
                            font-size: .18rem;
                            color: rgb(147, 153, 159);
                            line-height: .32rem;
                            padding: 0 .12rem;
                            margin-right: .16rem;
                        }
                    }
                    .time {
                        position: absolute;
                        right: 0;
                        top: .36rem;
                        font-size: .20rem;
                        font-weight: 200;
                        color: rgb(147, 153, 159);
                        line-height: .24rem;
                    }
                }
            }
        }
    }
</style>
