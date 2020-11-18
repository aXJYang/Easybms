 //弹窗 文件
import Vue from "vue"
let vm=new Vue()

// 成功弹窗
export const successAlert = (msg) => {
    vm.$message({
        message: msg,
        type: "success"
    });
}
//失败弹框
export const errorAlert = (msg) => {
    vm.$message({
        message: msg,
        type: "warning"
    });
}