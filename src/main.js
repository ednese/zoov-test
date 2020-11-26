import Vue from 'vue'
import App from './App.vue'

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

delete L.Icon.Default.prototype._getIconUrl;