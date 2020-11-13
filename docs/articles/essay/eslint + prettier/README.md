# eslint + vue + prettier 咋配的？ 
看不懂，自己从头整一边，发现比想象中简单

## 开发环境
如果希望保存时格式化，在vscode 下，需要 `eslint` 配合， 具体信息看[vscode-eslint](https://github.com/Microsoft/vscode-eslint)
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
}
```

## 一个一个的选配
在一个 `vue` 项目中想要用 `eslint` + `prettier`， 就要结合多个插件， 要清楚下面这点思路， 理解了思路就可以清晰的选配了  
> `eslint` 做 `eslint`的事情  
> `vue`（`react`等等的都是同理） 做 `vue` 的事情  
> `prettier` 做 `prettier` 的事情  

1. 要校验`.js`
- 安装 `eslint`
- `npm install --save-dev eslint`
- 配置 `eslint`，选一个推荐的规则
```js
// .eslintrc.js
{
  extends: ['eslint:recommended'],
}
```

2. 要校验`.vue`
- 安装 [`eslint-plugin-vue`](https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/docs/user-guide/README.md)，注意文档的提示， `vue3` 正式发行在即， 网站文档已经更新成了 `vue3` 的使用方式， 要在 `git` 里找 `v6.*` 的版本
- `npm install --save-dev eslint-plugin-vue`
- 在文档介绍中， 看到[提示要注意解析器的配置](https://github.com/vuejs/eslint-plugin-vue/blob/v6.2.2/docs/user-guide/README.md#how-to-use-a-custom-parser)。 该插件把 `parser` 设置成了 `vue-eslint-parser`， 所以在配置的时候不要把 `parser` 字段覆盖了, 把需要的其它解析器移到 `parserOptions` 去
```js
// .eslintrc.js
{
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  // parser: "vue-eslint-parser", // `eslint-plugin-vue plugin:vue/recommended` 里已经设置好了，可以不用设置
  parserOptions: {
    parser: "babel-eslint" // 仅当用了 Flow 或 尚在实验中的特性等不被 Eslint 支持的，可以增加 `babel-eslint`
  }
}
```

3. 要`prettier`的格式化
- 安装 [`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)
- `npm install --save-dev eslint-plugin-prettier`
- 此时有了 `prettier` 的代码风格校验，实际过程中一定会发现， `eslint` 与 `prettier` 之间的代码风格有冲突， 就有了一份应对这个冲突的配置
- 在文档中能发现它推荐的 `eslint-config-prettier`。 这份配置用于处理它们之间的冲突
- 安装 [`eslint-config-prettier`](https://www.npmjs.com/package/eslint-config-prettier)
- `npm install --save-dev eslint-config-prettier`
```js
// .eslintrc.js
{
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended", // 它包含了 extends: ['prettier'], plugins: ['prettier']
    "prettier/vue",
  ],
}
```

全部涉及到的部分
```json
// package.json
{
  ...,
  "devDependencies": {
    "eslint": "^7.0.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-prettier": "^3.1.3",
    "eslint-plugin-vue": "^6.2.2",
    "prettier": "^2.0.5"
  }
}
```
```js
// .eslintrc.js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "prettier/vue",
  ],

  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",

    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "vue/html-self-closing": "error",
  },
};
```

## 理解了以后，就用官方的脚手架吧^^
官方的脚手架都配好了，它有个 `"@vue/prettier"`， 其实就是把那`prettier`套了一层。所以 `cli` 生成完开直接干就完事了  
不过我优先都是选择的 **recommend**， 所以会跟它生成来的有点不一样  


## 总结
没必要深入嗷， 搞搞清楚这都是些啥就好了啦。  
仔细想想，如果把 `eslint` 的文档仔细通读一遍，可能就不会有这些问题了...  

## FAQ
### `Delete `␍`eslint(prettier/prettier)`
从git上拉取下来会出现这个问题  
[原因就是 git and 换行符啦](https://segmentfault.com/a/1190000021803437)  
对比了几种解决方案， 我的决定是为 `prettier` 配置 `endOfLine: "auto"`

### html 经 prettier 格式化后 tag 出现奇怪的格式 [html-whitespace-sensitivity](https://prettier.io/docs/en/options.html#html-whitespace-sensitivity)

在内敛元素中，空白是会产生影响的，这对格式化造成了困扰  
所以，默认情况下格式化以后，段落换行显得像 bug 一样  
具体使用哪个设置，还是要具体分析的

```html
<!-- 
  --html-whitespace-sensitivity (defaults to css)
    css - Respect the default value of CSS display property. 根据默认的 html tag css属性来处理
    strict - All whitespace is considered significant. 页面美观至上，所有代码都会严格处理空格
    ignore - All whitespace is considered insignificant. 代码美观至上，页面可能会产生空格
-->
<!-- <span> is an inline element, <div> is a block element -->

<!-- input -->
<span class="dolorum atque aspernatur"
  >Est molestiae sunt facilis qui rem.</span
>
<div class="voluptatem architecto at">
  Architecto rerum architecto incidunt sint.
</div>

<!-- output -->
<span class="dolorum atque aspernatur"
  >Est molestiae sunt facilis qui rem.</span
>
<div class="voluptatem architecto at">
  Architecto rerum architecto incidunt sint.
</div>
```
