import request from "@/utils/request";

export default {
  // register(data) {
  //   return request({
  //     url: `/api/v1/source/register`,
  //     method: "POST",
  //     data
  //   });
  // },
  // loginFn(data) {
  //   return request({
  //     url: `/api/v1/source/login`,
  //     method: "POST",
  //     data
  //   });
  // },
  searchFn(data) {
    return request({
      url: "/api/v1/witness/proof/" + data,
      method: "GET",
    });
  },
  witnessFn(data) {
    return request({
      url: "/api/v1/witness/block/" + data,
      method: "GET",
    });
  },
};
