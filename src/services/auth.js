/* 登录请求 */
import { post } from "../utils/request";

/**
 * 管理员登录接口
 * 默认的用户名密码为：admin/admin@12138
 * @param {*} data
 */
export const loginAPI = (data) => post("/api/v1/auth/manager_login", data);
