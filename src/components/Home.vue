<template>
  <div class="home" v-loading.fullscreen.lock="fullscreenLoading">
    <TopBar></TopBar>
    <div class="searchBar">
      <div class="searchInput">
        <input
          v-model="inputvalue"
          @keyup.enter="search"
          type="text"
          autocomplete="off"
          placeholder="Please enter hash"
          value
          id="id_hash"
          style="vertical-align: middle;"
        />
        <el-button
          size="small"
          type="primary"
          round
          class="searchIcon"
          @click="search"
          >Search</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import TopBar from "./TopBar";
import dateFormat from "../util/dateFormat";
import https from "@/api";
import { getToken, setToken, setNews, getNews } from "@/utils/auth";

export default {
  components: {
    TopBar
  },
  data() {
    return {
      firstFlag: true, //首次显示内容true false:搜索内容
      inputvalue: "", //输入框值
      allNum: 0, //信息条数
      searchContent: [],
      loading: false, //搜索加载
      detailFlag: true,
      type: "",
      searchUrl: "",
      intervalBlock2c: null,
      intervalBlock2b: null,
      fullscreenLoading: false
    };
  },
  created() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    async search() {
      if (!this.inputvalue) return;

      this.fullscreenLoading = true;
      let result = await https.searchFn(this.inputvalue);
      console.log(result);
      this.fullscreenLoading = false;
      if (result.desc == "SUCCESS" && result.error === 0) {
        this.$router.push({
          name: "detailEvidence",
          params: {
            id: this.inputvalue
          }
        });
      } else {
        this.$message.error(result.desc);
      }
    }
  }
};
</script>
<style scoped>
button.el-button.el-button--default {
  position: absolute;
  right: 5%;
  top: 5%;
}
.searchBar {
  width: 100%;
  height: 330px;
  background: url(../assets/img/topBanner.png) no-repeat;
  background-size: 100% 100%;
}
.searchInput {
  width: 70%;
  position: relative;
  left: 15%;
  top: 40%;
}
.load {
  margin-top: 40px;
}
.load img {
  width: 4%;
}
.searchIcon {
  position: absolute;
  right: 2%;
  font-size: 1.2rem;
  float: right;
  top: 24%;
}
.el-button--small,
.el-button--small.is-round {
  padding: 9px 20px;
}
.el-table .cell {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: normal;
  word-break: unset !important;
  line-height: 23px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
}
input {
  width: 100%;
  padding: 1rem;
  border-radius: 30px;
  border: 5px solid #019fff;
  background-color: #fff;
  outline: none;
  height: 5rem;
  font-size: 1.5rem;
}
.content,
.searchContent {
  width: 85%;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  padding: 3rem 0 8rem 0;
  margin-bottom: 5rem;
}
.content_data,
.search_data {
  margin: 0 auto;
  padding: 0 3rem;
}
.content_title {
  font-size: 2rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
  height: 50px;
}
.el-row {
  text-align: center;
  margin: 0 auto;
  border-bottom: 1px solid #efecec;
  padding-bottom: 10px;
  vertical-align: middle;
  height: 45px;
  line-height: 45px;
}
.el-table thead {
  color: #3f4042;
}
.searchTop {
  font-size: 2rem;
}
.num {
  margin-left: 10px;
}
.el-col-7 {
  width: 29.16667%;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
