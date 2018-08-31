// pages/goods/goods.js
let goodsData = require('../../libs/goodsData.js')
let {formatPrice} = require('../../utils/util.js')
const mta = require('../../utils/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: {},
    gid: 0,
    showTab: false,
    showShare: false,
    shareImage: null, //分享卡片
    showCard: false,
    wechat: '../../images/wechat.jpg', //小程序码
    cardWidth: 275,
    imgWidth: 175
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mta.Event.stat("2000", {})
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
  // 关闭转发
  closeShare: function() {
    this.setData({
      showShare: false
    })
  },
  // 关闭转发卡片
  closeShareCard: function() {
    this.setData({
      showCard: false
    })
  },
  // 生成转发卡片
  eventDraw: function() {
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    let { goods, cardWidth, imgWidth} = this.data
    let {icon: sellerIcon} = wx.getStorageSync('seller')
    this.setData({
      showShare: false,
      painting: {
        width: cardWidth,
        height: 450,
        views: [
          {
            type: 'rect',
            background: '#fff',
            top: 0,
            left: 0,
            width: cardWidth,
            height: 450
          },
          {
            type: 'image',
            url: goods.icon[0],
            left: (cardWidth - imgWidth) / 2,
            top: 30,
            width: imgWidth,
            height: 150
          },
          {
            type: 'text',
            content: goods.name,
            textAlign: 'center',
            top: 200,
            left: cardWidth / 2
          },
          {
            type: 'text',
            content: `￥${formatPrice(goods.price)}`,
            textAlign: 'center',
            top: 230,
            left: cardWidth / 2,
            color: '#EE7942'
          },
          {
            type: 'image',
            url: sellerIcon,
            left: (cardWidth - 75) / 2,
            top: 260,
            width: 75,
            height: 20
          },
          {
            type: 'image',
            url: this.data.wechat,
            left: (cardWidth - 75) / 2,
            top: 300,
            width: 75,
            height: 75
          },
          {
            type: 'text',
            content: '长按图片识别小程序码',
            fontSize: 14,
            textAlign: 'center',
            top: 390,
            left: cardWidth / 2
          },
          {
            type: 'text',
            content: '*实际价格以页面展示为准',
            color: '#80848f',
            fontSize: 11,
            textAlign: 'center',
            top: 415,
            left: cardWidth / 2
          },
        ]
      }
    })
  },
  eventSave() {
    let that = this
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        that.closeShareCard()
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  eventGetImage(event) {
    console.log(event)
    wx.hideLoading()
    const { tempFilePath, errMsg } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath,
        showCard: true
      })
    } else {
      this.setData({
        showCard: true
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
    let goods = this.data.goods, currentPage = getCurrentPages()[getCurrentPages().length - 1]
    let path = `${currentPage.route}?id=${currentPage.options.id}`
    this.closeShare()
    return {
      title: `￥${formatPrice(goods.price)} | ${goods.name}`,
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