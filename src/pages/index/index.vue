<template>
  <div>
    <el-container class="won">
      <el-aside width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          unique-opened
          router
          background-color="#20222a"
          active-text-color="#ffd04b"
          text-color="aliceblue"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
            
          </el-menu-item>
             <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>

        <el-header>
          <el-header>
            <span>{{ userInfo.username }}</span>
            <el-button type="primary" @click="logout">退出登录</el-button>
          </el-header>
        </el-header>

        <el-main>
          <el-breadcrumb separator=">" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{ $route.name }}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo"
    })
  },
  methods: {
    ...mapActions({
      changeUser:"changeUser"
    }),
    // 退出，清除vuex 本地储存
    logout(){
      // changeUser 对象形式
      this.changeUser({})
      this.$router.push("/login")
    }
  }
};
</script>

<style scoped>
.won {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background-color: rgb(213, 247, 213);
}
</style>
