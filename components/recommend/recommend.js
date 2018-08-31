// components/recommend/recommed.js
Component({
  externalClasses: ['recommend-box'],
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Object,
      value: []
    }
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
    addCart: function(cart) {
      this.triggerEvent('addCart', cart)
    }
  }
})
