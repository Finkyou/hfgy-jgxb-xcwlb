# DAS 后端部署说明

## 依赖环境
- Node.js >= 14
- MongoDB >= 4

## 安装依赖
```bash
cd backend
npm install
```

## 配置环境变量
复制 `.env.example` 为 `.env`，并填写实际内容：
```bash
cp .env.example .env
```

- `PORT`：服务端口
- `MONGO_URI`：MongoDB连接字符串
- `JWT_SECRET`：JWT密钥
- `MAIL_USER`/`MAIL_PASS`/`MAIL_HOST`/`MAIL_PORT`/`MAIL_SECURE`：用于发送邮件的邮箱配置

## 启动服务
```bash
npm start
```

## 主要API
- POST   `/api/auth/register`   用户注册
- POST   `/api/auth/login`      用户登录
- POST   `/api/auth/forgot`     找回密码
- POST   `/api/submit`          投稿
- POST   `/api/recruitment`     招新报名
- POST   `/api/subscribe`       新闻订阅
- POST   `/api/news`            新闻推送（需管理员）
- POST   `/api/resource`        资源申请

## 说明
- 前端通过AJAX调用上述API。
- 邮件推送需配置发件邮箱。
- 管理员功能可通过数据库手动设置用户role字段为admin。 