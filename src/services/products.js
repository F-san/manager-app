/* 商品信息接口 */

import { get, post, put, del } from "../utils/request";

/**
 * 获取商品列表
 * @param {*} params
 * page 页码
 * per  每一页显示的数量
 */
export const listByPageAPI = (params) => get("/api/v1/admin/products", params);

/**
 * 新增
 * @param {*} data
 */
export const saveAPI = (data) => post("/api/v1/admin/products", data);

/**
 *根据ID修改
 * @param {*} id
 * @param {*} data
 */
export const modyfyAPI = (id, data) =>
  put(`/api/v1/admin/products/${id}`, data);

/**
 * 根据ID删除
 * @param {*} id
 */
export const delAPI = (id) => del(`/api/v1/admin/products/${id}`);
