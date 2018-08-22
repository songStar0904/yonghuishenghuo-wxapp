const ak = 'zcbTavuSRgQKQB9GyqZZRGYOoBht2RAP' //百度地图api-ak
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const formateAddress = (data) => {
  if (data.length > 9) {
    data = data.substring(0, 9)
    return `${data}...`
  }
  return data
}
// 获得位置授权
const getUserLocation = () => {
  return new Promise(function(resolve, reject) {
    wx.getSetting({
        success: res => {
          resolve(res.authSetting['scope.userLocation'] ? true : false)
        }
    })
  })
}
// 获得地址
const getLocation = () => {
  return new Promise(function(resolve, reject) {
    wx.showLoading({
      title: '定位中...',
    })
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {

        let latitude = res.latitude
        let longitude = res.longitude
        console.log(res)
        wx.request({
          url: `https://api.map.baidu.com/geocoder/v2/?ak=${ak}&location=${latitude},${longitude}&output=json`,
          success: (res) => {
            console.log(res)
            let address = res.data.result.addressComponent
            let data = address.district + address.street + address.street_number;
            data = formateAddress(data)
            wx.hideLoading()
            getApp().globalData.address = data
            resolve(data)
          },
          fail: (res) => {
            wx.hideLoading()
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log(res)
        wx.hideLoading()
      }
    })
  })
}
// 添加购物车
const addCart = (item, fn) => {
  let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
  let seller_id = []
  cart instanceof Array && cart.forEach((item) => {
    seller_id.push(item.seller.id)
  })
  let index = seller_id.indexOf(item.seller.id)
  if (index === -1) {
    let list = []
    list.push(item.goods)
    cart.push({
      seller: item.seller,
      list,
      total: 1,
      totalMoney: item.goods.price,
      check: true
    })
  } else {
    cart[index].total++
      let cart_list = cart[index].list
    let flag = []
    cart_list instanceof Array && cart_list.forEach((item) => {
      flag.push(item.id)
    })
    if (flag.indexOf(item.goods.id) === -1) {
      cart[index].list.push(item.goods)
    } else {
      cart[index].list[flag.indexOf(item.goods.id)].num++
    }
  }
  // console.log(item, cart)
  wx.setStorage({
    key: 'cart',
    data: cart,
    success: () => {
      fn && fn()
    }
  })
}
// getCartNum
const getCartNum = () => {
  let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
  let num = 0
  cart.forEach((item) => {
    item.list && item.list.forEach(goods => {
      num += goods.num
    })
  })
  return num
}
// 设置购物车小红点
const setBadge = () => {
  let num = getCartNum()
  if (num > 0) {
    wx.setTabBarBadge({
      index: 2,
      text: `${num}` // num转换string
    })
  } else {
    wx.removeTabBarBadge({
      index: 2
    })
  }
}
// 判断对象是否相同
const diff = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}
// 判断是否用户授权
const hasUserInfo = () => {
  wx.getSetting({
    success: res => {
      if (!res.authSetting['scope.userInfo']) {
        wx.setStorageSync('prePage', `/${getCurrentPages()[0].route}`)
        wx.reLaunch({
          url: '/pages/wxLogin/wxLogin',
        })
      }
    }
  })
}
module.exports = {
  formatTime,
  getUserLocation,
  getLocation,
  addCart,
  setBadge,
  diff,
  hasUserInfo,
  getCartNum
}