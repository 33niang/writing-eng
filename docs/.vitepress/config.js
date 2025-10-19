export default {
  title: 'My English Essays', // 网站标题
  description: 'A collection of my English essays.', // 网站描述
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Essays', link: '/essay/2018/major' } // 导航栏直接链接到第一篇文章
    ],
    sidebar: {
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
        // {
        //   text: '2019',
        //   items: [
        //     { text: '大作文', link: '/essay/2019/major' }
        //   ]
        // }
      ]
    }
  }
}
