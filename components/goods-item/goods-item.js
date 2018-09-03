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
      let goods = e.currentTarget.dataset.item
      let cart = {
        seller: wx.getStorageSync('seller'),
        goods
      }
      cart.goods.num = 1
      cart.goods.check = true
      addCart(cart, () =>{
        wx.showToast({
          title: '添加成功',
        })
        this.triggerEvent('addCart', wx.getStorageSync('cart'))
      })
    },
    changeNum: function(value) {
      let {goods} = this.data
      let cart = {
        seller: wx.getStorageSync('seller'),
        goods
      }
      cart.goods.num = value.detail
      cart.goods.check = true
      addCart(cart, () => {
        this.triggerEvent('addCart', wx.getStorageSync('cart'))
      })
    }
  }
})