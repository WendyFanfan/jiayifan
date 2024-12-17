export default {
  common: {
    switchLang: '切换语言',
    home: '首页',
    articles: '文章',
    categories: '分类',
    archive: '归档',
    about: '关于我',
    resources: '推荐资源',
    search: '搜索',
    loading: '加载中...',
    noData: '暂无数据',
    edit: '编辑',
    delete: '删除',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    upload: '上传',
    messages: {
      imageTypeError: '只能上传JPG/PNG格式的图片!',
      imageSizeError: '图片必须小于2MB!',
      saveSuccess: '保存成功',
      saveFailed: '保存失败',
      passwordMismatch: '两次输入的密码不一致',
      emailSent: '验证邮件已发送，请查收'
    },
    pagination: {
      total: '共 {total} 条',
      pageSize: '每页 {size} 条',
      jump: '跳至',
      page: '页',
      prev: '上一页',
      next: '下一页'
    },
    footer: '©2024 我的博客 基于 Vue3 & Ant Design Vue 构建'
  },
  profile: {
    bio: '热爱技术，热爱分享。专注于前端开发与技术写作。',
    contact: '联系我',
    github: 'GitHub主页',
    email: '邮箱联系'
  },
  article: {
    latestPosts: '最新文章',
    hotPosts: '热门文章',
    readMore: '阅读更多',
    views: '阅读',
    comments: '评论',
    tags: '标签',
    category: '分类',
    publishDate: '发布日期',
    author: '作者',
    share: '分享',
    relatedPosts: '相关文章',
    writeArticle: '写文章',
    editArticle: '编辑文章',
    deleteConfirm: '确定要删除这篇文章吗？',
    draft: '草稿',
    publish: '发布',
    title: '标题',
    content: '内容',
    coverImage: '封面图片',
    uploadCover: '上传封面',
    addComment: '添加评论',
    commentPlaceholder: '写下你的评论...',
    commentRequired: '请输入评论内容',
    replyPlaceholder: '回复 @{name}',
    shareToWeibo: '分享到微博',
    shareToWechat: '分享到微信',
    followAuthor: '关注作者',
    aboutAuthor: '关于作者',
    authorBio: '作者简介：热爱技术，热爱分享。专注于前端开发与技术写作。'
  },
  category: {
    allCategories: '全部分类',
    articleCount: '篇文章',
    management: '分类管理'
  },
  archive: {
    title: '文章归档',
    total: '共计 {count} 篇文章',
    year: '年',
    month: '月',
    statistics: '统计信息',
    totalArticles: '文章总数',
    timeline: '时间线'
  },
  user: {
    profile: '个人资料',
    settings: '账号设置',
    articles: '我的文章',
    comments: '我的评论',
    favorites: '我的收藏',
    notifications: '消息通知',
    logout: '退出登录',
    removeFavorite: '取消收藏',
    replyTo: '回复于',
    statistics: {
      articles: '文章数',
      comments: '评论数',
      favorites: '收藏数'
    },
    email: '邮箱',
    emailVerified: '已验证',
    verifyEmail: '验证邮箱',
    changePassword: '修改密码',
    currentPassword: '当前密码',
    newPassword: '新密码',
    confirmPassword: '确认新密码',
    avatar: '头像',
    nickname: '昵称',
    bio: '个人简介',
    website: '个人网站',
    location: '所在地',
    selectLocation: '请选择所在地'
  },
  editor: {
    bold: '加粗',
    italic: '斜体',
    link: '链接',
    image: '图片',
    code: '代码块',
    preview: '预览',
    split: '分屏',
    placeholder: '请输入Markdown内容...'
  },
  notifications: {
    system: {
      title: '系统通知',
      description: '系统更新、维护等通知'
    },
    email: {
      title: '邮件通知',
      description: '接收订阅更新、评论等邮件提醒'
    },
    comment: {
      title: '评论通知',
      description: '他人评论你的文章时通知'
    }
  }
}
