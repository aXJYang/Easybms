import { reqSeckillList } from "../../utils/http"
const state = {
    //分类list
    list: [],
}

const mutations = {
    //修改list
    changeList(state, arr) {
        state.list = arr;
    },
}

const actions = {
    //发起请求
    reqList(context, bool) {
        let p = bool ? {} : { page: context.state.page, size: context.state.size }
        //发请求，成功之后，修改list
        reqSeckillList(p).then(res => {
            let list = res.data.list ? res.data.list : []

            if(list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqList");
                return;
            }
            
            context.commit("changeList", list)
        })
    },
}

const getters = {
    list(state) {
        return state.list
    },
}

export default {
    state, mutations, getters, actions,
    namespaced: true
}