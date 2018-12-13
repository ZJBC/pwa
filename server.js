const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const serve = require('koa-static')
const logger = require('koa-logger')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()


router.get('/', ctx => {
    let html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
    ctx.body = html
})
app.use(router.routes())
    .use(router.allowedMethods())

app.listen(8088, () => {
    console.log('端口号：8088')
})