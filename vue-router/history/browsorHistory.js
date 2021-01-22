import History from './base';


export default class BrowserHistory extends History {

  constructor(router) {
    super(router);
    this.router = router;
  }

  getCurrentLocation() {
    return window.location.pathname;
  }

  setupListener() {
    // 监听路由的前后跳转
    window.addEventListener('popstate', () => {
      this.transitionTo(this.getCurrentLocation());
    })
  }
}
