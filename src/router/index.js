import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddInstrumentView from "../views/AddInstrumentView.vue";
import AboutView from "../views/AboutView.vue";
import SearchInstrumentView from "../views/SearchInstrumentView.vue";
import InstrumentManagerView from "../views/InstrumentManagerView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/add-instrument",
    name: "add-instrument",
    component: AddInstrumentView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/search-instrument",
    name: "search-instrument",
    component: SearchInstrumentView,
  },
  {
    path: "/manage-instruments",
    name: "manage-instruments",
    component: InstrumentManagerView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
