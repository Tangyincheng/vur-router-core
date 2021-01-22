export default {
  name: 'router-view',
  functional: true, // 函数式组件 函数不用new 没有this 没有生命周期 没有data
  render(h, { parent, data }) {
    // this.$route 有matched属性 这个属性有几个就依次将它赋值到对应的router-view上
    // parent 是当前父组件
    // data 是这个组件上的一些表示

    let route = parent.$route;
    let depth = 0;

    data.routerView = true; // 标识路由属性

    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }

    let record = route.matched[depth];

    if (!record) {
      // 渲染一个空元素
      return h();
    }
    return h(record.component, data)
  }
}