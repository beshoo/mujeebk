import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Cards from "../views/Cards.vue";
import Qrscane from "../views/Qrscane.vue";
import trees from "../components/trees.vue";
import answerBox from "../views/answerBox.vue";
import howToUse from '../views/howToUse.vue'
import test from '../views/test.vue'
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/cards",
    name: "Cards",
    component: Cards
  },
  {
    path: "/mujeebk_web",
    name: "Mujeebk Web",
    component: Qrscane
  },
  {
    path: "/trees/:id",
    name: "Trees",
    component: trees
  },
  {
    path: "/box",
    name: "box",
    component: answerBox
  },
  {
    path: '/how-to-use',
    component: howToUse
  },
  {
    path: '/test',
    component: test
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
