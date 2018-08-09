// components/tab-bar/tab-bar.js
let {
  addCart
} = require('../../utils/util.js')
Component({
  externalClasses: ['tab-bar'],
  /**
   * 组件的属性列表
   */
  properties: {
    gid: Number,
    goods: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    cart: [],
    current_cart: {},
    seller: wx.getStorageSync('seller'),
    cartNum: 0,
    total: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 判断本商品是否加入购物车
    isAddCart: function() {
      let cart = this.data.current_cart
      if (!cart) {
        this.setData({
          cartNum: 0
        })
      } else {
        let goods = cart.list.filter(item => {
          return item.id === +this.properties.gid
        })
        let cartNum = 0
        if (goods.length > 0) {
          cartNum = goods[0].num
        }
        this.setData({
          cartNum
        })
      }
    },
    // 添加购物车
    addCart: function() {
      let goods = this.properties.goods
      goods.num = 1
      let cart = {
        goods,
        seller: this.data.seller
      }
      addCart(cart, () => {
        this.setData({
          cartNum: 1,
          total: this.data.total + 1
        })
      })
    },
    // 改变cartNum
    changeNum: function(e) {
      let gid = this.properties.gid
      let that = this
      let num = e.currentTarget.dataset.type == 'add' ? 1 : -1
      let cartNum = this.data.cartNum + num
      let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
      let sid = this.data.seller.id
      cart.forEach((item, index) => {
        if (item.seller.id === sid) {
          item.total += num
          item.list.forEach((goods, i) => {
            if (goods.id === gid) {
              if (cartNum <= 0) {
                cart = that.delItem(index, i)
              } else {
                goods.num = cartNum
              }
            }
          })
        }
      })
      wx.setStorage({
        key: 'cart',
        data: cart,
        success: () => {
          that.setData({
            cartNum,
            cart: cart[0],
            total: this.data.total + num
          })
        }
      })
    },
    // 删除选中商品
    delItem: function(sidx, gidx) {
      let cart = JSON.parse(JSON.stringify(wx.getStorageSync('cart')))
      let length = cart[sidx].list.length
      // 如果只有一个商品， 直接删除店家card
      if (length <= 1) {
        cart.splice(sidx, 1)
      } else {
        cart[sidx].list.splice(gidx, 1)
      }
      return cart
    },
    // 设置total
    setTotal: function() {
      let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
      let total = 0
      cart.forEach(item => {
        item.list.forEach(goods => {
          total += goods.num
        })
      })
      this.setData({
        total
      })
    }
  },

  attached: function() {
    let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
    let seller = this.data.seller
    let current_cart = cart.filter((item, index) => {
      return item.seller.id === seller.id
    })[0]
    this.setData({
      cart: cart[0],
      current_cart
    })
    this.setTotal()
  },
  ready: function() {
    this.isAddCart()
  }
})