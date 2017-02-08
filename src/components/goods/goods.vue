<template>
    <div class="goods">
        <div class="menu-wrapper" id="menuWrap">
            <ul>
                <li v-for="(item, index) in goods" class="menu-item border-bottom-1px"
                    :class="{active: curIndex === index}" @click="scrollTo(index)">
                    <span class="text">
                        <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" id="foodsWrap">
            <ul>
                <li v-for="(item, index) in goods" class="food-list food-item-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food, $event)" v-for="(food, index) in item.foods"
                            class="food-item border-bottom-1px">
                            <div class="icon">
                                <img width="57" height="57" class="food-img" :src="food.icon" alt=""/>
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="count">月售{{food.sellCount}}</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now-price">￥<i>{{food.price}}</i></span>
                                    <span class="old-price" v-show="food.oldPrice">￥<i>{{food.oldPrice}}</i></span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <CartControl :food="food" @pos="getPos"></CartControl>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <ShopCart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                  :min-price="seller.minPrice" :pos="pos"></ShopCart>
        <food :food="selectedFood" :showFlag="showFlag"></food>
    </div>

</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import ShopCart from '../shopcart/ShopCart.vue'
    import CartControl from '../cartcontrol/CartControl.vue'
    import Food from '../food/food.vue'

    export default {
        data: function() {
            return {
                goods: [],
//                seller: {},
                heightAry: [],
                scrollY: 0,
                pos: {},
                selectedFood: {},
                showFlag: {
                    show: false
                }
            }
        },
        props: {
            seller: Object
        },
        created: function() {
            this.$http({
                url: '../../../data.json',
                method: 'get'
            }).then((res) => {
//                this.seller = res.data.seller;
                this.goods = res.data.goods;
                this.$nextTick(() => {
                    this.scroll();
                    this.calculateHeight();
                })
            });
            this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special'];
        },
        computed: {
            curIndex: function() {
                for(let i= 0, len=this.heightAry.length; i<len; i++) {
                    let top1 = this.heightAry[i];
                    let top2 = this.heightAry[i+1];
                    if(!top2 || this.scrollY >= top1 && this.scrollY < top2) {
                        return i;
                    }
                }
            },
            selectFoods: function() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count) {
                            foods.push(food);
                        }
                    })
                });
                return foods;
            }
        },
        components: {
            ShopCart: ShopCart,
            CartControl: CartControl,
            Food: Food
        },
        methods: {
            scroll: function() {
                var menuWrap = document.getElementById('menuWrap'),
                        foodsWrap = document.getElementById('foodsWrap');
                this.menuScroll = new BScroll(menuWrap, {
                    click: true
                });
                this.foodsScroll = new BScroll(foodsWrap, {
                    probeType: 3,
                    click: true
                });
                this.foodsScroll.on('scroll', (pos) => {
                     this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            calculateHeight: function() {
                let foodList = document.getElementsByClassName('food-item-hook');
                let height = 0;
                this.heightAry.push(height);
                [].forEach.call(foodList, function(item, index, input) {
                    height += item.offsetHeight;
                    this.heightAry.push(height);
                }.bind(this));
            },
            scrollTo: function(index){
                let foodList = document.getElementsByClassName('food-item-hook');
                let el = foodList[index];
                this.foodsScroll.scrollToElement(el);
            },
            getPos: function(val) {
                var htmlFont = parseFloat(document.documentElement.style.fontSize);
                var winH = document.documentElement.clientHeight / htmlFont;
                var x = val.left / htmlFont - .56;
                var y = -(winH - val.top / htmlFont -.50);
                this.pos = {x: x, y: y};
            },
            selectFood: function(food, event) {
                this.selectedFood = food;
                this.showFlag.show = true;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .border-bottom-1px(@color: #000) {
        position: relative;
    &:after {
         display: block;
         position: absolute;
         left: 0;
         bottom: 0;
         border-top: 1px solid @color;
         content: ' ';
         width: 100%;
     }
    }
    .bg-image(@url) {
        background-image: url("@{url}@2x.png");
        @media all and (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
            background-image: url("@{url}@3x.png");
        }
    }
    .border-none() {
        &:after {
             display: none;
         }
    }
    .goods {
        display: flex;
        position: absolute;
        top: 3.53rem;
        bottom: .96rem;
        width: 100%;
        overflow: hidden;
        .menu-wrapper {
            flex: 0 0 1.6rem;
            width: 1.6rem;
            background: #f3f5f7;
            .menu-item {
                display: table;
                height: 1.08rem;
                width: 1.12rem;
                padding: 0 .24rem;
                line-height: .28rem;
                .border-bottom-1px(rgba(7, 17, 27, .1));
                &.active {
                    background-color: #fff;
                    margin-top: -1px;
                    z-index: 10;
                    font-weight: bold;
                    .border-none();
                 }
                .icon {
                    width: .24rem;
                    height: .24rem;
                    display: inline-block;
                    vertical-align: top;
                    margin-right: .04rem;
                    background-size: .24rem .24rem;
                    &.decrease {
                     .bg-image("./decrease_3");
                     }
                    &.discount {
                     .bg-image("./discount_3");
                     }

                    &.guarantee {
                     .bg-image("./guarantee_3");
                     }
                    &.invoice {
                     .bg-image("./invoice_3");
                     }
                    &.special {
                     .bg-image("./special_3");
                     }
                }
                .text {
                    display: table-cell;
                    width: 1.12rem;
                    vertical-align: middle;
                    font-size: .24rem;
                }
            }
        }
        .foods-wrapper {
            flex: 1;
            .food-list {
                .title {
                    height: .52rem;
                    line-height: .52rem;
                    padding-left: .24rem;
                    border-left: .04rem solid #d9dde1;
                    font-size: .24rem;
                    color: #93999f;
                    background-color: #f3f5f7;
                }
                .food-item {
                    padding: .36rem;
                    display: flex;
                    .border-bottom-1px(@color: rgba(7, 17, 27, .1));
                    &:nth-last-of-type {
                        .border-none();
                     }
                    .icon {
                        flex: 0 0 1.14rem;
                        width: 1.14rem;
                        margin-right: .18rem;
                    }
                    .content {
                        font-size: .24rem;
                        flex: 1;
                        position: relative;
                        .name {
                            font-family: '宋体';
                            font-size: .28rem;
                            color: rgb(7, 17, 27);
                            margin-bottom: .16rem;
                        }
                        .desc {
                            font-size: .20rem;
                            margin-bottom: .16rem;
                            color: rgb(147, 153, 159);
                        }
                        .extra {
                            font-size: 0;
                            color: rgb(147, 153, 159);
                            .count {
                                font-size: .20rem;
                                margin-right: .24rem;
                            }
                            .rating {
                                font-size: .20rem;
                            }
                        }
                        .price {
                            font-size: 0;
                            .now-price {
                                color: #f01414;
                                font-size: .20rem;
                                line-height: .48rem;
                                margin-right: .16rem;
                                i {
                                    font-weight: 700;
                                    font-size: .28rem;
                                    font-style: normal;
                                }
                            }
                            .old-price {
                                color: rgb(147, 153, 159);
                                font-size: .20rem;
                                line-height: .48rem;
                                i {
                                    font-weight: 700;
                                    font-style: normal;
                                }
                            }
                        }
                        .cartcontrol-wrapper {
                            position: absolute;
                            right: 0;
                            bottom: -.10rem;
                        }
                    }
                }
            }
        }
    }
</style>
