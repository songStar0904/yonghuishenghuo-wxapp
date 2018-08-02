let {
  diff
} = require('./util.js')
// 监听函数
const defineReactive = (data, key, val, fn) => {
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get () {
      return val
    },
    set (newVal) {
      // console.log(val[0].list[0].num, newVal[0].list[0].num)
      if (diff(val === newVal)) return
      fn && fn(newVal)
      val = newVal
    }
  })
}
const watch = (ctx, obj) => {
  Object.keys(obj).forEach(key => {
    defineReactive(ctx.data, key, ctx.data[key], function(val) {
      obj[key].call(ctx, val)
    })
  })
}
module.exports = watch