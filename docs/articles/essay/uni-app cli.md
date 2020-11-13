直接使用 `tailwind.config.js` 的时候不生效， 原因是路径是 `process.cwd()` 的，不在当前目录下， `postcss` 加载不到对应的配置文件，也就传不到 `postcss plugins` 里供插件使用。

```
// uniapp-cli.js
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd())
```



`postcss` 支持指定自定义配置文件名

```
// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss')('./tailwindcss-config.js'),
  ],
}
```

> https://tailwindcss.com/docs/configuration

