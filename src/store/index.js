import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import actions from "./actions"
import {state,getters,mutations} from "./mutations"
import order from "./modules/order"
import cate from "./modules/cate"
import goods from "./modules/goods"

export default new Vuex.Store({
    state,mutations,getters,actions,
    modules:{
        order,cate,goods
    }
})