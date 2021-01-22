import routerLink from './components/router-link';
import routerView from './components/router-view';

export let Vue;

const install = function (_Vue) {
  // install 方法内部一般会用他来定义一些全局的内容：指令、全局组件、给原型扩展方法
  Vue = _Vue;

  Vue.component('router-link', routerLink);
  Vue.component('router-view', routerView);

  // 用户将router属性注册到了new Vue
  // 希望每个子组件 都可以获取到router属性

  Vue.mixin({
    // mixin 可以给beforeCreate 这个生命周期增加合并的方法
    beforeCreate() {
      // 如果有 router 说明在根实例上增加了router 当前这个实例是根实例
      // 渲染流程先父后子，渲染完毕 先子后父
      if (this.$options.router) {
        // 根
        this._routerRoot = this; // 将当前根实例放到了 _routerRoot
        this._router = this.$options.router;
        // 当前用户的router属性
        this._router.init(this); // 调用插件中的init 方法
        // 如果用户更改了 current 是没有效果的， 需要把 _route 也进行更新
        Vue.util.defineReactive(this, "_route", this._router.history.current)
      } else {
        // 子
        // 这里所有的组件都拥有了 this._routerRoot 属性
        this._routerRoot = this.$options && this.$parent._routerRoot;
      }
    }
  });

  Object.defineProperty(Vue.prototype, '$route', { // 存放的都是属性 path matched
    get() {
      // 取current
      return this._routerRoot && this._routerRoot._route;
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get() {
      return this._routerRoot && this._routerRoot._router;
    }
  })
}

export default install;