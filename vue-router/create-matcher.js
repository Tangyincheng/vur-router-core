import { createRouteMap } from './create-route-map';
import { createRoute } from './history/base';

export default function createMatcher(routes) {

  // routes 是用户自己匹配的 但是用起来不方便

  // pathList 会把所有的路由 组成一个数组 ['/', '/about', '/about/a', '/about/b']
  // pathMap {/: {}, /about: {}, /about/a: {}}
  let { pathList, pathMap } = createRouteMap(routes);

  console.log(pathMap, pathList)
  // 通过用户输入的路径 获取对应的匹配记录
  function match(location) {
    // 获取对应的记录
    let record = pathMap[location];
    return createRoute(record, {
      path: location
    })
  }

  // 动态添加路由
  function addRoutes(routes) {
    createRouteMap(routes, pathList, pathMap)
  }

  return {
    match,
    addRoutes
  }
}
