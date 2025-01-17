import { createApp } from "vue"; // Импорт метода для создания приложения
import App from "./App.vue"; // Импорт главного компонента
import router from "./router"; // Маршрутизация
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router); // Подключение маршрутизации
app.use(Toast, { position: "bottom-right" });
app.mount("#app"); // Привязка экземпляра приложения к странице HTML (находится в public)
