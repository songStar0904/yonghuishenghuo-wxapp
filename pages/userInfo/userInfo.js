// pages/userInfo/userInfo.js
let verifiction = require('../../utils/verifiction.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      account: '15574406229',
      nick: wx.getStorageSync('userInfo').nickName,
      birthday: '',
      sex: '',
      email: ''
    },
    sex: [{
      name: 'man',
      value: '男'
    }, {
      name: 'woman',
      value: '女'
    }],
    rules:{
      nick: [{
        required: true,
        msg: '昵称不能为空!'
      }],
      sex: [{
        required: true,
        msg: '性别不能为空!'
      }],
      birthday: [{
        required: true,
        msg: '生日不能为空!'
      }],
      email: [{
        email: true,
        msg: '邮箱格式不正确!'
      }]
    }
  },
  bindDateChange: function(e) {
    // console.log(e.detail.value)
    let userInfo = this.data.userInfo
    userInfo.birthday = e.detail.value
    this.setData({
      userInfo
    })
  },
  selectSex: function(e) {
    // console.log(e.detail.value)
    let userInfo = this.data.userInfo
    userInfo.sex = e.detail.value
    this.setData({
      userInfo
    })
  },
  formSubmit: function (e) {
    let data = e.detail.value
    if (verifiction(this.data.rules, data)) {
      console.log(data)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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