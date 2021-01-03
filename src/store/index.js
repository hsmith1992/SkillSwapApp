import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/auth'
import VuexPersist from "vuex-persist";

const vuexPersist = new VuexPersist({
    key: "jwt",
});

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        //Current State
    },
    mutations: {
        //Updates the States


    },
    actions: {
        //Makes requests then commits mutations

    },
    modules: {
        auth
    }
})
