// components/seller-box/seller-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    seller: {
      type: Object,
      value: []
    },
    current_seller: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    open_seller_list: false,
    top: 0 // 下拉高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获得seller-list高度
    // getRect: function () {
    //   let that = this
    //   wx.createSelectorQuery().select('.seller-list').boundingClientRect(function (rect) {
    //     that.setData({
    //       top: rect.height
    //     })
    //     console.log(that.data.top)
    //   }).exec()
    // },
    // 开关商家列表
    openSeller: function() {
      this.setData({
        open_seller_list: !this.data.open_seller_list
      })
    },
    // 关闭list
    closeList: function() {
      this.setData({
        open_seller_list: false
      })
    },
    // 选择商家
    selectSeller: function(e) {
      let current_seller = e.currentTarget.dataset.item
      // 点击原商家 只关闭list
      if (current_seller.id === this.data.current_seller.id) {
        this.closeList()
        return
      }
      wx.setStorage({
        key: 'seller',
        data: current_seller
      })
      this.setData({
        open_seller_list: false,
        current_seller
      })
      this.triggerEvent('changeSeller', current_seller)
    },
  }
})