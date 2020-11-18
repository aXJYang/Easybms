<template>
  <div>
    <el-button type="primary" @click="vat()">添加</el-button>
    <!-- 列表 -->
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <!-- 弹出框 -->
    <!-- 绑定自定义事件init， -->
    <!-- 绑定ref -->
    <v-alert :info="info" :list="list" @init="init" ref="form"></v-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuList } from "../../utils/http";
import vAlert from "./components/vAlert";
import vList from "./components/vList";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加菜单"
      },
      //列表数据
      list: []
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 父传子，这个方法传给子组件
    vat() {
      (this.info.isshow = true), (this.info.title = "添加菜单");
    },
    init() {
      reqMenuList().then(res => {
        this.list = res.data.list;
        // 请求回来的数据赋给menu的数据里的list
      });
    },
    edit(id) {
      // 点击 编辑 按钮，弹出弹窗
      this.info.isshow = true;
      // 判断弹窗是 “添加”还是“编辑”
      this.info.title = "编辑菜单";
      this.$refs.form.getOne(id);
    }
  },
  mounted() {
    // 数据，Dom都挂载完成之后，立刻触发加载
    this.init();
  },
  components: {
    vList,
    vAlert
  }
};
</script>

<style scoped>
.el-button {
  margin: 20px 0px 20px 0px;
}
</style>
