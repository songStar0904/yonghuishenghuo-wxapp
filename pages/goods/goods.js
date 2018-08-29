// pages/goods/goods.js
let goodsData = require('../../libs/goodsData.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    gid: 0,
    showTab: false,
    showShare: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gid: this.options.id
    })
    wx.showShareMenu({
      withShareTicket: true
    })
   this.getGoods()
  },
  // 获得商品详情
  getGoods: function (){
    let goods
    let that = this
    goods = goodsData.filter(item => {
      return item.id == that.data.gid
    })[0]
    this.setData({
      goods
    })
  },
  // 打开转发
  openShare: function(){
    this.setData({
      showShare: true
    })
  },
  closeShare: function() {
    this.setData({
      showShare: false
    })
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
    let goods = this.data.goods, currentPage = getCurrentPages()[getCurrentPages().length - 1]
    let path = `${currentPage.route}?id=${currentPage.options.id}`
    this.closeShare()
    return {
      title: `￥${goods.price} | ${goods.name}`,
      path,
      imageUrl: goods.icon[0],
      success: function(res) {
        // console.log(res.shareTickets)
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function(res) {
            console.log(res)
          }
        })
      }
    }
  }
})