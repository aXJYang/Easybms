<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>

    <v-form :info="info" ref="form" @init="newInit"> </v-form>
    <v-list :list="list" @init="newInit" @edit="edit"></v-list>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :total="total"
      :page-size="size"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import vForm from "./components/valert.vue";
import vList from "./components/vlist.vue";
import { reqUserList, reqUserCount } from "../../utils/http";
export default {
  data() {
    return {
      info: {
        isshow: false,
        title: "添加管理员"
      },
      list: [],
      total: 0,
      size: 2,
      page: 1
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    // 点击添加弹出页面
    add() {
      this.info = {
        isshow: true,
        title: "添加管理员"
      };
    },
    // 编辑，获取详情
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑角色"
      };
      this.$refs.form.getOne(uid);
    },
    newInit() {
      this.init();
      this.getCount();
    },
    edit(uid) {
      this.info = {
        isshow: true,
        title: "编辑角色"
      };
      this.$refs.form.getOne(uid);
    },
    init() {
      //获取列表数据
      reqUserList({ page: this.page, size: this.size }).then(res => {
        let list = res.data.list ? res.data.list : [];
        // 56.如果取到的list是[],并且page>1,page自减，请列表
        if (list.length === 0 && this.page > 1) {
          this.page--;
          this.init();
          return;
        }
        this.list = list;
      });
    },
    // 动态page页面
    changePage(page) {
      this.page = page;
      this.init();
    },
    // 获取分页总数
    getCount() {
      reqUserCount().then(res => {
        this.total = res.data.list[0].total;
      });
    }
  },
  components: {
    vList,
    vForm
  },
  mounted() {
    //一进来发起请求
    this.init();
    this.getCount();
  }
};
</script>

<style scoped>
.el-button {
  margin: 20px 0 20px 0;
}
</style>
