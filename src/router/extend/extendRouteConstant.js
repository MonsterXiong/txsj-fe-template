const commonRouteConstant = {
  HOME: {
    path: '/',
    name: 'Home',
  },
  REDIRECT: {
    path: '/redirect',
    name: 'Redirect',
  },
  LOGIN: {
    path: '/login',
    name: 'login',
  },
  // 404
  NOT_FOUNT: {
    path: '*',
    name: 'notFound',
  },
}

const extendRouteConstant = {
  ...commonRouteConstant,
  WELCOME: {
    path: '/welcome',
    name: 'Welcome',
  },
}

export default extendRouteConstant