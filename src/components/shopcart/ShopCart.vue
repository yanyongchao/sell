<template>
    <div>
        <div class="shopCart" @click="showcart($event)">
            <div class="shopCart-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{highlight:totalCount>0}">
                        <span class="icon-shopping_cart" :class="{highlight:totalCount>0}"></span>
                    </div>
                    <div class="num" v-if="totalCount>0">
                        {{totalCount}}
                    </div>
                </div>
                <div class="price" :class="{highlight:sumPrice>0}">￥{{sumPrice}}</div>
                <div class="desc">另需配送费{{deliveryPrice}}元</div>
            </div>
            <div class="shopCart-right" :class="payClass" @click.stop="pay">
                {{payDesc}}
            </div>
            <div class="ball-container">
                <transition name="drop">
                    <span class="ball"></span>
                </transition>
            </div>
            <transition name="listToggle">
                <div class="shopcart-list" v-show="listShow" @click.stop="state">
                    <div class="list-header clear">
                        <h2 class="title">购物车</h2>
                        <span class="empty" @click="empty">清空</span>
                    </div>
                    <div class="list-content" id="list-content-hook">
                        <ul>
                            <li class="food clear" v-for="food in selectFoods">
                                <span class="name">{{food.name}}</span>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food"></CartControl>
                                </div>
                                <div class="price">
                                    ￥<span class="rmb">{{food.price*food.count}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
        <transition name="fade">
            <div class="list-mask" v-show="listShow" @click="maskHidden"></div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import CartControl from '../cartcontrol/CartControl.vue'
    import BScroll from 'better-scroll'
    export default {
        props: {
            selectFoods: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            deliveryPrice: Number,
            minPrice: Number,
            pos: Object,
        },
        data: function() {
            return {
                fold: true
            }
        },
        computed: {
            sumPrice: function() {
                let sum = 0;
                this.selectFoods.forEach((food) => {
                    sum += food.price * food.count;
                });
                return sum;
            },
            totalCount: function() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            },
            payDesc: function() {
                if(this.sumPrice === 0) {
                    return `￥${this.minPrice}元起送`;
                }else if(this.sumPrice < this.minPrice) {
                    return `还差￥${this.minPrice - this.sumPrice}元起送`;
                }else {
                    return '去结算';
                }
            },
            payClass: function() {
                if(this.sumPrice<this.minPrice) {
                    return 'not-enough';
                }else if(this.sumPrice>=this.minPrice) {
                    return 'enough';
                }
            },
            listShow: function() {
                if(!this.totalCount) {
                    this.fold = true;
                    return false;
                }
                let show = !this.fold;
                if(show) {
                    let listContent = document.getElementById('list-content-hook');
                    this.$nextTick(() => {
                        if(!this.scroll) {
                            this.scroll = new BScroll(listContent, {
                                click: true
                            });
                        }else {
                            this.scroll.refresh();
                        }
                    })
                }
                return show;
            }
        },
        methods: {
            showcart: function(event) {
                if(event.target.className === 'shopcart-list') {
                    return;
                }
                if(!this.totalCount) {
                    return;
                }
                this.fold = !this.fold;
            },
            state: function() {
                return;
            },
            empty: function() {
                this.selectFoods.forEach((food) => {
                    food.count = 0;
                });
            },
            maskHidden: function() {
                this.fold = true;
            },
            pay: function() {
                if(this.sumPrice<this.minPrice) {
                    return;
                }
                window.alert(`你需要支付${this.sumPrice}元`);
            }
        },
        components: {
            CartControl:　CartControl
        }
    }
</script>

<style lang="less">
    .shopCart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 50;
        width: 100%;
        height: .96rem;
        display: flex;
        .shopCart-left {
            flex: 1;
            background-color: #131d26;
            font-size: 0;
            .logo-wrapper {
                width: 1.12rem;
                height: 1.12rem;
                border-radius: 50%;
                background-color: #131d26;
                position: absolute;
                top: -.20rem;
                left: .24rem;
                .logo {
                    width: .88rem;
                    height: .88rem;
                    border-radius: 50%;
                    background-color: #2b343c;
                    position: absolute;
                    left: .12rem;
                    top: .12rem;
                    font-size: .40rem;
                    text-align: center;
                    line-height: .88rem;
                    &.highlight {
                        background: rgb(0, 160, 220);
                    }
                    .icon-shopping_cart {
                        color: #80858a;
                        &.highlight {
                            color: #fff;
                        }
                    }
                }
                .num {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: .48rem;
                    height: .32rem;
                    line-height: .32rem;
                    background-color: #f01414;
                    color: #fff;
                    font-size: .16rem;
                    font-weight: 700;
                    text-align: center;
                    border-radius: .12rem;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .4);
                }
            }
            .price {
                height: .48rem;
                width: .94rem;
                box-sizing: border-box;
                margin-top: .24rem;
                padding: 0 .24rem;
                line-height: .48rem;
                color: #919396;
                font-size: .32rem;
                font-weight: bold;
                border-right: .01rem solid #24343d;
                margin-left: 1.36rem;
                display: inline-block;
                &.highlight {
                    color: #fff;
                }
            }
            .desc {
                margin-left: .25rem;
                line-height: .96rem;
                display: inline-block;
                font-size: .20rem;
                color: #72777d;
            }
        }
        .shopCart-right {
            flex: 0 0 2.1rem;
            text-align: center;
            line-height: .96rem;
            color: #979a9c;
            font-size: .24rem;
            background: #2b333b;
            border-left: 1px solid #131d26;
            box-sizing: border-box;
            &.not-enough {
                background: #2b333b;
            }
            &.enough {
                background: #00b43c;
                color: #fff;
            }
        }
        .ball-container {
            position: fixed;
            left: .56rem;
            bottom: .50rem;
            width: .48rem;
            height: .48rem;
            .ball {
                display: block;
                width: .48rem;
                height: .48rem;
                border-radius: 50%;
                background: red;
                &.drop-enter-active, &.drop-leave-active {
                    transition: all 1s ease 0s;
                }
                &.drop-enter-active {
                    transform: translate3d(0, 0, 0);
                }
                &.drop-leave-active {
                    transform: translate3d(0, 0, 0);
                }
                &.drop-enter {

                }
            }
        }
        .shopcart-list {
            position: absolute;
            bottom: .96rem;
            left: 0;
            width: 100%;
            background: #fff;
            z-index: -1;
            &.listToggle-enter-active, &.listToggle-leave-active {
                transition: all .5s ease 0s
            }
            &.listToggle-enter-active {
                transform: translate3d(0, 0, 0);
            }
            &.listToggle-leave-active {
                transform: translate3d(0, 100%, 0);
            }
            &.listToggle-enter {
                transform: translate3d(0, 100%, 0);
            }
            .list-header {
                height: .80rem;
                padding: 0 .36rem;
                background: #f3f5f7;
                border-bottom: 1px solid #dbdee1;
                .title {
                    font-size: .28rem;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: .80rem;
                    float: left;
                }
                .empty {
                    font -size: .24rem;
                    color: rgb(0, 160, 220);
                    line-height: .80rem;
                    float: right;
                }
            }
            .list-content {
                max-height: 4.35rem;
                padding: 0 .36rem;
                overflow: hidden;
                .food {
                    height: .68rem;
                    padding: .14rem 0;
                    .name {
                        font-size: .28rem;
                        color: rgb(7, 17, 27);
                        line-height: .68rem;
                        height: .68rem;
                        float: left;
                    }
                    .cartcontrol-wrapper {
                        float: right;
                    }
                    .price {
                        line-height: .68rem;
                        height: .68rem;
                        float: right;
                        font-size: .20rem;
                        color: rgb(240, 20, 20);
                        line-height: .68rem;
                        margin: 0 .26rem;
                        .rmb {
                            font-size: .28rem;
                            font-weight: 700;
                        }
                    }
                }
            }
        }
    }
    .list-mask {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, .6);
        -webkit-filter: blur(.1rem);
        z-index: 40;
        &.fade-enter-active, &.fade-leave-active {
            transition: all .5s ease 0s;
        }
        &.fade-enter-active {
            opacity: 1;
        }
        &.fade-leave-active {
            opacity: 0;
        }
        &.fade-enter {
            opacity: 0;
        }
    }
</style>