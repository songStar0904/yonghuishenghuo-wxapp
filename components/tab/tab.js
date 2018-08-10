// components/tab/tab.js
Component({
  relations: {
    '../tabs/tabs': {
      type: 'parent'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    key: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    dot: {
      type: Boolean,
      value: false
    },
    count: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: false,
    currentColor: '',
    scroll: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeCurrent(current) {
      this.setData({ current });
    },
    changeCurrentColor(currentColor) {
      this.setData({ currentColor });
    },
    changeScroll(scroll) {
      this.setData({ scroll });
    },
    handleClickItem() {
      const parent = this.getRelationNodes('../tabs/tabs')[0];
      parent.emitEvent(this.data.key);
    }
  }
})
