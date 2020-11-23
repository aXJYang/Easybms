import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import actions from "./actions"
import {state,getters,mutations} from "./mutations"
import cate from "./modules/cate"
import goods from "./modules/goods"
import banner from "./modules/banner"
import seckill from "./modules/seckill"
import vip from "./modules/vip"
import specs from "./modules/specs"

export default new Vuex.Store({
    state,mutations,getters,actions,
    modules:{
        cate,goods,banner,seckill,vip,specs
    }
})