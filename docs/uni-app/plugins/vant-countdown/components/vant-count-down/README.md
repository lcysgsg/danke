## 搬运自 vant 2.8.6
只是抽离了 cowndown 这么一个组件  
用法一样 [vant count down](https://youzan.github.io/vant/#/en-US/count-down)  
使用过的端：h5、微信小程序、支付宝小程序  

## 注意
- 支付宝小程序
    - 用毫秒倒计时会卡， 所以在支付宝小程序里条件编译后自动处理了 `millisecond` 一直等于 `false`
    - 用 `requestAnimationFrame` 会提示 `not defined` ，所以 `try..catch` 用了 `fallback`