// 根据匹配到的记录 计算匹配到的所有记录
export const createRoute = (record, location) => {
  let matched = [];

  if (record) {
    while (record) {
      matched.unshift(record);
      // 通过当前的记录找到所有的父亲
      record = record.parent;
    }
  }

  return {
    ...location,
    matched
  }
}

const runQueue = (queue, iterator, complete) => {
  function next(index) {
    if (index >= queue.length) {
      return complete();
    }
    let hook = queue[index]
    iterator(hook, () => {
      next(index + 1)
    });
  }
  next(0)
}

// 这个current就是一个普通的变量 this.current ? 希望current变化了可以更新视图
export default class History {
  constructor(router) {
    this.router = router;

    // current 代表当前路径匹配的记录
    // / {path: '/', component:home}
    // /about/a {path: '/about', component: about}, {path: '/about/A', component: A}
    this.current = createRoute(null, {
      path: '/'
    })
    // this.current = {path: '/', matched: []}
  }

  transitionTo(location, complete) {
    // 获取当前路径匹配对应的记录，当路径变化时获取对应的记录 => 渲染页面（router-view实现）

    // 通过路径拿到对应的记录，有了记录之后就可以找到对象的匹配
    let current = this.router.match(location);
    // 需要调用 钩子函数
    let queue = this.router.beforeHooks;

    console.log('current', current)
    // 防止重复点击 不需要再次渲染
    // 匹配到的个数和路径都是相同的 就不需要再次跳转了
    if (this.current.path == location && this.current.matched.length === current.matched.length) {
      return;
    }

    const iterator = (hook, next) => {
      hook(current, this.current, next)
    }
    runQueue(queue, iterator, () => {
      // 用最新的匹配到的结果，去更新视图
      // 这个current只是响应式的，他的变化不会更新 _route
      this.current = current;
      this.cb && this.cb(current);

      // 当路径变化后，current属性会进行更新操作
      complete && complete();
    });
  }
  // 保存回调函数
  listen(cb) {
    this.cb = cb;
  }
}
