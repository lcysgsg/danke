/**
 * requestAnimationFrame polyfill
 */

let prev = Date.now();

function fallback(fn) {
  const curr = Date.now();
  let ms = Math.max(0, 16 - (curr - prev));
  // 支付宝小程序做毫秒定时器会卡
  // #ifdef MP-ALIPAY
  ms = 1000;
  // #endif
  const id = setTimeout(fn, ms);
  prev = curr + ms;
  return id;
}

// 考虑到 requestAnimationFrame 是 window 上的属性，所以只在 h5 上用 requestAnimationFrame
// 同时，try...catch 捕获下错误仍会造成影响（造成 app 白屏），所以直接使用条件编译，不再用 try..catch 判断
let iRaf = null;
let iCancel = null;

/* #ifdef H5 */
  iRaf = requestAnimationFrame || fallback;
  iCancel = cancelAnimationFrame || clearTimeout;
/* #endif */

/* #ifndef H5 */
  iRaf = fallback;
  iCancel = clearTimeout;
/* #endif */

export function raf(fn) {
  return iRaf.call(this, fn);
}

// double raf for animation
export function doubleRaf(fn) {
  raf(() => {
    raf(fn);
  });
}

export function cancelRaf(id) {
  iCancel.call(this, id);
}
