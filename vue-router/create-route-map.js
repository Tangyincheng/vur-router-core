const addRouteRecord = (route, pathList, pathMap, parentRoute) => {
  // 根据当前路由产生一个记录 path/component
  let path = parentRoute ? `${parentRoute.path}/${route.path}` : route.path;
  let record = {
    path,
    component: route.component,
    parent: parentRoute
  }

  // 防止用户重复编写路由
  if (!pathMap[path]) {
    pathMap[path] = record;
    pathList.push(path);
  }

  // 将子路由也放到对应的pathMap和pathList中
  if (route.children) {
    route.children.forEach(r => {
      addRouteRecord(r, pathList, pathMap, route);
    })
  }
}

export function createRouteMap(routes, oldPathList, oldPathMap) {

  let pathList = oldPathList || [];
  let pathMap = oldPathMap || {};

  routes.forEach(route => {
    addRouteRecord(route, pathList, pathMap);
  });
  return {
    pathList,
    pathMap
  }
}
