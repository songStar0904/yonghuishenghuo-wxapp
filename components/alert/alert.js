// components/alert/alert.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'info'
    },
    closable: {
      type: Boolean,
      value: false
    },
    showIcon: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    close: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTap() {
      this.setData({
        closed: !this.data.closed,
      });
      this.triggerEvent('close');
    },
  }
})
