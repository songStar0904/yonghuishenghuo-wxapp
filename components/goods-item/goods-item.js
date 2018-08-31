// components/goods-item/goods-item.js
let globalData = getApp().globalData
let {
  addCart
} = require('../../utils/util.js')
Component({
  externalClasses: ['goods-item'],
  /**
   * 组件的属性列表
   */
  properties: {
    size: String,
    goods: Object
  },

  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    addCart: function(e) {
      let that = this, goods = e.currentTarget.dataset.item
      let cart = {
        seller: wx.getStorageSync('seller'),
        goods
      }
      cart.goods.num = 1
      cart.goods.check = true
      addCart(cart, function() {
        wx.showToast({
          title: '添加成功',
        })
        that.triggerEvent('addCart', wx.getStorageSync('cart'))
      })

    }
  }
})