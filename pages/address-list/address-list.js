// pages/address-list/address-list.js
let address = require('../../libs/addressData.js')
const mta = require('../../utils/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: []
  },
  getAddress: function() {
    this.setData({
      address
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mta.Page.init()
    this.getAddress()
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
  this.getAddress()
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