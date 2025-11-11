export default {
  title: 'My English Essays', // 网站标题
  description: 'A collection of my English essays.', // 网站描述
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Essays', link: '/essay/2018/major' }, // 导航栏链接到第一篇文章
      // --- 新增模板导航 ---
      { text: 'Templates (模板)', link: '/templates/minor/topic01' }
      // --- 结束 ---
    ],
    sidebar: {
      // --- 这是你原来的作文侧边栏 ---
      '/essay/': [
        {
          text: '2018', // 按年份分组
          items: [
            { text: '大作文', link: '/essay/2018/major' },
            // 后期你可以在这里添加小作文, 例如:
            // { text: '小作文', link: '/essay/2018/minor' }
          ]
        }
        // 后续可以继续添加新的年份分组
      ],
      
      // --- 这是新增的模板侧边栏 ---
      '/templates/': [
        {
          text: '小作文 (Templates)',
          // collapsed: false, // 如果你希望默认展开，可以取消这行注释
          items: [
            { text: 'Topic 01: 通知/告示', link: '/templates/minor/topic01' },
            { text: 'Topic 02: 邮件 (建议)', link: '/templates/minor/topic02' },
            { text: 'Topic 03: 邮件 (回复邀请)', link: '/templates/minor/topic03' },
            { text: 'Topic 04: 邮件 (感谢)', link: '/templates/minor/topic04' }
            // 以后你可以在这里继续添加
          ]
        }
      ]
      // --- 结束 ---
    }
  }
}
