import {reqGoodsList,reqGoodsCount} from "../../utils/http"
const state = {
    //分类list
    list:[],
    //总数
    total:0,
    size:3,
    page:1,
}

const mutations = {
    //修改list
    changeList(state,arr){
        state.list=arr;
        console.log(state.list);
    },
    changeTotal(state,num){
        state.total=num;
    },
    changePage(state,page){
        state.page=page;
    }
}

const actions = {
    //发起请求
    reqList(context){
        //发请求，成功之后，修改list
        reqGoodsList({page:context.state.page,size:context.state.size}).then(res=>{
            let list=res.data.list?res.data.list:[]
            
            if(list.length==0&&context.state.page>1){
                context.commit("changePage",context.state.page-1)
                context.dispatch("reqList");
                return;
            }
            
            context.commit("changeList",list)
        })
    },
    //请总数
    reqCount(context){
        reqGoodsCount().then(res=>{
            context.commit("changeTotal",res.data.list[0].total)
        })
    },
    //修改页码
    changePage(context,page){
        //修改页码
        context.commit("changePage",page)
        //从新请求数据
        context.dispatch("reqList")
    }
}

const getters = {
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },

}

export default {
    state, mutations, getters, actions,
    namespaced: true
}