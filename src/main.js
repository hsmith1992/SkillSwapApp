import Vue from 'nativescript-vue'
import App from '@/App'
import VueDevtools from 'nativescript-vue-devtools'
import RadGaugePlugin from 'nativescript-ui-gauge/vue'
import 'nativescript-tailwind/dist/tailwind.css'
import '~/assets/css/tailwind.css'
import StarRating from 'nativescript-vue-star-rating'
import store from '@/store/index'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/css/fontawesome.min.css',
  'fal': './assets/css/light.min.css',
  'far': './assets/css/regular.min.css',
  'fas': './assets/css/solid.min.css',
  'fab': './assets/css/brands.min.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);




Vue.use(VueDevtools)


Vue.use(StarRating);
Vue.use(RadGaugePlugin);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
