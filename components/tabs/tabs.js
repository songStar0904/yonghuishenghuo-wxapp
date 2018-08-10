// components/tabs/tabs.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  relations: {
    '../tab/index': {
      type: 'child',
      linked() {
        this.changeCurrent();
      },
      linkChanged() {
        this.changeCurrent();
      },
      unlinked() {
        this.changeCurrent();
      }
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {
    current: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    },
    color: {
      type: String,
      value: ''
    },
    scroll: {
      type: Boolean,
      value: false
    },
    fixed: {
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
    changeCurrent(val = this.data.current) {
      let items = this.getRelationNodes('../tab/index');
      const len = items.length;

      if (len > 0) {
        items.forEach(item => {
          item.changeScroll(this.data.scroll);
          item.changeCurrent(item.data.key === val);
          item.changeCurrentColor(this.data.color);
        });
      }
    },
    emitEvent(key) {
      this.triggerEvent('change', { key });
    }
  }
})
