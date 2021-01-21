export const serverUrl = "http://localhost:3009";

/**
 * 若有图片则显示，若没有显示默认图片
 * @param {*} str
 */
export function dalImgUrl(str) {
  if (str) {
    //   startsWith()检测字符串是否以指定的子字符串开始
    if (str.startsWith("http")) {
      return str;
    } else {
      return serverUrl + str;
    }
  } else {
    return "https://ss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b17eca8065380cd726233895a244ad345982818d.jpg";
  }
}
