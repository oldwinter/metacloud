import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')


// import { registerMicroApps, start } from 'qiankun';

// registerMicroApps([
//   {
//     name: 'react app', // app name registered
//     entry: '//localhost:8080',
//     container: '#yourContainer',
//     activeRule: ()=>{return true},
//   },
//   {
//     name: 'vue app',
//     entry:'//localhost:8081',
//     container: '#yourContainer2',
//     activeRule: ()=>{return true},
//   },
// ]);

// start();