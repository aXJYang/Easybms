<template>
  <!-- 是表格的弹窗 -->
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
          >
           <el-option
                label="顶级分类"  :value="0" 
            ></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
  <el-form-item label-width="120px" label="分类名称">
   <el-input v-model="form.catename" autocomplete="off"></el-input>
    </el-form-item>

      <el-form-item label-width="120px" label="图片"  v-if="form.pid !== 0">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeFile2"
          >
            <img v-if="imgUrl" :src="imgUrl" class="ous" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-form-item>

        <el-form-item label="状态" label-width="120px" >
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="why">取 消</el-button>

        <el-button type="primary" @click="add" v-if="info.title === '分类添加'"
          >确 定</el-button
        >
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
// import axios from 'axios'   把请求都放到了http文件中
import {
  reqRoleList,
  reqCateAdd,
  reqCateDetail,
  reqCateUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  // 接受 父组件传值
  props: ["info"],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
      imgUrl:''
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list"
    })
  },
  methods: {
    ...mapActions({
       reqList: "cate/reqList"
    }),
    // 取消按钮
    why() {
      this.info.isshow = false;
    },
    // form置空
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1
      },
        this.imgUrl = "";
    },

    getOne(id) {
      reqCateDetail(id).then(res => {
        //此时form上是没有id的
        this.form = res.data.list;
        //补id
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.user.img;
      });
    },

    add() {
      // axios 返回一个promise值。用then方法来返回
      reqCateAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty(); // 提交过的表单置空
          // this.why(); // 提交成功，表单消失
          this.cancel();
          // 刷新
          this.reqList();
        }
      });
    },
    cancel(){
      this.info.isshow = false
    },

    // 修改更新数据
    update() {
      reqCateUpdate(this.form).then(res => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.reqList();
        } 
      });
    },
     // 不会
    changeFile2(e){
      let file = e.raw
      this.imgUrl=URL.createObjectURL(file)
      this.user.img = file
    }

  },
  mounted() {
    //   12.一进来，先获取菜单列表数据
    reqRoleList().then(res => {
      if (res.data.code == 200) {
        this.roleList = res.data.list;
      }
    });
  }
};
</script>

<style scoped>
 .ous {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
</style>
