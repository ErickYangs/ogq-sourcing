<template>
  <div class="sign" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="sign_box">
      <i @click="$router.push({ path: '/' })" class="tohome el-icon-upload"></i>
      <div class="title">
        <span class="active">Sign Up</span>/
        <span @click="$router.push({ path: '/signin' })">Sign In</span>
      </div>
      <div class="form_box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >Sign Up</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import https from "@/api";
import { getToken, setToken, setNews } from "@/utils/auth";

export default {
  data() {
    return {
      ruleForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      fullscreenLoading: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //   alert('submit!');
          this.handlerRegister();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    async handlerRegister() {
      this.fullscreenLoading = true;
      try {
        let params = { ...this.ruleForm };
        params.password = this.$utils.Encrypt(params.password);
        console.log(params);
        let result = await https.register(params);
        console.log(result);
        this.fullscreenLoading = false;
        if (result.desc == "SUCCESS" && result.error === 0) {
          console.log(result.result);
          setNews("userName", result.result.userName);
          setToken(result.result.token);
          this.$message.success("SignUp Success!");
          this.$router.push({ name: "Home" });
        } else {
          this.$message.error(result.desc);
        }
      } catch (error) {
        this.fullscreenLoading = false;
      }
      this.fullscreenLoading = false;
    }
  }
};
</script>

<style lang="less" scoped>
.sign {
  .sign_box {
    width: 500px;
    // height: 400px;
    // background: #ccc;
    box-shadow: 0 0 10px #ccc;
    margin: 200px auto;
    padding: 40px;
    .tohome {
      font-size: 40px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .title {
      line-height: 50px;
      font-size: 30px;
      color: #000;
      text-align: center;
      font-weight: 800;
      span {
        cursor: pointer;
      }
      span.active {
        color: #409eff;
      }
    }
    .form_box {
      margin-top: 40px;
      //   height: 200px;
      //   background: #000;
    }
  }
}
</style>
