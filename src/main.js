import Vue from 'nativescript-vue'
import App from '@/App'
import { API } from '@/config';
import VueDevtools from 'nativescript-vue-devtools'
import RadGaugePlugin from 'nativescript-ui-gauge/vue'
import RadListView from 'nativescript-ui-listview/vue';
import 'nativescript-tailwind/dist/tailwind.css'
import '~/assets/css/tailwind.css'
import StarRating from 'nativescript-vue-star-rating'
import store from '@/store/index'
import { TNSFontIcon, fonticon } from 'nativescript-fonticon';
import axios from "axios";

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': './assets/css/fontawesome.min.css',
  'fal': './assets/css/light.min.css',
  'far': './assets/css/regular.min.css',
  'fas': './assets/css/solid.min.css',
  'fab': './assets/css/brands.min.css'
};
TNSFontIcon.loadCss();

//Global Variables
Vue.prototype.$API = API;
Vue.prototype.$axios = axios;

//Middleware
Vue.filter('fonticon', fonticon);
Vue.use(VueDevtools)

//Plugins
Vue.use(RadListView);
Vue.use(StarRating);
Vue.use(RadGaugePlugin);


//Mixins
Vue.mixin({
  methods: {
    capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1)
  }
})

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
