<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title=='轮播图添加'">确 定</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { successAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerUpdate,
} from "../../../utils/http";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqBannerList: "banner/reqList",
    }),
    getOne(id) {
      reqBannerDetail(id).then((res) => {
        this.form = res.data.list;
        this.imgUrl = this.$imgPre + this.form.img;
        this.form.id = id;
      });
    },
    cancel() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      imgUrl: "";
    },
    add() {
      reqBannerAdd(this.form).then((res) => {
        successAlert(res.data.msg);
        this.cancel();
        this.empty();
        this.reqBannerList();
      });
    },
    edit() {
      reqBannerUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqBannerList();
        }
      });
    },
    changeFile(e) {
      let file = e.raw;

      this.imgUrl = URL.createObjectURL(file);

      this.form.img = file;
    },
  },
};
</script>

<style scoped lang="stylus">
.myupload {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: 1px dashed #ccc;
  position: relative;
}

.myupload h3 {
  width: 100%;
  height: 100px;
  font-size: 30px;
  text-align: center;
  line-height: 100px;
  color: #666;
  font-weight: 100;
}

.myupload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.myupload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}

.form >>> .el-upload {
  border: 1px dashed #ccc !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>