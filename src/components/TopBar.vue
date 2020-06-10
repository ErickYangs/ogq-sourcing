<template>
  <div id="topBar">
    <el-row type="flex" class="row-bg" justify="end" v-if="noLogin">
      <el-col :span="16" class="flex_row_clo">
        <img id="logo" src="../assets/1544778551.png" alt @click="toHomePage" />
      </el-col>
      <el-col :span="8">
        <el-button
          type="info"
          size="mini"
          round
          @click="$router.push({ path: '/signin' })"
          >登录/注册</el-button
        >
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="end" v-else>
      <el-col :span="12">
        <img id="logo" src="../assets/1544778551.png" alt @click="toHomePage" />
      </el-col>
      <el-col class="aliens" :span="12" style="text-align:right;">
        <img src="../assets/img/avatar.png" style="width:3rem;" alt />
        <span>{{ userName }}</span>
        <el-button
          style="margin-left: 20px;"
          type="info"
          round
          size="mini"
          @click="signOut"
          >退出登录</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getToken, setToken, setNews, getNews, clear } from "@/utils/auth";

export default {
  data() {
    return {
      cusor: "cusor",
      noLogin: true, //默认未登录
      userName: "", //用户名
      token: ""
    };
  },
  methods: {
    toLogin() {
      //登录
      this.$router.push({ name: "signin" });
    },
    toNewEvidence() {
      this.$router.push({ name: "newEvidence" });
    },
    toHomePage() {
      //首页
      if (this.$route.name == "Home") {
        window.location.reload();
      } else {
        this.$router.push({ name: "Home" });
      }
    },
    signOut() {
      //退出
      this.$confirm("确定退出当前登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定
          (this.noLogin = true), //默认未登录
            clear();
          this.$router.push({ name: "Home" });
        })
        .catch(() => {});
    }
  },
  mounted() {
    if (getToken() && getNews("userName")) {
      this.noLogin = false;
      (this.userName = getNews("userName")), (this.token = getToken());
    }
  }
};
</script>

<style lang="less" scoped>
#topBar {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  padding: 0 5rem;
  background: #fff;
}
.aliens {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#logo {
  cursor: pointer;
  display: block;
  width: 90px;
  transform: translateY(10px);
}
.el-button--info {
  color: #fff;
  background-color: #000;
}
.el-col.el-col-8 {
  text-align: right;
}
</style>
