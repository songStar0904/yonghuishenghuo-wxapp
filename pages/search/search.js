// pages/search/search.js
import getGoods from '../../utils/getGoods.js'
let {getCartNum} = require('../../utils/util.js')
let sellerData = require('../../libs/sellerData.js')
const mta = require('../../utils/mta_analysis.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: '',
    history: wx.getStorageSync('history_search') || [],
    goods: [],
    isGetGoods: false,
    cartNum: 0,
    seller: sellerData,
    current_seller: wx.getStorageSync('seller')
  },
  // 监听input
  changeInput: function(e) {
    this.setData({
      isGetGoods: false,
      search: e.detail.value
    })
  },
  // 设置search
  setSearch: function(search) {
    this.setData({
      search
    })
  },
  // 清除search
  clearSearch: function() {
    this.setSearch('')
  },
  getSearch: function(e) {
    this.setData({
      isGetGoods: false
    })
    let search = e ? e.target.dataset.search : this.data.search
    this.setSearch(search)
    this.getGoods()
  },
  // 获得商品
  getGoods: function() {
    let {search, current_seller} = this.data
    // request
    wx.showLoading({
      title: '正在搜索...'
    })
    setTimeout(() => {
      let goods = getGoods()
      this.setData({
        goods,
        isGetGoods: true
      })
      this.addHistory(search)
      wx.hideLoading()
    }, 500)
  },
  // 添加histtory
  addHistory: function(search) {
    if (!search) {
      return
    }
    let {history} = this.data
    let that = this
    for(let i in history) {
      if (history[i] == search) {
        history.splice(i, 1)
        break;
      }
    }
    history.unshift(search)
    console.log(search, history)
    wx.setStorage({
      key: 'history_search',
      data: history,
      success: function() {
        that.setData({
          history
        })
      }
    })
  },
  // 删除history
  clearHistory: function() {
    let that = this
    wx.showModal({
      content: '确认删除所有记录？',
      confirmText: '确认删除',
      confirmColor: '#EE7942',
      success: function(e) {
        if (e.confirm) {
          that.setData({
            history: []
          })
          wx.removeStorageSync('history_search')
        } else if (e.cancel) {
          console.log('取消删除')
        }
      }
    })  
  },
  // 取消搜索
  cancel: function() {
    wx.navigateBack()
  },
  // 添加购物车
  changeCart: function() {
    let cartNum = getCartNum()
    this.setData({
      cartNum
    })
  },
  changeSeller: function(e) {
    this.setData({
      current_seller: e.detail
    })
    this.getGoods()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    mta.Page.init()
    let cartNum = getCartNum()
    this.setData({
      cartNum
    })
    // 设置选择的商家
    if (wx.getStorageSync('seller') == '') {
      wx.setStorage({
        key: 'seller',
        data: this.data.seller[0],
        success: (res) => {
          this.setData({
            current_seller: wx.getStorageSync('seller')
          })
        }
      })
    } else {
      this.setData({
        current_seller: wx.getStorageSync('seller')
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