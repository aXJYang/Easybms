<template>
  <div>
    <el-table :data="list" border style="width: 100%" row-key="id"
      border:tree-props="{ children: 'children' }">
      <el-table-column fixed prop="id" label="商品编号" width="150">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>

      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
         <img :src="$imgPre+scope.row.img">
        </template>
      </el-table-column>

       <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary"  :value="1" v-if="scope.row.status === 1"
            >是</el-button>
          <el-button type="info" v-else  :value="2">否</el-button>
        </template>
      </el-table-column>

   <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary"  :value="1" v-if="scope.row.status === 1"
            >是</el-button>
          <el-button type="info" v-else  :value="2">否</el-button>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status === 1"
            >启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary"  @click="edit(scope.row.id)">编辑</el-button>
          <del-btn @confirm="del(scope.row.id)"></del-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination background layout="prev, pager, next" 
      :total="total"
      :page-size="size"
      @current-change="changePage"
      ></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../utils/http";
import { successAlert } from "../../../utils/alert";

export default {
  computed: {
    ...mapGetters({
      // 数据在vuex里l
      list:"goods/list",
      total:"goods/total",
      size:"goods/size" 
    })
  },
  methods: {
    ...mapActions({
      reqList:"goods/reqList",
      "changePage":"goods/changePage",
      reqCount:"goods/reqCount"

    }),

    //  处理删除
    del(id) {
      reqGoodsDel(id).then(res=>{
          //删除的请求
            if (res.data.code == 200) {
              //成功的弹框
              successAlert(res.data.msg);
              //29.通知父组件刷新list
              this.reqList();
              this.reqCount()
            } 
        })
      },
    edit(id) {
      this.$emit("edit", id);
    },
    },
    //通知menu 更新 编辑按钮数据
   
    mounted() {
    this.reqList();
    this.reqCount()
    }
  }
</script>

<style scoped></style>
