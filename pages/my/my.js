// pages/my.js
let {
  setBadge,
  hasUserInfo
} = require('../../utils/util.js')
let goods = require('../../libs/goodsData.js')
import tap from '../../template/title-icon-navigate/title-icon-navigate.js'
const mta = require('../../utils/mta_analysis.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    setData: [{
      title: '地址管理',
      icon: '../../images/address.png',
      type: 'url',
      data: '/pages/address-list/address-list'
    }, {
      title: '联系客服',
      icon: '../../images/hot_line.png',
      type: 'phone',
      data: '15574406229',
      note: "服务时间：9：00-20：00"
    }, {
      title: '意见反馈',
      icon: '../../images/feedback.png',
      type: 'feedback'
    }, {
      title: '永辉生活APP',
      icon: '../../images/download.png',
      note: '下载享优质购物体验'
    }, {
      title: '版本号',
      icon: '../../images/version.png',
      note: '永辉生活小程序 V4.17.0.3',
      no_arrow: true
    }],
    goods
  },
  // 添加购物车
  changeCart: function(cart) {
    setBadge()
  },
  // 跳转页面
  tap,
  toUserInfo: function() {
    wx.navigateTo({
      url: '/pages/userInfo/userInfo',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mta.Page.init()
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
    hasUserInfo()
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