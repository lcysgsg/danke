module.exports = {
  markdown: {
    // [Vuepress 图片资源中文路径问题](https://segmentfault.com/a/1190000022275001)
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  }
}
