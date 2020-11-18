<template>
  <!-- 是表格的弹窗 -->
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型" label-width="120px">
          <!--   label 1 目录   2 菜单 -->
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type === 1"
        >
          <el-select v-model="form.icon" placeholder="请选择">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" v-else label-width="120px">
          <el-select v-model="form.url" placeholder="请选择">
            <!-- 10.遍历routes -->
            <el-option
              v-for="item in routes"
              :key="item.path"
              :label="item.name + '--/' + item.path"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      {{ form }}
      <div slot="footer" class="dialog-footer">
        <el-button @click="why">取 消</el-button>

        <el-button type="primary" @click="add" v-if="info.title === '添加菜单'"
          >添 加</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { routes } from "../../../router";
// import axios from 'axios'   把请求都放到了http文件中
import { reqMenuAdd, reqMenuUpdate, reqMenuDetail } from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  // 接受 父组件传值
  props: ["info", "list"],
  data() {
    return {
      routes: routes,
      // 根据后端要求初始化form
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      },
      icons: [
        "el-icon-s-tools",
        "el-icon-user-solid",
        "el-icon-s-help",
        "el-icon-s-operation"
      ]
    };
  },
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    why() {
      this.info.isshow = false;
    },
    // form置空
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1
      };
    },

    getOne(id) {
      reqMenuDetail(id).then(res => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.id = id;
      });
    },

    add() {
      // axios 返回一个promise值。用then方法来返回
      reqMenuAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty(); // 提交过的表单置空
          // this.why(); // 提交成功，表单消失
          this.$emit("init"); // list数据提交成功的时候，通知menu
        } else {
          errorAler(res.data.msg);
        }
      });
    },

    // 修改更新数据
    update() {
      reqMenuUpdate(this.form).then(res => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          //弹框消失
          // this.why();
          //form重置
          this.empty();
          //列表刷新
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    changePid() {
      // 如果上级菜单是 顶级菜单，那么 form.type=1;否则是2
      if (this.form.pid === 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    }
  }
};
</script>

<style scoped></style>
