import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from './js/util'
import toast from '@/components/plugin/toast'

const app = createApp(App)

app
.use(store)
.use(router)
.use(util, {text: 'util'})
.use(toast)

// route v4.x changed (라우터가 많은 경우 로드가 완료 되는 시점에 앱이 활성화 되도록 처리)
async () => await router.isReady()

app.mount('#app')