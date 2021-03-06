// pages/mall/mall.js
var globalData = getApp().globalData
let getGoods = require('../../utils/getGoods.js')
let breed = require('../../libs/breedData.js')
let sellerData = require('../../libs/sellerData.js')
const mta = require('../../utils/mta_analysis.js');
let {
  getLocation,
  getUserLocation,
  setBadge
} = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: '定位中...',
    userLocation: false,
    seller: sellerData,
    current_seller: wx.getStorageSync('seller'),
    current_breed_list: undefined,
    current_breed: {},
    breed,
    goods: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mta.Page.init()
  },
  // 获得地理位置
  getLocation: function() {
    if (globalData.address) {
      this.setAddress(globalData.address)
      this.setSeller()
    } else {
      let that = this
      getUserLocation().then((userLocation) => {
        getLocation().then(address => {
          this.setAddress(address)
          this.setSeller()
        }).catch(res => {
          that.setData({
            userLocation: false
          })
        })
      })
    }
  },
  // 设置地理位置
  setAddress: function(address) {
    this.setData({
      address,
      userLocation: true
    })
  },
  // 设置选择的商家
  setSeller: function() {
    if (wx.getStorageSync('seller') == '') {
      wx.setStorage({
        key: 'seller',
        data: this.data.seller[0],
        success: (res) => {
          this.setData({
            current_seller: wx.getStorageSync('seller')
          })
          this.changeBreed()
        }
      })
    } else {
      this.setData({
        current_seller: wx.getStorageSync('seller')
      })
      this.changeBreed()
    }
  },
  // 跳转搜索
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 添加购物车
  changeCart: function(cart) {
    setBadge()
  },
  // 获取商品
  getGoods: function() {
    wx.showLoading({
      title: '拼命加载中...',
    })
    let that = this
    setTimeout(() => {
      let goods = getGoods()
      that.setData({
        goods
      })
      wx.hideLoading()
    }, 500)
  },
  // 改变品种
  changeBreed: function() {
    console.log(this.data.current_seller.id)
    let breed = this.data.breed.filter((item) => {
      return item.sid === this.data.current_seller.id
    })

    // wx.setStorageSync('seller', breed[0])
    let current_breed_list = breed[0].list
    this.setData({
      current_breed_list
    })
    this.setData({
      current_breed: current_breed_list[0]
    })
    this.getGoods()
  },
  // 选择品种
  chooseBreed: function(e) {
    let breed = e.currentTarget.dataset.item
    this.setData({
      current_breed: breed
    })
    this.getGoods()
  },
  // 选择商家
  changeSeller: function(e) {
    this.setData({
      current_seller: e.detail
    })
    this.changeBreed()
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
    if (!this.data.userLocation) {
      this.getLocation()
    }
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