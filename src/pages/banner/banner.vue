<template>
  <div class="vip">
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :info="info" @edit="edit"></v-list>
    <v-form :info="info" ref="form"></v-form>
  </div>
</template>

<script>
import vForm from "./components/form";
import { mapGetters, mapActions } from "vuex";
import vList from "./components/vList";
export default {
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  components: {
    vForm,
    vList
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "轮播图添加",
      },
    };
  },
  methods: {
    willAdd() {
      this.info.isShow = true;
      this.info.title = "轮播图添加";
    },
    edit(id) {
      this.info.isShow = true;
      this.info.title = "轮播图编辑";
      this.$refs.form.getOne(id);
    },
  },
};
</script>

<style>
.el-button{
  margin: 20px 0 10px;
}
</style>