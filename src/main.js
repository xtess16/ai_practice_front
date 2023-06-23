import { createApp } from 'vue'
import components from "@/components/UI";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from '@/router'
import store from './store'

const app = createApp(App)

components.forEach((component) => {
    app.component(component.name, component);
});

app.use(router)
app.use(ElementPlus)
app.use(store)
app.mount('#app')
