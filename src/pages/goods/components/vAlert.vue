<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            placeholder="请选择一级分类"
            prop="first_cateid"
            v-model="user.first_cateid"
            @change="firstList"
          >
            <!-- 一级分类遍历 -->
            <el-option
              v-for="item in catelist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" label-width="120px" prop="second_cateid">
          <el-select placeholder="请选择二级分类" v-model="user.second_cateid">
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px" prop="goodsname">
          <div class="line">
            <el-input v-model="user.goodsname" autocomplete="off"> </el-input>
          </div>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="myupload">
            <h3>+</h3>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px" prop="specsid">
          <el-select placeholder="请选择商品规格" v-model="user.specsid">
            <!-- 遍历数据 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :value="item.id"
              :label="item.specsname"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" label-width="120px" prop="specsattr">
          <el-select
            placeholder="请选择规格属性"
            v-model="user.specsattr"
            multiple
          >
            <el-option
              v-for="item in attrList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="user.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 富文本 -->
        

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title == '添加商品'" @click="add"
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
  reqCateList,
  reqSpecsDel,
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsUpdate
} from "../../../utils/http";
import { successAlert } from "../../../utils/alert";
export default {
  // 接受 父组件传值
  props: ["info"],
  data() {
    return {
      // 初始化数据
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        img: null,
        description: "",
        specsid: "", // 商品规格
        specsattr: [], //后端需求  "[]"  规格属性
        isnew: 1, // 是否新品
        ishot: 1, // 是否热门
        status: 1
      },
      // 二级分类的数据list
      secondCateList: [],
      // 规格属性 数据list
      attrList: [],
      // 图片的临时地址
      imgUrl: ""
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类
      catelist: "cate/list",
      // 规格的List
      specsList: "order/list"
    })
  },
  methods: {
    ...mapActions({
      reqCateList: "cate/reqList", // 请求一级分类数据
      reqSpecsList: "order/reqList", // 请求规格的数据
      reqGoodsList: "goods/reqList",   // 商品list
      reqGoodsCount: "goods/reqCount"    // 总数
    }),
    // 取消按钮
    why() {
      this.info.isshow = false;
    },
    // form置空
    empty() {
      (this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1
      }),
        // 重置数据
        (this.secondCateList = []),
        (this.imgUrl = ""),
        (this.attrList = []);
    },
    getOne(id) {
      reqGoodsDetail(id).then(res => {
        this.user = res.data.list[0];
        // 获取数据转化为 {}  对象形式
        this.secondList()
      });
    },
    //获取二级分类
    // 重置二级分类id
    firstList() {
      this.user.second_cateid = "";
      this.secondList();
    },
    secondList() {
      reqCateList({ pid: this.user.first_cateid }).then(res => {
        // 根据一级分类的pid 值 来获取二级分类，数据赋值给二级分类list
        this.secondCateList = res.data.list;
      });
    },
    // 点击增加规格属性
    addAttr() {
      this.attrArr.push({ value: "" });
    },
    // 删除规格属性
    delAttr(index) {
      this.attrArr.splice(index, 1);
    },
    add() {
      // axios 返回一个promise值。用then方法来返回
      //  添加的时候  数据转化为 数据形式   【'a','b'】
      reqSpecsAdd(this.form).then(res => {
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
    // 处理图片
    changeFile(e) {
      let file = e.target.files[0];
      //验证
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },

    cancel() {
      this.info.isshow = false;
    },
    // 修改更新数据
    update() {
      reqSpecsUpdate(this.user).then(res => {
        if (res.data.code === 200) {
          //成功弹框
          successAlert("修改成功");
          this.cancel();
          this.empty();
          this.reqList();
          this.reqCount();
        }
      });
    }
  },
  mounted() {
    // dom挂载完成
    // 弹窗弹出来，就获取到数据
    this.reqCateList();
    this.reqSpecsList(true); //取到规格  true 参数
  }
};
</script>
<style scoped>
.line {
  display: flex;
}
.line .el-input {
  flex: 1;
}
.line .el-button {
  width: auto;
}
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
</style>
