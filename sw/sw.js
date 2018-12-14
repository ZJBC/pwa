// 离线页面 fetch出发
// 生命周期    install    active     working
// install 阶段
const cacheName = "zjbcsw"
this.addEventListener('install', function(event){
  console.log("install只触发一次")
  event.waitUntil( // waitUntil  接受一个promise参数 来判断是否成功install
    caches.open(cacheName).then(function(cache){
      // 缓存key 要缓存的列表
      return cache.addAll([
        './', // 缓存/路由
        '../img/1.png', //  缓存图片
      ])
    })
  ) 
})

this.addEventListener('activate', function (event) {
  console.log('active')

})

// sw的事件机制    fetch    push    async
this.addEventListener('fetch', function (event) {
  console.log('fetch')
  event.respondWith(
    caches.match(event.request)
    .then(function (resp) {
      if(resp) {
        console.log("有缓存",resp)
        return resp
      } else {
        console.log("没有缓存",resp)
        console.log(`没有缓存请求`, event)
        
        return fetch(event.request).then(function(response) {
          console.log("请求结果", response)
          return response  // 缓存结果
        })
      }
      
    })
  )
})
console.log('end')
