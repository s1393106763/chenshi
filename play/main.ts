import { createApp } from 'vue';
import App from './app.vue';
import chenshi from '@chenshi/components';
const app = createApp(App);
app.use(chenshi);
app.mount('#app');
