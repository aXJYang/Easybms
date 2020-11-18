<template>
  <div>
    <el-table :data="list" border style="width: 100%" row-key="id"
      border:tree-props="{ children: 'children' }">
      <el-table-column fixed prop="id" label="菜单编号" width="150">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称"> </el-table-column>

      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="菜单地址"> </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";

export default {
  props: ["list"],
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),

    //  处理删除
    del(id) {
      this.$confirm("你确定要删除吗？", "删除提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //删除的请求
          reqMenuDel(id).then(res => {
            if (res.data.code == 200) {
              //成功的弹框
              successAlert(res.data.msg);
              //29.通知父组件刷新list
              this.$emit("init");
            } else {
              errorAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          console.log(" 你点了取消");
        });
    },
    //通知menu 更新 编辑按钮数据
    edit(id) {
      this.$emit("edit", id);
    },
    mounted() {}
  }
};
</script>

<style scoped></style>
