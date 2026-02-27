import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";
import router from "./router/router";
import { useThemeStore } from "@/stores/themeStore";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Initialize theme store after Pinia is available
const themeStore = useThemeStore();
themeStore.initializeTheme();

app.mount("#app");
