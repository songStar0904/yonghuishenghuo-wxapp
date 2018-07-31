// pages/cart/cart.js
let globalData = getApp().globalData
let {
  getLocation,
  setBadge,
  diff
} = require('../../utils/util.js')
let {
  watch
} = require('../../utils/watch.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '定位中...',
    cart: wx.getStorageSync('cart')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    watch(this, {
      cart(newVal) {
        wx.setStorage({
          key: 'cart',
          data: newVal,
          success: () => {
            setBadge()
          }
        })
      }
    })
    if (globalData.address) {
      this.setData({
        address: globalData.address
      })
    } else {
      getLocation().then((address) => {
        this.setData({
          address
        })
      })
    }

  },
  // 流程
  init: function() {
    this.getTotalMoney()
    this.setAllCheck()
  },
  // 设置cart
  setCart: function(cart) {
    this.setData({
      cart
    })
  },
  // 改变cart
  changeCart: function() {
    this.setData({
      cart: wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
    })
    this.getTotalMoney()
  },
  // 增加数量
  addNum: function(e) {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    let dataset = e.currentTarget.dataset
    cart[dataset.sidx].list[dataset.gidx].num = cart[dataset.sidx].list[dataset.gidx].num + 1
    this.setCart(cart)
    this.getTotalMoney()
  },
  // 减少数量
  minusNum: function(e) {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    let dataset = e.currentTarget.dataset
    let num = cart[dataset.sidx].list[dataset.gidx].num
    let that = this
    if (num <= 1) {
      wx.showModal({
        title: '确认删除选中商品？',
        content: '',
        cancelColor: '#999',
        confirmText: '确认删除',
        confirmColor: '#FF6347',
        success: (res) => {
          if (res.confirm) {
            that.delItem(dataset.sidx, dataset.gidx)
          }
        }
      })
      return
    }
    cart[dataset.sidx].list[dataset.gidx].num = num - 1
    this.setCart(cart)
    this.getTotalMoney()
  },
  // 删除选中商品
  delItem: function(sidx, gidx) {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    let length = cart[sidx].list.length
    // 如果只有一个商品， 直接删除店家card
    if (length <= 1) {
      cart.splice(sidx, 1)
    } else {
      cart[sidx].list.splice(gidx, 1)
    }
    this.setCart(cart)
    this.getTotalMoney()
  },
  // 单选事件
  checkItem: function(e) {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    cart[e.currentTarget.dataset.sidx].list[e.currentTarget.dataset.gidx].check = !cart[e.currentTarget.dataset.sidx].list[e.currentTarget.dataset.gidx].check
    // console.log(cart)
    this.setCart(cart)
    this.getTotalMoney()
    this.setAllCheck()
  },
  // 全选事件
  allCheck: function(e) {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    let flag = !cart[e.currentTarget.dataset.sidx].check
    cart[e.currentTarget.dataset.sidx].check = flag
    cart[e.currentTarget.dataset.sidx].list.forEach((item, index) => {
      cart[e.currentTarget.dataset.sidx].list[index].check = flag
    })
    this.setCart(cart)
    this.getTotalMoney()

  },
  // 是否全选
  setAllCheck: function() {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    cart.forEach((item, index) => {
      let flag = true
      let goods = item.list
      for (let i = 0; i < goods.length; i++) {
        if (!goods[i].check) {
          flag = false
          break
        }
      }
      cart[index].check = flag
    })
    this.setCart(cart)
  },
  // 计算价格
  getTotalMoney: function() {
    let cart = JSON.parse(JSON.stringify(this.data.cart))
    cart.forEach((item, index) => {
      let totalMoney = 0,
        total = 0
      item.list.forEach((goods, i) => {
        if (goods.check) {
          total += goods.num
          totalMoney += goods.price * goods.num
        }
      })
      cart[index].totalMoney = totalMoney
      cart[index].total = total
    })
    // console.log(cart)
    this.setCart(cart)
    // console.log(this.data.cart[1].totalMoney)
  },
  // 跳转mall页面
  toMall: function () {
    wx.switchTab({
      url: '/pages/mall/mall'
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.changeCart()
    if (this.data.cart.length > 0) {
      this.init()
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})