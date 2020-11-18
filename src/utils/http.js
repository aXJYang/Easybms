import axios from "axios"
import qs from "qs"
import router from "../router"
import Vue from 'vue'
import store from "../store"
import { errorAlert } from "./alert"
Vue.prototype.$imgPre="http://localhost:3000"

// 切换开发环境与生产环境 是否使用8080
let baseUrl = "/api"   // 开发
// let baseUrl = " "   // 生产

// 响应拦截
axios.interceptors.response.use(res => {
    console.log("响应地址是" + res.config.url);
    console.log(res);
    // 失败弹窗
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    return res
})

//请求拦截
axios.interceptors.request.use(req => {
    if(req.url != baseUrl+"/api/userlogin"){
         // Authorization(用户凭证) 根据用户提供的身份凭证，生成权限实体，并为之授予相应的权限。
        req.headers.authorization=store.state.userInfo.token;
    }
    console.log(req);
    return req
})

//  掉线处理  （后台掉线）
axios.interceptors.response.use(res => {
    console.log("请求地址是" + res.config.url);
    console.log(res);
    // 失败弹窗
    if (res.data.code !== 200) {
        errorAlert(res.data.msg)
    }
    if(res.data.msg==="登录已过期或访问权限受限"){
        store.dispatch("changeUser",{})
        router.push("/login")   
         //   ?为什么不加$ 
    }
    return res
})


// 菜单接口
// 添加请求
export const reqMenuAdd = (form) => {
    return axios({
        url: baseUrl + "/api/menuadd",
        method: "POST",
        data: qs.stringify(form)   // post👉写data里
    })
}

// 列表的请求，List页面控制menu的数据展示
export const reqMenuList = () => {
    return axios({
        url: baseUrl + "/api/menulist",
        method: "get",
        params: {
            istree: true
        }

    })
}


// 删除按钮的请求
export const reqMenuDel = (id) => {
    return axios({
        url: baseUrl + "/api/menudelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 更新修改
export const reqMenuUpdate = (form) => {
    return axios({
        url: baseUrl + "/api/menuedit",
        method: "post",
        data: qs.stringify(form)
    })
}
// 获取数据
export const reqMenuDetail = (id) => {
    return axios({
        url: baseUrl + "/api/menuinfo",
        method: "get",
        params: {
            id: id
        }
    })
}


// ================角色管理接口====================
// 添加接口
export const reqRoleAdd = (user) => {
    return axios({
        url: baseUrl + "/api/roleadd",
        method: "post",
        data: qs.stringify(user)
    })
}
// 列表接口
export const reqRoleList = () => {
    return axios({
        url: baseUrl + "/api/rolelist",
        method: "get",
    })
}

// 删除接口
export const reqRoleDel = (id) => {
    return axios({
        url: baseUrl + "/api/roledelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
//编译
export const reqRoleDetail = id => {
    return axios({
        url: baseUrl + "/api/roleinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 修改
export const reqRoleUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/roleedit",
        method: "post",
        data: qs.stringify(user)
    })
} 

 //管理员接口====================================================================

 // 添加
 export const reqUserAdd = (user) => {
    return axios({
        url: baseUrl + "/api/useradd",
        method: "post",
        data: qs.stringify(user)
    })
}

//删除
export const reqUserDel = (uid) => {
    return axios({
        url: baseUrl + "/api/userdelete",
        method: "post",
        data: qs.stringify({
            uid: uid
        })
    })
}
// 修改
export const reqUserUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/useredit",
        method: "post",
        data: qs.stringify(user)
    })
}

// 详情 
export const reqUserDetail = uid => {
    return axios({
        url: baseUrl + "/api/userinfo",
        method: "get",
        params: {
            uid: uid
        }
    })
}
//18.列表 p={page:1,size:10}
export const reqUserList = (p) => {
            return axios({
        url: baseUrl + "/api/userlist",
        method: "get",
        params: p
    })
}
// 总数
export const reqUserCount = () => {
    return axios({
        url: baseUrl + "/api/usercount",
        method: "get",

    })
}


// 登录接口================================================

export const reqLogin = (user) => {
    return axios({
        url: baseUrl + "/api/userlogin",
        method: "post",
        data:qs.stringify(user)
    })
}

// 商品分类接口====================================================

// 详情接口
export const reqCateDetail = id => {
    return axios({
        url: baseUrl + "/api/cateinfo",
        method: "get",
        params:{
            id:id
        }
    })
}
// 删除接口
export const reqCateDel = id => {
    return axios({
        url: baseUrl + "/api/catedelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 列表
export const reqCateList = (p) => {
    return axios({
        url: baseUrl + "/api/catelist",
        method: "get",
        params: p
    })
}
// 38.修改 文件
export const reqCateUpdate = (cate) => {
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateedit",
        method: "post",
        data: d
    })
}
//添加文件接口
export const reqCateAdd = (cate) => {
    let d=new FormData()
    for(let i in cate){
        d.append(i,cate[i])
    }
    return axios({
        url: baseUrl + "/api/cateadd",
        method: "post",
        data:d
    })
}

// 商品规格接口==========================================

// 详情接口
export const reqSpecsDetail = id => {
    return axios({
        url: baseUrl + "/api/specsinfo",
        method: "get",
        params:{
            id:id
        }
    })
}
// 删除接口
export const reqSpecsDel = id => {
    return axios({
        url: baseUrl + "/api/specsdelete",
        method: "post",
        data: qs.stringify({
            id: id
        })
    })
}
// 列表
export const reqSpecsList = (p) => {
    return axios({
        url: baseUrl + "/api/specslist",
        method: "get",
        params: p
    })
}
// 38.修改 文件
export const reqSpecsUpdate = (user) => {
    return axios({
        url: baseUrl + "/api/specsedit",
        method: "post",
        data: qs.stringify(user)
    })
}
//添加文件接口
export const reqSpecsAdd = (user) => {
    return axios({
        url: baseUrl + "/api/specsadd",
        method: "post",
        data:qs.stringify(user)
    })
}
export const reqSpecsCount = () => {
   
    return axios({
        url: baseUrl + "/api/specscount",
        method: "get",
    })
}

//   商品管理接口 ================================================

// 增加接口
export const reqGoodsAdd = (user)=>{

    let hh = new fromDate()
    for( let  i in user){
        hh.append(i,user[i])
    }
    
    return axios({
        url:baseUrl + "/api/goodsadd",
        method:"post",
        data:hh
    })
}
// 删除接口
export const reqGoodsDel = (id) => {
    
    return axios({
        url: baseUrl + "/api/goodsdelete",
        method: "post",
        data:qs.stringify({id:id})
    })
}

// 详情接口
export const reqGoodsDetail = id => {
    return axios({
        url: baseUrl + "/api/goodsinfo",
        method: "get",
        params: {
            id: id
        }
    })
}
// 列表接口
export const reqGoodsList = p => {
    return axios({
        url: baseUrl + "/api/goodslist",
        method: "get",
        params: p
    })
}
// 修改
export const reqGoodsUpdate = (user) => {
    let d=new FormData()
    for(let i in user){
        d.append(i,user[i])
    }
    return axios({
        url: baseUrl + "/api/goodsedit",
        method: "post",
        data: d
    })
}
export const reqGoodsCount = () => {
    return axios({
        url: baseUrl + "/api/goodscount",
        method: "get",
    })
}