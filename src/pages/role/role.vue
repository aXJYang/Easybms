<template>
  <div>
    <el-button type="primary" @click="cx">添加</el-button>
    <v-list @init="init" :list="list"  @edit="edit"></v-list>
    <v-alert @init="init" :info='info' ref="form"></v-alert>
  </div>
</template>

<script>
import vList from './components/vList'
import vAlert from './components/vAlert'
import {mapGetters,mapActions} from "vuex"
import { reqRoleList } from '../../utils/http'

export default {
    data(){
        return {
        info:{
         isshow:false,
         title:"添加角色"
      },
      list:[]
    }
    },
  components:{ vAlert,vList }
  ,
    computed:{
        ...mapGetters({
        })
    },
    methods:{
        ...mapActions({       
        }),
        cx(){
            this.info={
                isshow:true,
                title:"添加角色"
            }
        },
        // 请求数据，子传父res.data.list
        init(){
          reqRoleList().then(res=>{
            this.list = res.data.list
          })
        },
        edit(id){
          this.info={
            isshow:true,
            title:"编辑角色"
          }
          this.$refs.form.getOne(id)
        }

    },
    mounted(){
        this.init()
    }

}
</script>

<style scoped>
.el-button{
    margin:20px 0 20px 0;
}
</style>