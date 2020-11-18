<template>
  <el-table :data="list" border style="width: 100%"  row-key="id"
      border:tree-props="{children: 'children'}">
    <el-table-column fixed prop="id" label="角色编号" sortable width="150">
    </el-table-column>
    <el-table-column prop="rolename" sortable label="角色名称" > </el-table-column>

    <el-table-column label="状态">
      <template slot-scope="scope">
        <el-button type="primary" v-if="scope.row.status === 1">启用</el-button>
        <el-button type="info" v-else>禁用</el-button>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <!-- 删除模板 -->
       <del-btn @confirm="del(scope.row.id)"></del-btn>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqRoleDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),

    //  处理删除
    del(id) {
       reqRoleDel(id).then(res => {
          //删除的请求
            if (res.data.code == 200) {
              //成功的弹框
              successAlert(res.data.msg);
              //29.通知父组件刷新list
              this.$emit("init");
            }
          ;
        })
    },
    //通知menu 更新 编辑按钮数据
    edit(id) {
      this.$emit("edit", "id");
    }
  }
};
</script>

<style scoped></style>
