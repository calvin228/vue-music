import { createRouter, createWebHistory } from "vue-router";
import Home from "@/page/Home";
import Result from "@/page/Result";

const routes = [
    { path: "/", component: Home , name: "home"},
    { path: "/result", component: Result , name: "result"}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
