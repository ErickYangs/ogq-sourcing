import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import NewEvidence from "@/components/NewEvidence";
import ReviewEvidence from "@/components/ReviewEvidence";
import Confirm from "@/components/Confirm";
import EvidenceRecord from "@/components/EvidenceRecord";
import DetailEvidence from "@/components/DetailEvidence";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SignIn";
import axios from "axios";
import { getToken, setToken, setNews, getNews } from "@/utils/auth";
import { Message } from "element-ui";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/detailEvidence/:id",
      name: "detailEvidence",
      component: DetailEvidence,
    },
    // {
    //   path: "/signup",
    //   name: "signup",
    //   component: SignUp
    // },
    // {
    //   path: "/signin",
    //   name: "signin",
    //   component: SignIn
    // }
  ],
});

function jumpTo(target, origin, next) {
  if (target.name !== origin.name) {
    return next(target);
  }
  return next();
}

// Route guard judges access_token
// router.beforeEach(async (to, from, next) => {
//   let toPath = to.name;
//   if (toPath == "detailEvidence") {
//     if (!getToken() && !getNews("userName")) {
//       Message({ message: "Please login first!", type: "error" });
//       jumpTo({ name: "Home" }, to, next);
//       return;
//     } else {
//       next();
//       return;
//     }
//   }
//   next();
// });

export default router;
