// components/tag/tag.js
const defaultBgColor = '#f7f7f7'
const defaultColor = '#999'
const checkedColor = '#fff'
const watch = require('../../utils/watch.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    checkable: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: '#999'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStyle: function() {
      let style
      let color = this.data.color
      
      if (this.data.checked) {
        style = `background: ${color};color: ${checkedColor}`
      } else {
        style = `background: ${defaultBgColor};color: ${defaultColor}`
      }
      this.setData({
        style
      })
    }
  },
  attached: function() {
    let that = this
    this.setStyle()
    watch(this, {
      checked(newVal) {
        setTimeout(() => {
          that.setStyle()
        })
      }
    })
  },
  ready: function(){
    
  }
})
