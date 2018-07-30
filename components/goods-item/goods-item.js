// components/goods-item/goods-item.js
let globalData = getApp().globalData
let {addCart} = require('../../utils/util.js')
Component({
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
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addCart: (e) => {
      let cart = {
        seller: wx.getStorageSync('seller'),
        goods: e.currentTarget.dataset.item
      }
      cart.goods.num = 1
      cart.goods.check = true
      addCart(cart)
    }
  }
})
