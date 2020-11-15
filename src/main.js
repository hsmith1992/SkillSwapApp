import Vue from 'nativescript-vue'
import Landing from './views/Landing'
import VueDevtools from 'nativescript-vue-devtools'


if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
import store from './store'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

//Vue.registerElement('SVGImage', () => require('nativescript-svg').SVGImage)

new Vue({
  store,
  render: h => h('frame', [h(Landing)])
}).$start()
