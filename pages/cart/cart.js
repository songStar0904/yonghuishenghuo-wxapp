// pages/cart/cart.js
let globalData = getApp().globalData
let {getLocation} = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '定位中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})