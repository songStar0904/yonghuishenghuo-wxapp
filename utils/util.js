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
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  })
}
// 添加购物车
const addCart = (item) => {
  let cart = wx.getStorageSync('cart')
  let data
  let index = cart.indexOf(item.seller)
  if (index === -1) {
    let list = []
    list.push(item.goods)
    data = {
      seller: item.seller,
      list
    }
  } else {
    let flag = cart[index].list
    if (flag.indexOf(item.goods.id) === -1) {
      cart[index].list.push(item.goods)
    } else {
      cart[index].list[flag.indexOf(item.goods.id)].num++
    }
  }
  console.log(cart)
  wx.setStorage({
    key: 'cart',
    data: cart,
  })
}
module.exports = {
  formatTime,
  getLocation,
  addCart
}