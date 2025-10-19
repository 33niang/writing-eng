export default {
  title: 'My English Essays', // 网站标题
  description: 'A collection of my English essays.', // 网站描述
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Essays', link: '/essay/18' }
    ],
    sidebar: {
      '/essay/': [
        {
          text: 'Essays',
          items: [
            { text: '2018-大作文', link: '/essay/18' },
            // 后续你可以在这里添加更多作文
          ]
        }
      ]
    }
  }
}
