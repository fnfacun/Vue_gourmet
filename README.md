# 基于 element-ui 和 Vue 的项目开发

## 项目依赖使用
- vue
- vue-router
- vuex
- axios
- element-ui
- throttle-debounce

## 项目视图说明
- 首页
- 登陆注册
- 菜谱大全
- 发布菜谱
- 编辑个人资料
- 个人空间
- 菜谱细节

## 项目目录
- node_modules —— 第三方依赖模块
- public —— 公共资源
- src
    - assets —— 存放静态资源，例如 css、font、images...
    - components —— 组件
    - router —— 路由信息
    - service —— 数据接口
    - store  —— 仓库
    - views  —— 视图组件
    - app.vue —— 主入口

## 项目问题总结
- 个人空间菜单栏路由切换时，userId 重复问题。

- 原因：
1. 作品路由切换到粉丝路由菜单时，造成数据 userId 重复。
2. 如果菜单切换太快时，Ajax 数据返还慢导致 userId 地址错误，展示的不是粉丝的数据，而是我用户的数据

- 解决措施
1. 切换时清空 List 数据 
2. 切换 tab 时，最后一次回来的 Ajax，就填充谁的数据。在返回的数据中添加请求标识，如果返回的数据和我当前请求的标识相同，就填充数据 activeName === data.flag? this.list = data.list

## 讨论
欢迎分享共同做一个技术交流。