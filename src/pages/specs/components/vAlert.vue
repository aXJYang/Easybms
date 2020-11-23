<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" >
      <el-form :model="user">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="user.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" label-width="120px" v-for="(item,index) in attrArr" :key="index">
          <div class="line">
            <el-input v-model="item.value" autocomplete="off"> </el-input>
              <el-button type="primary" v-if="index===0" @click="addAttr">添加规格属性</el-button>
            <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.title=='添加规格'" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import path from "path";
import { mapGetters, mapActions } from "vuex";
// import axios from 'axios'   把请求都放到了http文件中
import {
  reqSpecsDel,
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate
} from "../../../utils/http";
import { successAlert} from "../../../utils/alert";
export default {
  // 接受 父组件传值
  props: ["info"],
  data() {
    return {
       user: {
        specsname: "",
        attrs: "",
        status: 1
      },
      //  规格属性  属性值
      attrArr: [{ value: "" }]   
    };
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
       reqList: "goods/reqList",
       reqCount:"goods/reqCount"
    }),
    // 取消按钮
    why() {
      this.info.isshow = false;
    },
    // form置空
    empty() {
      this.user = {
         user: {
        specsname: "",
        attrs: "",
        status: 1
      },
      },
       // 属性值变化
         this.attrArr = [{ value: "" }];
    },
    getOne(id) {
      reqSpecsDetail(id).then(res => {
        this.user = res.data.list[0];
        console.log(this.user);
        console.log("==================");
        // 获取数据转化为 {}  对象形式
      this.attrArr=JSON.parse(this.user.attrs).map(item=>({value:item})
      )
      });
    },
     // 点击增加规格属性
    addAttr(){
      this.attrArr.push(
        { value:""}      //  ? 为什么用value
      )
    },
    // 删除规格属性
    delAttr(index){
      this.attrArr.splice(index,1)
    },
    add(){
      // axios 返回一个promise值。用then方法来返回
      //  添加的时候  数据转化为 数据形式   【'a','b'】
      this.attrArr=JSON.stringify(this.user.attrArr).map(item=>(item.value));
      reqSpecsAdd(this.form).then(res => {
        if (res.data.code === 200) {
          successAlert("添加成功");
          this.empty(); // 提交过的表单置空
          // this.why(); // 提交成功，表单消失
          this.cancel();
          // 刷新
          this.reqList();
        }
    })
  },
    cancel(){
      this.info.isshow = false
    },
    // 修改更新数据
    update() {
       this.user.attrs=JSON.stringify(this.attrArr.map(item=>item.value))
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
    },
    
  },
};
</script>

<style scoped>
</style>
