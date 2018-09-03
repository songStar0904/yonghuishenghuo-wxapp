// components/input-number/input-number.js
Component({
  externalClasses: ['i-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      value: 0
    },
    size: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change (e) {
      let {num} = e.currentTarget.dataset
      let value = this.data.value + num
      this.setData({
        value
      })
      this.triggerEvent('changeNumber', value)
    }
  }
})
