import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  position: POSITION.TOP_RIGHT,
  timeout: 4000,
  draggable: true,
  closeOnClick: true,
};

const app = createApp(App);

app.use(router);
app.use(Toast, options);

app.mount("#app");
