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
    cartNum: 0
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
        if (goods) {
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
          cartNum: 1
        })
      })
    },
    // 改变cartNum
    changeNum: function(e) {
      let gid = this.properties.gid
      let that = this
      let cartNum = this.data.cartNum
      if (e.currentTarget.dataset.type === 'add') {
        cartNum++
      } else {
        cartNum--
      }
      let cart = this.data.cart
      let sid = this.data.seller.id
      cart.forEach((goods, index) => {
        if (goods.seller.id === sid) {
          goods.list.forEach((item, i) => {
            if (item.id === gid) {
              if (cartNum <= 0) {
                cart = that.delItem(index, i)
              } else {
                item.num = cartNum
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
            cartNum
          })
        }
      })
    },
    // 删除选中商品
    delItem: function(sidx, gidx) {
      let cart = JSON.parse(JSON.stringify(this.data.cart))
      let length = cart[sidx].list.length
      // 如果只有一个商品， 直接删除店家card
      if (length <= 1) {
        cart.splice(sidx, 1)
      } else {
        cart[sidx].list.splice(gidx, 1)
      }
      return cart
    }
  },

  attached: function() {
    let cart = wx.getStorageSync('cart') ? wx.getStorageSync('cart') : []
    let seller = this.data.seller
    let current_cart = cart.filter((item, index) => {
      return item.seller.id === seller.id
    })[0]
    this.setData({
      cart,
      current_cart
    })
  },
  ready: function() {
    this.isAddCart()
  }
})