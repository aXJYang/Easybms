<template>
  <el-dialog title="会员编辑" :visible.sync="info.isShow">
    <el-form :model="form">
      <el-form-item label="手机号" label-width="120px">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="昵称" label-width="120px">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="状态" label-width="120px">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="edit">修 改</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import { reqVipDetail,reqVipUpdate } from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqVipList: "vip/reqList",
    }),
    getOne(uid) {
      reqVipDetail(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        uid: "",
        nickname: "",
        password: "",
        phone: "",
        status: 1,
      };
    },
    edit() {
      reqVipUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqVipList();
        }
      });
    },
  },
};
</script>

<style>
</style>