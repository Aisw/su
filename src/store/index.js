import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from "@/store/actions";
import mutations from "@/store/mutations";
import getters from "@/store/getters";

const state = {
  cartList: []
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
  getters
})

export default store
