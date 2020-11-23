  <template>
  <el-table :data="bannerList" border style="width: 100%">
    <el-table-column prop="id" label="编号" width="180"></el-table-column>
    <el-table-column prop="title" label="轮播图标题" width="180"></el-table-column>
    <el-table-column label="图片">
      <template slot-scope="scope">
        <img :src="$imgPre+scope.row.img" alt />
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status===1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <del-btn @confirm="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqBannerDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      bannerList: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      reqBannerList: "banner/reqList",
    }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqBannerDel(id).then((res) => {
        successAlert(res.data.msg);
        //刷新list
        this.reqBannerList();
      });
    },
  },
  mounted() {
    this.reqBannerList();
  },
};
</script>

<style>
img {
  width: 100px;
  height: 100px;
}
</style>