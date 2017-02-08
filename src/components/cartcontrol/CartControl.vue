<template>
        <div class="cartcontrol">
            <transition name="move">
                <div class="cart-decrease" v-show="food.count>0" @click.stop="deleteCart($event)">
                    <span class="inner icon-remove_circle_outline"></span>
                </div>
            </transition>
        <div class="cart-count count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add icon-add_circle" @click.stop="addCart($event)"></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue'
    export default {
        props: {
            food: {
                type: Object
            }
        },
        methods: {
            addCart: function(event) {
                if(!event._constructed) {
                    return;
                }
                if(!this.food.count) {
                    Vue.set(this.food, 'count', 1);
                }else {
                    this.food.count++;
                }
                let rect = event.target.getBoundingClientRect();
                this.$emit('pos', {left: rect.left, top: rect.top})
            },
            deleteCart: function(event) {
                if(!event._constructed) {
                    return;
                }

                this.food.count--;
            }
        }
    }
</script>

<style lang="less">
    .cartcontrol {
        font-size: 0;
        .cart-decrease {
            display: inline-block;
            padding: .10rem;
            &.move-enter-active, &.move-leave-active {
                transition: all .4s ease;
            }
            &.move-enter-active {
                transform: translate3d(0, 0, 0);
                opacity: 1;
            }
            &.move-enter {
                transform: translate3d(.96rem, 0, 0);
                opacity: 0;
            }
            &.move-leave-active {
                transform: translate3d(0.96rem, 0, 0);
                opacity: 0;
            }
            .inner {
                font-size: .48rem;
                line-height: .48rem;
                color: #00a0dc;
            }
        }
        .count {
            display: inline-block;
            font-size: .20rem;
            vertical-align: top;
            line-height: .68rem;
            height: .68rem;
            width: .48rem;
            text-align: center;
            color: #93999f;
        }
        .cart-add {
            display: inline-block;
            font-size: .48rem;
            line-height: .48rem;
            padding: .10rem;
            color: #00a0dc;
        }
    }
</style>
