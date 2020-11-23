<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list @edit="edit"></v-list>
    <v-alert :info="info" ref="form"></v-alert>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import vAlert from "./components/vAlert"
import vList from "./components/vList"
export default {
  components:{
    vList,
    vAlert
  },
  data(){
    return {
      info:{
        isshow:false,
        title:"添加商品"
      }
    }
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    willAdd(){
      this.info={
        isshow:true,
        title:"添加商品"
      }
    },
    //编辑
    edit(id){
      this.info={
        isshow:true,
        title:"编辑商品"
      }
      this.$refs.form.getOne(id)
    }
  },
  mounted() {}
};
</script>
<style scoped>
</style>