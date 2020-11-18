<template>
  <!-- 是表格的弹窗 -->
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @closed="closed">
      
      <el-form :model="user">
        <el-form-item label="角色名称" label-width="120px">
          <!-- 9.通过v-model将user绑定到表单上 -->
          <el-input v-model="user.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 树型控件区域 -->
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <!-- =========================== -->
         
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title == '添加角色'" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import axios from 'axios'   把请求都放到了http文件中
import {
  reqRoleAdd,
  reqRoleUpdate,
reqRoleDetail,
  reqMenuList
} from "../../../utils/http";

import { successAlert} from "../../../utils/alert";
export default {                
  // 接受 父组件传值
  props: ["info"],
  data() {
    return {
      // 根据后端要求初始化
      user: {
        rolename: "",
        menus: "",
        staus: ""
      },
      // 初始化树形上数据
      menuList: [],
    
      }
    },
  
  computed: {
    ...mapGetters({})
  },
  methods: {
    ...mapActions({}),
    //
    why() {
      this.info.isshow = false;
    },
    empty(){
        this.user = {
        rolename: "",
        menus: "",
        status: 1
    },
    // 树清空
     this.$refs.tree.setCheckedKeys([]) 
    },
    // 点取消
    cancel() {
      this.info.isshow = false;
    },
    getOne(id) {
      reqRoleDetail(id).then(res => {
        this.user = res.data.list;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.user.menus));
        //补id
        this.user.id = id;
      });
    },

    add() {
      // axios 返回一个promise值。用then方法来返回
    // menus 需要的是id的数组集合,获取到的数据转化为数组形式赋予给menus
    this.user.menus = JSON.stringify(this.$refs.tree.setCheckedKeys())
      reqRoleAdd(this.user).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty(); // 提交过的表单置空
          this.cancel()    // 表单消失
          this.$emit("init"); // list数据提交成功的时候，通知menu
        } else {
          errorAler(res.data.msg);
        }
      });
    },

    // 修改更新数据
    update() {
       this.user.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          //form重置
          this.empty();
          //列表刷新
          this.$emit("init");
        }
      });
    },

    //弹窗消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "编辑菜单") {
        this.empty();
      }
    }
  },
  mounted() {
    // 一进来就请求数据
    reqMenuList().then(res => {
      if (res.data.code === 200) {
        this.menuList = res.data.list;
      }
    });
  }
};
</script>

<style scoped></style>
