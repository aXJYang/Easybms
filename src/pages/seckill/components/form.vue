<template>
  <div class="form">
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="closed">
      <el-form :model="goods">
        <el-form-item label="活动名称" label-width="120px" prop="title">
          <el-input v-model="goods.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" label-width="120px" prop="goodsname">
          <el-date-picker
            v-model="value"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="first_cateid">
          <el-select v-model="goods.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select v-model="goods.second_cateid" placeholder="请选择" @change="changeSecond">
            <el-option
              v-for="item in secondId"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品" label-width="120px" prop="second_cateid">
          <el-select v-model="goods.goodsid" placeholder="请选择">
            <el-option
              v-for="item in thirdId"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="goods.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add()" v-if="info.title=='商品分类添加'">确 定</el-button>
        <el-button type="primary" @click="edit()" v-else>修 改</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import E from "wangeditor";
import { routes } from "../../../router/index";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqGoodsList,
  reqSeckillAdd,
  reqSeckillDetail,
  reqSeckillUpdate
} from "../../../utils/http";
import { successAlert, errorAlert } from "../../../utils/alert";
export default {
  data() {
    return {
      goods: {
        title: "",
        first_cateid: "",
        begintime: "",
        endtime: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      value: [],
      // 二级菜单
      secondId: [],
      thirdId: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      seckillList: "seckill/list",
    }),
  },
  props: ["info"],
  methods: {
    ...mapActions({
      // store里面的reqList函数
      reqcateList: "cate/reqList",
      reqSeckillList: "seckill/reqList",
    }),
    getTime() {
      this.goods.begintime = Date.parse(this.value[0]) / 1000;
      this.goods.endtime = Date.parse(this.value[1]) / 1000;
    },
    format(shijianchuo) {
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo * 1000);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return new Date(y,m,d,h,mm)
    },
    getDate() {
      this.value[0] = this.format(this.goods.begintime)
      this.value[1] = this.format(this.goods.endtime)
    },
    // 一级分类变化
    changeFirst() {
      this.goods.second_cateid = "";
      this.getSecondId();
    },
    // 获取二级菜单
    getSecondId() {
      // http里面的reqCateList函数
      reqCateList({ pid: this.goods.first_cateid }).then((res) => {
        // console.log(res);
        this.secondId = res.data.list;
      });
    },
    // 二级分类变化
    changeSecond() {
      this.goods.goodsid = "";
      this.getThirdGoods();
    },
    // 获取三级商品
    getThirdGoods() {
      reqGoodsList({
        fid: this.goods.first_cateid,
        sid: this.goods.second_cateid,
      }).then((res) => {
        console.log(res);
        this.thirdId = res.data.list;
      });
    },
    add() {
      this.getTime();
      reqSeckillAdd(this.goods).then((res) => {
        successAlert(res.data.msg);
        this.empty();
        this.cancel();
        this.reqSeckillList();
      });
    },
    getOne(id) {
      reqSeckillDetail(id).then((res) => {
        this.goods = res.data.list;
        this.getSecondId();
        this.getThirdGoods()
        this.getDate();
      });
    },
    edit() {
      this.getTime();
      reqSeckillUpdate(this.goods).then(res=>{
        successAlert(res.data.msg)
        this.cancel();
        this.reqSeckillList();
        this.empty()
      })
    },
    // 13.form置空
    empty() {
      this.goods = {
        title: "",
        first_cateid: "",
        begintime: "",
        endtime: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.value = "";
      this.secondCateList = [];
      this.thirdId = [];
    },
    cancel() {
      this.info.isShow = false;
    },
    //38.弹框消失
    closed() {
      // 如果是添加出现，点击了取消，此时，什么都不做
      // 如果是编辑出现，点击了取消，此时，form置空
      if (this.info.title === "商品分类编辑") {
        this.empty();
      }
    },
  },
  mounted() {
    // 请求一级分类列表
    this.reqcateList();
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