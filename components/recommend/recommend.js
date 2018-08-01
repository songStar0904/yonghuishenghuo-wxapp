// components/recommend/recommed.js
let goodsData = require('../../libs/goodsData.js')
Component({
  externalClasses: ['recommend-box'],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    goods: goodsData
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addCart: function(cart) {
      this.triggerEvent('addCart', cart)
    }
  }
})
