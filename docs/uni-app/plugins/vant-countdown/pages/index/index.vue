<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view class="text-area">
            <text class="title">{{title}}</text>
        </view>
        <vant-count-down millisecond :time="time" format="HH:mm:ss:SS" />
        <vant-count-down :time="time" format="DD Day, HH:mm:ss" />
        <vant-count-down :time="time" />
        <vant-count-down ref="countDown" millisecond :time="3000" :auto-start="false" format="ss:SSS" @finish="finish" />
        <view clickable :column-num="3" style="display: flex;">
            <button icon="play-circle-o" @click="start">Start</button>
            <button icon="pause-circle-o" @click="pause">Pause</button>
            <button icon="replay" @click="reset">Reset</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                time: 30 * 60 * 60 * 1000,
                title: 'Hello'
            }
        },
        onLoad() {

        },
        methods: {
            start() {
                this.$refs.countDown.start();
            },
            pause() {
                this.$refs.countDown.pause();
            },
            reset() {
                this.$refs.countDown.reset();
            },
            finish() {
                console.log('Finished');
            },
        },
    }
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin-top: 200rpx;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 50rpx;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>
