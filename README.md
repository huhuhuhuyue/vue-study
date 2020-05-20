# next-test

> My epic Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


谈谈你对服务端渲染的理解以及使用场景
1.	特点：
是介于传统web开发和单页面开发之间的一种模式。
2.	优点：
第一次请求时生成完整的html给浏览器，浏览器直接出首屏，解决了单页面应用首屏加载慢的问题，提升了用户体验；
服务端把html给浏览器，从而确保搜索引擎都能爬取到关键数据，解决了单页面应用不利于 SEO 搜索引擎优的问题；
解析模板的工作完全交由服务端来完成，对于客户端的资源占用更少。
3.	缺点：
不利于前后端分离，开发效率低，复杂度高；
库的支持性降低；
负载大，性能降低，服务器压力大。
4.	场景：
官网、宣传性网站等主要功能是展示而没有复杂的交互，对SEO、首屏渲染的要求较高，这时就需要使用服务器端渲染；
后台管理页面，交互性比较强，不需要考虑SEO，那么就可以使用客户端渲染；
若要对已存在项目进行改造，可以使用爬虫puppeteer；
如果是新项目可以使用成熟的框架nuxt.js。

参考资料：https://www.cnblogs.com/yebai/p/11267197.html

