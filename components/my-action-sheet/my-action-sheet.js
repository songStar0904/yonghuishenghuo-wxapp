// components/my-action-sheet/my-action-sheet.js
let watch = require('../../utils/watch.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showSheet: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationData: {}
  },
  ready: function() {
    watch(this, {
      showSheet (newVal) {
        this.setAnimation()
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭sheet
    close: function() {
      this.setData({
        showSheet: false
      })
    },
    setAnimation: function() {
      let showSheet = this.data.showSheet
      /* 动画部分 */
      // 第1步：创建动画实例 
      var animation = wx.createAnimation({
        duration: 300, //动画时长
        timingFunction: "ease-in-out", //线性
        delay: 0 //0则不延迟
      });
      // 第2步：这个动画实例赋给当前的动画实例
      this.animation = animation;

      // 第3步：执行第一组动画：Y轴偏移240px后(盒子高度是240px)，停
      animation.translateY(600).step();

      // 第4步：导出动画对象赋给数据对象储存
      this.setData({
        animationData: animation.export()
      })
      // 第5步：设置定时器到指定时候后，执行第二组动画
      setTimeout(function() {
        // 执行第二组动画：Y轴不偏移，停
        animation.translateY(0).step()
        // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象
        this.setData({
          animationData: animation
        })

    
      }.bind(this), 200)

      
    }
  }
})