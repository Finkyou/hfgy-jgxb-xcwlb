# 合肥工业学校学生会网站

这是一个现代化的学生会官方网站，提供新闻发布、资源下载、招新信息、摄影展示等功能。

## 功能特性

- 📰 新闻资讯发布与展示
- 📚 学习资源申请与下载
- 🎯 招新信息管理与报名
- 📸 摄影作品展示与分享
- 👥 成员信息介绍
- 📝 在线投稿系统
- 🔐 用户认证与个人主页
- 📅 值班表管理
- 🎨 文化艺术节展示

## 技术栈

- 前端：HTML5, CSS3, JavaScript, Bootstrap
- 后端：Node.js, Express.js
- 数据库：MongoDB
- 内容管理：Python脚本自动生成JSON数据
- 部署：GitHub Pages

## 项目结构

```
├── das/                    # 网站前端主目录
│   ├── css/               # 样式表目录
│   │   ├── core.css       # 全站基础样式，含Bootstrap引入、自定义变量
│   │   ├── style.css      # 全站美化与自定义样式
│   │   ├── auth.css       # 认证相关页面样式
│   │   ├── duty.css       # 值班表页面样式
│   │   ├── members.css    # 成员介绍页面样式
│   │   ├── news.css       # 新闻页面样式
│   │   ├── photography.css# 摄影展区页面样式
│   │   ├── recruitment.css# 招新页面样式
│   │   ├── resources.css  # 资源申请页面样式
│   │   ├── submit.css     # 投稿页面样式
│   │   └── responsive.css # 全站响应式适配样式
│   ├── js/                # 前端JS脚本
│   │   ├── main.js        # 全站表单校验与交互优化
│   │   ├── admin.js       # 后台管理页交互逻辑
│   │   ├── profile.js     # 用户个人主页交互逻辑
│   │   ├── duty.js        # 值班表页面交互
│   │   ├── news.js        # 新闻页面交互
│   │   ├── photography.js # 摄影展区页面交互
│   │   ├── recruitment.js # 招新页面交互
│   │   ├── resources.js   # 资源申请页面交互
│   │   └── submit.js      # 投稿页面交互
│   ├── pages/             # 主要功能页面
│   │   ├── blog.html      # 博客/公告页面
│   │   ├── duty.html      # 值班表页面
│   │   ├── forgot.html    # 找回密码页
│   │   ├── login.html     # 登录页
│   │   ├── members.html   # 成员介绍页面
│   │   ├── news.html      # 新闻动态页
│   │   ├── photography.html # 摄影展区页
│   │   ├── profile.html   # 用户个人主页
│   │   ├── recruitment.html # 招新报名页面
│   │   ├── register.html  # 注册页
│   │   ├── resources.html # 资源申请页面
│   │   └── submit.html    # 投稿区页面
│   └── index.html         # 网站首页，导航入口
├── backend/                # 后端API服务
│   ├── controllers/        # 控制器
│   ├── models/            # 数据模型
│   ├── routes/            # 路由定义
│   └── utils/             # 工具函数
├── data/                   # 静态内容数据
│   ├── news.json          # 新闻内容数据
│   └── gallery.json       # 摄影展区内容数据
├── img/                    # 图片资源目录
│   ├── Banner/            # 横幅图片
│   ├── logo/              # 网站Logo
│   ├── news/              # 新闻图片
│   ├── photo/             # 摄影作品
│   ├── teams/             # 团队照片
│   └── slider/            # 轮播图片
├── generate_news_json.py   # 新闻内容生成脚本
├── generate_gallery_json.py# 摄影展区内容生成脚本
└── 项目结构说明.md         # 项目结构详细说明
```

## 快速开始

1. 克隆项目
```bash
git clone  
cd hfgy-jgxb-xcwlb
```

2. 安装后端依赖
```bash
cd backend
npm install
```

3. 启动后端服务
```bash
npm start
```

4. 访问网站
- 前端页面：直接打开 `das/index.html`
- 后端API：`http://localhost:3000`

## 内容管理

项目使用Python脚本自动生成内容数据：

```bash
# 生成新闻数据
python generate_news_json.py

# 生成摄影展区数据
python generate_gallery_json.py
```

## 部署

本项目使用GitHub Pages进行静态网站托管，访问地址：


### GitHub Pages设置步骤：

1. 在GitHub仓库设置中启用Pages功能
2. 选择部署分支（通常是main或master）
3. 选择部署目录（选择根目录或das目录）
4. 保存设置，等待部署完成

## 主要页面说明

- **首页** (`das/index.html`): 网站导航入口，展示主要功能模块
- **新闻页** (`das/pages/news.html`): 自动渲染news.json，展示所有新闻动态
- **摄影展区** (`das/pages/photography.html`): 自动渲染gallery.json，展示摄影作品
- **招新页** (`das/pages/recruitment.html`): 外联部招新报名
- **资源申请** (`das/pages/resources.html`): 学习资源申请与下载
- **投稿区** (`das/pages/submit.html`): 用户投稿系统
- **成员介绍** (`das/pages/members.html`): 学生会成员信息展示

## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License 