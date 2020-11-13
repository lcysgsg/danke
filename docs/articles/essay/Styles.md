在我使用过并在随后接触到 Atomic CSS 的概念时， 我意识到开发过程中有一个这样的样式库对于飘忽不定的业务开发有多方便。

在我的理解里，库可以分3种：
1. 原子库， 基于 [Atomic CSS](./Atomic CSS.md) 设计出来的库， 类似 [tailwindcss](https://tailwindcss.com)
2. 组件库， 比如按钮、列表等等， 再细分通用或是业务
3. 动画库

## 原子库
Atomic CSS 有很多成熟的实现， 其中， 我最钟意的是 tailwindcss， 它结合编译器能做更进一步的优化

Atomic 虽然好用，但是带来的一定是庞杂的代码库

以 tailwindcss 举例，完整的库定义了几万行 class，未压缩的情况下达到 2000+kb 

一般的项目怎么肯接受一个这样功能的样式库占用如此大小， 所以它们在编译器打包的阶段，[做了优化控制大小](https://tailwindcss.com/docs/controlling-file-size)， 只生成目标文件中匹配到的 class

在使用 vscode 的时候， 还有 [tailwindcss IntelliSense](https://tailwindcss.com/docs/intellisense) 帮助补全 class

### 注意事项
在 uni-app 中使用的时候， 可能会遇到 `tailwind.config.js` 配置文件不起作用的问题

直接使用 `tailwind.config.js` 的时候不生效， 原因是路径是 `process.cwd()` 的，不在当前目录下， `postcss` 加载不到对应的配置文件，也就传不到 `postcss plugins` 里供插件使用。

```
// uniapp-cli.js
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
```

`postcss` 是支持指定自定义配置文件名

```
// postcss.config.js
module.exports = {
   plugins: [
      require('tailwindcss')('./tailwindcss-config.js')
   ]
}
```

>  https://tailwindcss.com/docs/configuration


## TODO

### 页面的安全区域

确保内容即使在非矩形的视区中也可以完全显示，经常会需要用到诸如 `--window-top` 、`env(safe-area-inset-*)` 等自定义变量、自定义属性。

注意：`env` 兼容性

参考资料：

- [Designing Websites for iPhone X](https://webkit.org/blog/7929/designing-websites-for-iphone-x/)
- [小程序包括uniapp针对安全区域env(safe-area-inset-*)兼容](https://ask.dcloud.net.cn/article/36494)
- [MDN env()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/env)
