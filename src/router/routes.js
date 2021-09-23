const routes = [
  {
    path: '/',
    meta: {
      restrict: true
    },
    component: () => import('layouts/MainLayout'),
    children: [
      {
        path: '',
        redirect: '/im'
      },
      {
        path: '/im',
        name: 'im',
        meta: {
          restrict: true
        },
        component: () => import('pages/Index')
      },
      {
        path: '/contacts',
        name: 'contacts',
        meta: {
          restrict: true
        },
        component: () => import('pages/Contacts')
      },
      {
        path: '/apps',
        name: 'apps',
        meta: {
          restrict: true
        },
        component: () => import('pages/Apps')
      },
      {
        path: '/profile',
        name: 'profile',
        meta: {
          restrict: true
        },
        component: () => import('pages/Profile')
      }
    ]
  },
  {
    name: 'search',
    path: '/search',
    meta: {
      restrict: true
    },
    component: () => import('pages/Search')
  },
  {
    name: 'friends',
    path: '/friends',
    meta: {
      restrict: true
    },
    component: () => import('pages/Friends')
  },
  {
    name: 'edit',
    path: '/edit',
    meta: {
      restrict: true
    },
    component: () => import('pages/Edit')
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('pages/Login')
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
