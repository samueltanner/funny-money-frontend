import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import HomePage from "../views/HomePage.vue";
import Test from "../views/Test.vue";
import TransactionsNew from "../views/TransactionsNew.vue";
import Groups from "../views/Groups.vue";
import GroupsNew from "../views/GroupsNew.vue";
import GroupsShow from "../views/GroupsShow.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "#/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "#/login",
    name: "login",
    component: Login,
  },
  {
    path: "#/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "#/homepage",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "#/test",
    name: "test",
    component: Test,
  },
  {
    path: "#/transactions/new",
    name: "transactions-new",
    component: TransactionsNew,
  },
  {
    path: "#/groups",
    name: "groups",
    component: Groups,
  },
  {
    path: "#/groups/new",
    name: "groups-new",
    component: GroupsNew,
  },
  {
    path: "#/groups/:id",
    name: "groups-show",
    component: GroupsShow,
  },

];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
