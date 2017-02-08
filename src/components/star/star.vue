<template>
    <div class="star" :class="starType">
        <span v-for="(item, index) in itemClasses" :class="item" class="star-item">
        </span>
    </div>
</template>

<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: {
            size: Number,
            score: Number
        },
        computed: {
            starType: function() {
                return 'star-'+this.size
            },
            itemClasses: function() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !== 0;
                let integer = Math.floor(score);
                for(var i=0; i<integer; i++) {
                    result.push(CLS_ON);
                }
                if(hasDecimal) {
                    result.push(CLS_HALF);
                }
                while(result.length < LENGTH) {
                    result.push(CLS_OFF);
                }
                return result;
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
    .star {
        font-size: 0;
        &.star-48 {
            .star-item {
                width: .40rem;
                height: .40rem;
                margin-right: .44rem;
                background-size: .40rem .40rem;
                &:last-child {
                     margin-right: 0;
                 }
                &.on {
                 .bg-image('star48_on');
                 }
                &.half {
                 .bg-image('star48_half');
                 }
                &.off {
                 .bg-image('star48_off');
                 }
            }
        }
        &.star-36 {
             .star-item {
                 width: .30rem;
                 height: .30rem;
                 margin-right: .16rem;
                 background-size: .30rem .30rem;
                &:last-child {
                     margin-right: 0;
                 }
                &.on {
                 .bg-image('star36_on');
                 }
                &.half {
                 .bg-image('star36_half');
                 }
                &.off {
                 .bg-image('star36_off');
                 }
             }
        }
        &.star-24 {
             .star-item {
                 width: .20rem;
                 height: .20rem;
                 margin-right: .16rem;
                 background-size: .20rem .20rem;
                &:last-child {
                     margin-right: 0;
                 }
                &.on {
                 .bg-image('star24_on');
                 }
                &.half {
                 .bg-image('star24_half');
                 }
                &.off {
                 .bg-image('star24_off');
                 }
             }
        }
        .star-item {
            display: inline-block;
            background-repeat: no-repeat;
        }
    }
</style>
