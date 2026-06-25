import { createApp } from 'vue'
import './style.css';

import App from './App.vue'
import Antd from 'antdv-next'
import router from './router'
import pinia from './stores'

const app = createApp(App)

import VxeUIBase from 'vxe-pc-ui'
import 'vxe-pc-ui/es/style.css'
import 'vxe-pc-ui/lib/style.css'
import VxeUITable from 'vxe-table'
import 'vxe-table/es/style.css'
import "./assets/css/vxe.css"

app.use(pinia)
   .use(router)
   .use(Antd)
    .use(VxeUIBase)
    .use(VxeUITable)
   .mount('#app')
