import {reqCateList} from "../../utils/http"

const state={
    list:[]
}

const mutations={
    changeList(state,arr){
        state.list =arr
    }
}

const actions={
    // 执行异步
    // 发起请求
    reqList(context){
        //发请求，成功之后，修改list
        reqCateList({istree:true}).then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}

const getters={
    list(state){
        return state.list 
    }
}
export default {
    state, mutations, getters, actions,
    namespaced: true
}