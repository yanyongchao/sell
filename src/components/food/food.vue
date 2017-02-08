<template>
    <transition name="appearInLeft">
        <div v-show="show" class="food" id="food-hook">
            <div>
                <div class="food-content">
                    <div class="image-header">
                        <img :src="food.image" alt=""/>
                        <div class="back" @click="hide">
                            <i class="icon-arrow_lift"></i>
                        </div>
                    </div>
                    <div class="content">
                        <h2 class="title">{{food.name}}</h2>
                        <div class="detail">
                            <span class="sell-count">月售{{food.sellCount}}</span>
                            <span class="rating">好评率{{food.rating}}%</span>
                        </div>
                        <div class="price">
                            <span class="now-price">￥<i>{{food.price}}</i></span>
                            <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <div class="cart" v-if="food.count">
                                <CartControl :food="food"></CartControl>
                            </div>
                            <div @click="addFirst($event)" class="add-to-cart" v-else>
                                加入购物车
                            </div>
                        </div>
                    </div>
                </div>
                <Split></Split>
                <div class="info" v-show="food.info">
                    <h2 class="title">商品信息</h2>
                    <p class="text">{{food.info}}</p>
                </div>
                <Split v-show="food.info"></Split>
                <div class="rating">
                    <h2 class="title">商品评价</h2>
                    <RatingSelect @newSelectType="newSelectType" :select-type="selectType" :only-content="onlyContent" :desc="desc"
                                  :ratings="food.ratings"></RatingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-for="(rating, index) in food.ratings" class="rating-item">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" :src="rating.avatar" alt=""/>
                                </div>
                                <div class="time">{{rating.rateTime | dateFormat}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_down': rating.rateType===0, 'icon-thumb_up': rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" show="!food.ratings || !food.ratings.length">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import Vue from 'vue'
    import CartControl from '../cartcontrol/CartControl.vue'
    import Split from '../split/split.vue'
    import RatingSelect from '../ratingselect/ratingselect.vue'
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
        props: {
            food: {
                type: Object
            },
            showFlag: Object
        },
        data: function () {
            return {
                selectType: ALL,
                onlyContent: false,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        computed: {
            show: function() {
                this.selectType = ALL;
                this.onlyContent = false;
                setTimeout(this.scroll, 0);
                return this.showFlag.show;
            },
        },
        components: {
            CartControl: CartControl,
            Split: Split,
            RatingSelect: RatingSelect
        },
        methods: {
            hide: function() {
                this.showFlag.show = false;
            },
            addFirst: function(event) {
                if(!event._constructed) {
                    return;
                }
                Vue.set(this.food, 'count', 1);
            },
            scroll: function() {
                var food = document.getElementById('food-hook');
                this.$nextTick(() => {
                    if(!this.BScroll) {
                        this.BScroll = new BScroll(food, {
                            click: true
                        });
                    }else {
                        this.BScroll.refresh();
                    }
                })
            },
            newSelectType: function(val) {
                this.selectType = val;
            }
        },
        filters: {
            dateFormat: function(time) {
                let date = new Date(time);
                let format = 'yyyy-MM-dd hh:mm';
                var o = {
                    "M+" : date.getMonth()+1, //month
                    "d+" : date.getDate(),    //day
                    "h+" : date.getHours(),   //hour
                    "m+" : date.getMinutes(), //minute
                    "s+" : date.getSeconds(), //second
                    "q+" : Math.floor((date.getMonth()+3)/3),  //quarter
                    "S" : date.getMilliseconds() //millisecond
                }
                if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
                        (date.getFullYear()+"").substr(4- RegExp.$1.length));
                for(var k in o)if(new RegExp("("+ k +")").test(format))
                    format = format.replace(RegExp.$1,
                            RegExp.$1.length==1? o[k] :
                                    ("00"+ o[k]).substr((""+ o[k]).length));
                return format;
            }
        }
    }
</script>

<style lang="less">
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: .96rem;
        width: 100%;
        z-index: 30;
        overflow: hidden;
        background: #fff;
        &.appearInLeft-enter-active, &.appearInLeft-leave-active {
            transition: all .3s ease 0s;
        }
        &.appearInLeft-enter-active {
            transform: translate3d(0, 0, 0);
        }
        &.appearInLeft-leave-active {
            opacity: 0;
        }
        &.appearInLeft-enter {
            transform: translate3d(-100%, 0, 0);
        }
        .image-header {
            position: relative;
            top: 0;
            left: 0;
            width: 100%;
            padding-top: 100%;
            img {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
            }
        }
        .back {
            position: absolute;
            top: 10px;
            left: 0;
            .icon-arrow_lift {
                display: block;
                padding: .20rem;
                font-size: .40rem;
                color: #fff;
            }
        }
        .content {
            padding: .36rem;
            position: relative;
            .title {
                font-size: .28rem;
                font-weight: bold;
                color: rgb(7, 17, 27);
                line-height: .28rem;
                margin-bottom: .16rem;
            }
            .detail {
                font-size: 0;
                color: rgb(147, 153, 159);
                line-height: .20rem;
                margin-bottom: .36rem;
                .sell-count {
                    font-size: .20rem;
                    margin-right: .24rem;
                }
                .rating {
                    font-size: .20rem;
                }
            }
            .price {
                font-size: 0;
                color: rgb(240, 20, 20);
                line-height: .48rem;
                .now-price {
                    font-size: .20rem;
                    font-weight: normal;
                    margin-right: .24rem;
                    i {
                        font-size: .28rem;
                        font-weight: 700;
                        font-style: normal;
                    }
                }
                .old-price {
                    font-size: .20rem;
                    color: rgb(147, 153, 159);
                    line-height: .48rem;
                    text-decoration: line-through;
                }
            }
            .cartcontrol-wrapper {
                position: absolute;
                bottom: .36rem;
                right: .36rem;
                .add-to-cart {
                    width: 1.48rem;
                    height: .48rem;
                    border-radius: .24rem;
                    text-align: center;
                    line-height: .48rem;
                    background: rgb(0, 160, 220);
                    font-size: .20rem;
                    color: rgb(255, 255, 255);
                }
                .cart {
                    position: relative;
                    top: .10rem
                }
            }
        }
        .info {
            padding: .36rem;
            .title {
                font-size: .28rem;
                margin-bottom: .12rem;
            }
            .text {
                padding: 0 .16rem;
                font-size: .24rem;
                font-weight: 200;
                color: rgb(77, 85, 93);
                line-height: .48rem;
            }
        }
        .rating {
            padding-top: .36rem;
            .title {
                margin-left: .36rem;
                font-size: .28rem;
                line-height: .28rem;
                color: rgb(7, 17, 27);
            }
            .rating-wrapper {
                .rating-item {
                    position: relative;
                    padding: .32rem .36rem;
                    border-bottom: .01rem solid rgba(7, 17, 27, .1);
                    .user {
                        position: absolute;
                        right: .36rem;
                        top: .32rem;
                        font-size: 0;
                        .name {
                            font-size: .20rem;
                            color: rgb(147, 153, 159);
                            line-height: .24rem;
                            vertical-align: top;
                            margin-right: .12rem;
                        }
                        .avatar {
                            width: .24rem;
                            height: .24rem;
                            vertical-align: top;
                        }
                        .time {
                            font-size: .20rem;
                            color: rgb(147, 153, 159);
                            line-height: .24rem;
                            margin-bottom: .12rem;
                        }
                        .text {
                            font-size: .24rem;
                            color: rgb(7, 17, 27);
                            line-height: .32rem;
                            .icon-thumb_up {
                                font-size: .24rem;
                                color: rgb(0, 160, 220);
                                line-height: .48rem;
                                margin-right: .08rem;
                            }
                            .icon-thumb_down {
                                font-size: .24rem;
                                color: rgb(147, 153, 159);
                                line-height: .48em;
                                margin-right: .08rem;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
