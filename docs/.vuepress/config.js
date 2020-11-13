module.exports = {
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Draft', link: '/draft/' },
    ],
    sidebar: {
      '/draft/': [
        '',
        '开发项目时 log 的使用',
        '页面布局屏幕适配',
      ], 
      // '/Git Bash',
      // ['/tips', 'Explicit link text'],
      // {
      //   title: 'Group 12',   // 必要的
      //   // path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
      //   collapsable: false, // 可选的, 默认值是 true,
      //   sidebarDepth: 1,    // 可选的, 默认值是 1
      //   children: [
      //     '/'
      //   ]
      // },
    },
  },
  markdown: {
    // [Vuepress 图片资源中文路径问题](https://segmentfault.com/a/1190000022275001)
    extendMarkdown: md => {
      md.use(require("markdown-it-disable-url-encode"));
    }
  }
}
