// pages/address/address.js
let city = require('../../libs/cityData.js')
let addressData = require('../../libs/addressData.js')
let verifiction = require('../../utils/verifiction.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      userName: '',
      phone: '',
      city: '深圳',
      address1: '',
      address2: '',
      tag: []
    },
    tag: [{
      value: '家',
      checked: false
    }, {
      value: '公司',
      checked: false
    }],
    rules: {
      userName: [{
        required: true,
        msg: '收货人不能为空!'
      }, {
        max: 5,
        msg: '收货人不能大于5个字符'
      }],
      phone: [{
        required: true,
        msg: '手机号不能为空!'
      }, {
        phone: true,
        msg: '请输入正确手机号!'
      }],
      city: [{
        required: true,
        msg: '城市不能为空!'
      }],
      address1: [{
        required: true,
        msg: '地址不能为空!'
      }],
      address2: [{
        required: true,
        msg: '楼号-门牌号不能为空!'
      }]
    },
    showModal: false, // 是否打开modal
    showSheet: false, // 是否打开sheet
    newTag: '',
    limit: 5, // tag最多限制
    id: null,
    city
  },
  // 获得address
  getAddress: function(id) {
    let address = addressData.filter(item => {
      return item.id == id
    })[0] || {}
    address.tag && this.setTag(address.tag)
    this.setData({
      address,
      id
    })
  },
  // 设置tag
  setTag: function(t) {
    let {tags} = this.data
    t.forEach(item => {
      let flag = false
      for (let i = 0; i < tags.length; i++) {
        if (item == tags[i].value) {
          tags[i].checked = true
          flag = true
          break
        }
      }!flag && tags.push({
        value: item,
        checked: true
      })
    })
    this.setData({
      tag: tags
    })
  },
  formSubmit: function(e) {
    let data = e.detail.value
    let {rules, tag, id} = this.data
    if (verifiction(rules, data)) {
      let tag = tag
      data.tag = []
      tag.forEach(item => {
        item.checked && data.tag.push(item.value)
      })
      console.log('form发生了submit事件，携带数据为：', data)
      // 此处修改添加地址
      let title
      if (id) {
        // 修改
        title = '修改地址'
      } else {
        // 添加
        title = '添加地址'
      }
      wx.navigateBack({
        delta: 1,
        success: () => {
          wx.showToast({
            title,
          })
        }
      })
    }

  },
  // 打开sheet
  showSheet: function() {
    this.setData({
      showSheet: true
    })
  },
  // 选择城市
  selectCity: function(e) {
    let {address} = this.data
    address.city = e.detail.name
    this.setData({
      address,
      showSheet: false
    })
  },
  // 选择标签
  checkTag: function(e) {
    let checked = !e.currentTarget.dataset.checked
    let {idx} = e.currentTarget.dataset
    let {tag} = this.data
    tag[idx].checked = checked
    this.setData({
      tag
    })
  },
  //添加标签
  addTag: function() {
    this.setData({
      showModal: true
    })
  },
  // 关闭modal
  onModalCancel: function() {
    this.setData({
      showModal: false
    })
  },
  // 确认添加tag
  onModalConfirm: function() {
    let {newTag, tag} = this.data
    let length = newTag.length
    if (length <= 0) {
      this.onModalCancel()
    } else if (length <= 4) {
      tag.push({
        value: newTag,
        checked: true
      })
      this.setData({
        tag,
        newTag: '',
        showModal: false
      })
    } else {
      wx.showToast({
        title: '标签最多4个字符',
        icon: 'none'
      })
    }
  },
  // 监听设置新标签
  setNewTag: function(e) {
    this.setData({
      newTag: e.detail.value
    })
  },
  // 获得手机号码
  getPhoneNumber: function(e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    options.id && this.getAddress(options.id)
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