<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span @click="select(2, $event)" class="block positive" :class="{active: nowSelectType===2}">{{desc
                .all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0, $event)" class="block positive" :class="{active: nowSelectType===0}">{{desc.positive
                }}<span class="count">{{positives.length}}
            </span></span>
            <span @click="select(1, $event)" class="block negative" :class="{active: nowSelectType===1}">{{desc.negative
                }}<span class="count">{{negatives.length}}
            </span></span>
        </div>
        <div class="switch" :class="{'on': nowOnlyContent}">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;
    export default {
        props: {
            ratings: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            selectType: {
                type: Number,
                default: ALL
            },
            onlyContent: {
                type: Boolean,
                default: false
            },
            desc: {
                type: Object,
                default: function(){
                    return {
                        all: '全部',
                        positive: '满意',
                        negative: '不满意'
                    }
                }
            }
        },
        data: function() {
            return {
                nowSelectType: this.selectType,
                nowOnlyContent: this.onlyContent
            }
        },
        computed: {
            positives: function() {
                return this.ratings.filter((item) => {
                    return item.rateType ==POSITIVE;
                })
            },
            negatives: function() {
                return this.ratings.filter((item) => {
                    return item.rateType = NEGATIVE;
                })
            }
        },
        methods: {
            select: function(type, event) {
                if(!event._constructed) {
                    return;
                }
                console.log(type);
                this.nowSelectType = type;
//                console.log(this.calculateSelectType);
                this.$emit('nowSelectType', type)
            }
        }
    }
</script>

<style lang="less">
    .ratingselect {
        .rating-type {
            padding: .36rem 0;
            margin: 0 .36rem;
            border-bottom: .01rem solid rgba(7, 17, 27, 0.1);
            font-size: 0;
            .block {
                display: inline-block;
                padding: .16rem .24rem;
                margin-right: .16rem;
                border-radius: .02rem;
                color: rgb(77, 85, 93);
                font-size: .24rem;
                &.active {
                    color: #fff;
                }
                &.positive {
                    background: rgba(0, 160, 220, .2);
                    &.active {
                        background: rgb(0, 160, 220);
                    }
                }
                &.negative {
                    background: rgba(77, 85, 93, .2);
                    &.active {
                         background: rgb(77, 85, 93);
                    }
                }
                .count {
                    font-size: .16rem;
                    margin-left: .04rem;
                }
            }
        }
        .switch {
            font-size: 0;
            padding: .24rem 0;
            border-bottom: .01rem solid rgba(7, 17, 27, .1);
            &.on {
                .icon-check_circle {
                    color: #00c850;
                }
            }
            .icon-check_circle {
                display: inline-block;
                font-size: .48rem;
                color: rgb(147, 153, 159);
                line-height: .48rem;
                margin-right: .08rem;
                margin-left: .36rem;
            }
            .text {
                display: inline-block;
                font-size: .24rem;
                color: rgb(147, 153, 159);
                line-height: .48rem;
                vertical-align: top;
            }
        }
    }
</style>
