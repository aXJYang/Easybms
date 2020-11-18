<template>
<div>
    <el-button type="primary" @click="add()">添加</el-button>
    <v-list @edit="edit" ></v-list>
    <v-alert :info="info" ref="form"></v-alert>
</div>

</template>

<script>
import vList  from "./components/vList"
import vAlert  from "./components/vAlert"
import {mapGetters,mapActions} from "vuex"
import {  reqCateList,reqUserCount } from "../../utils/http"

export default {
    data(){
        return {    
            info:{
                isshow:false,
                title:"添加规格"
            },
        }     
    },
    computed:{
        ...mapGetters({ })
    },
    methods:{
        ...mapActions({ }),
        add(){
            this.info={
                isshow:true,
                title:"添加规格"
            }
        },
        edit(id){
            this.info = {
            isshow:true,
                title:"规格修改"
            }
            this.$refs.form.getOne(id)
        }
    },
    components:{ vList,vAlert },
    mounted(){}
}
</script>

<style scoped>
.el-button{
    margin:20px 0px 20px 0px ;
}
</style>