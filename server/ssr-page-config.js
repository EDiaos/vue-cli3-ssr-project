
const isEnableServerRender = true

// 需要精确匹配
const pageConfigs = [
  {
    name: 'home',
    regExp: /^\/$/
  },
  {
    name: 'detail',
    regExp: /(^\/detail\/(.+)?)|(^\/unitdetail(\/)?)|(^\/(\w+)_gongyu\/(\w+).htm)|(^\/gongyu\/(.+)?)/
  }
]

module.exports = function isServerRenderPage(ctx,cookies){
  // 关闭服务端渲染
  if(!isEnableServerRender){
    return false
  }
  // 服务端渲染判断
  const userId = cookies['userId']
  const userToken = cookies['userToken']
  // 通过url判断 确认关闭 ssr 功能
  if(ctx.query.ssr){
    return ctx.query.ssr === 'on' || ctx.query.ssr !== 'off'
  }
  else if(userId && userToken){
    return false
  }
  else{
    let isSSR = false
    pageConfigs.forEach(item=>{
      if(!isSSR){
        isSSR = item.regExp.test(ctx.url)
      }
    })
    return isSSR
  }
}