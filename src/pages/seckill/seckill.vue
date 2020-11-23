<template>
  <div class="menu">
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-table @edit="edit"></v-table>

    <v-form :info="info" ref="form"></v-form>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/form";
import vTable from "./components/table";
import { reqMenuList } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isShow: false,
        title: "商品分类添加",
      },
    };
  },
  computed: {
    ...mapGetters({
      total: "goods/total",
      size: "goods/size",
    }),
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqPage: "goods/reqPage",
      reqCount: "goods/reqCount"
    }),
    willAdd() {
      this.info.isShow = true;
      this.info.title = "商品分类添加";
    },
    edit(id) {
      this.info.isShow = true;
      this.info.title = "商品分类编辑";
      this.$refs.form.getOne(id);
    },
  },
  components: {
    vForm,
    vTable,
  },
  mounted() {
    this.reqCount()
  },
};
</script>

<style>
.el-button {
  margin: 20px 0 10px;
}
.el-pagination {
  margin-top: 10px;
  text-align: right;
}
</style>