export const routes = [
  { path: '/', redirect: '/louvores' },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'louvores',
        children: [
          {
            path: '',
            component: () => import('@/pages/louvores.vue'),
            meta: { title: 'Louvores', tab: 'louvores' },
          },
          {
            path: 'selecao-semana',
            component: () => import('@/pages/louvores.vue'),
            meta: { title: 'Selecão da Semana', tab: 'selecao-semana' },
          },
          {
            path: 'cadastro',
            children: [
              {
                path: '',
                component: () => import('@/views/louvores/cadastro_router.vue'),
                meta: { title: 'Cadastro', tab: 'cadastro' },
              },
              {
                path: ':id',
                component: () => import('@/views/louvores/cadastro_router.vue'),
                meta: { title: 'Editar Cadastro' },
                props: true,
              },
            ],
          },

        ],

      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
        meta: { title: 'Error' },
      },
    ],
  },
]
