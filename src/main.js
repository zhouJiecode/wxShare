// import 'normalize.css'
import './styles/index.scss'

import './utils/rem'

import Vue from 'vue'
import App from './App'
import router from './router'

// import { Field, Radio } from 'mint-ui'

// Vue.component(Field.name, Field)
// Vue.component(Radio.name, Radio)

import MtRadio from 'mint-ui/lib/radio';
import Spinner from 'mint-ui/lib/spinner';
// import 'mint-ui/lib/radio/style.css';
import 'mint-ui/lib/style.css';

// import waves from './directives/waves'
// Vue.use(waves)

Vue.component(MtRadio.name, MtRadio)
Vue.component(Spinner.name, Spinner)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
