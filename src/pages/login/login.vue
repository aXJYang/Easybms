<template>
  <div class="login">   
      <div class="con">
    <div id="ous1">登录</div>
    <div class="line">
      <el-input placeholder="请输入内容" v-model="user.username" clearable>
      </el-input>
    </div>
    <div class="line">
      <el-input placeholder="请输入密码" v-model="user.password"
        show-password clearable></el-input>
    </div>
    <div class="ous">
  <el-button type="primary" @click="login()">登录</el-button>
    </div>
  
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert } from '../../utils/alert';
import { reqLogin} from '../../utils/http';
export default {
  data() {
    return {
      user: {
        username: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters({
     
    
    })
  },
  methods: {
    ...mapActions({ 
        //  辅助函数接受 的方法   方法名
    "changeUser":"changeUser"
      }),
    login(){
      reqLogin(this.user).then(res=>{
          if(res.data.code === 200){
              successAlert('登录成功')
              // 存入vuex 
              this.changeUser(res.data.list)
              this.$router.push("/")
          }
      }   
      )}
  }
};
</script>

<style scoped>
.login{
    text-align: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(to right,#ff9569,#e92758, #29bdd9);
}
.con{
  width: 400px;
  padding: 20px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 20px;
}
h3{
  text-align: center;
  margin: 10px;
}
.line{
  margin-bottom: 15px;
}
.ous{
  text-align: center;
}
#ous1{
    margin-bottom: 20px;
}
</style>