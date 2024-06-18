import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'teams',
      path: '/teams',
      components: { default: TeamsList, footer: TeamsFooter },
      children: [
        {
          name: 'team-members',
          path: ':teamId',
          component: TeamMembers,
        },
      ],
    },
    {
      path: '/users',
      components: {
        default: UsersList,
        footer: UsersFooter,
        },
        beforeEnter(to, from, next) {
            console.log(to, from, next)
            next();
         }
    },
    {
      path: '/',
      redirect: '/teams',
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    console.log(to, from, savedPosition);
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});
router.beforeEach(function (to, from, next) {
  console.log(to, from, next);
  //   if (to.name === 'team-members') {
  //     next();
  //   } else {
  //     next({ name: 'team-members', params: { teamId: 't2' } });
    //   }
    next();
});

const app = createApp(App);
app.use(router);
app.mount('#app');
