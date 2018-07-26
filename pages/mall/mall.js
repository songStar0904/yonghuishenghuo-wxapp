// pages/mall/mall.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '定位中。。。',
    seller: [{
      id: 1,
      name: '永辉超市',
      icon: '../../images/seller_1.jpg',
      address: 651,
      min: 30
    }, {
      id: 2,
      name: '蛙鱼工坊',
      icon: '../../images/seller_2.jpg',
      address: 1200,
      min: 60
    }],
    current_seller: {
      id: 1,
      name: '永辉超市',
      icon: '../../images/seller_1.jpg'
    },
    open_seller_list: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.authorize({
      scope: 'scope.userLocation',
      success: (res) => {
        this.getLocation()
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  // 开关商家列表
  openSeller: function() {
    this.setData({
      open_seller_list: !this.data.open_seller_list
    })
  },
  // 选择商家
  selectSeller: function(e) {
    this.setData({
      current_seller: e.currentTarget.dataset.item,
      open_seller_list: false
    })
  },
  getLocation: function() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {

        let latitude = res.latitude
        let longitude = res.longitude
        let ak = 'zcbTavuSRgQKQB9GyqZZRGYOoBht2RAP'
        console.log(res)
        wx.request({
          url: `https://api.map.baidu.com/geocoder/v2/?ak=${ak}&location=${latitude},${longitude}&output=json`,
          success: (res) => {
            console.log(res)
            let address = res.data.result.addressComponent
            let data = address.district + address.street + address.street_number;
            data = that.formateAddress(data)
            that.setData({
              address: data
            })
          },
          fail: (res) => {
            console.log(res)
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  formateAddress: (data) => {
    if (data.length > 9) {
      data = data.substring(0, 9)
      return `${data}...`
    }
    return data
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