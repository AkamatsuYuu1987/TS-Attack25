import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store/index';

createApp(App).use(store).mount('#app');
// ストアの初期化後、初期ドメインエンティティ生成アクションを実行
store.dispatch('InitializationServiceModule/initializeApp'); 
