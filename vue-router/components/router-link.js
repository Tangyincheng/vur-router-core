export default {
  // this 指代的是当前组件（插槽 分为具名插槽和默认插槽）
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String
    }
  },
  methods: {
    // 指定跳转的方法
    clickHandler() {
      // 调用$router 中的 push 方法进行跳转
      this.$router.push(this.to);
    }
  },
  render(h) {
    let tag = this.tag || 'a';
    return h(tag, {
      on: {
        click: this.clickHandler
      }
    }, this.$slots.default)
  }
};
