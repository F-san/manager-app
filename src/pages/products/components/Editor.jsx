import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import FileUpload from "../../../components/FileUpload";
import { saveAPI, modyfyAPI } from "../../../services/products";
import { listByPageAPI as loadPcAPI } from "../../../services/products_categories";
/*
 * @param {*} param0
 * visible 是否显示弹出窗
 * loadData 加载数据
 * currentId 当前ID
 */
function Editor({ visible, setVisible, loadData, current }) {
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState([]);
  //   useForm 方法获取当前form实例
  const [form] = Form.useForm();
  const [isInited, setIsInited] = useState(false);
  useEffect(() => {
    loadPcAPI().then((res) => {
      setCategory(res.categories);
    });
    // 设置已经初始化
    setIsInited(true);
  }, []);

  // 监听 current 即当前数据的变化。，若变化，则处理
  useEffect(() => {
    setImageUrl(current.coverImg);
    // 若没有初始化,则直接返回
    if (!isInited) return;

    form.setFieldsValue({
      name: current.name,
      coverImg: current.coverImg,
      price: current.price,
      productCategory: current.productCategory,
    });
  }, [current]);
  const saveHandle = (value) => {
    // 根据是否有ID判断是新增还是修改
    if (current.id) {
      modyfyAPI(current.id, { ...value, coverImg: imageUrl }).then(() => {
        loadData();
        setVisible(false);
      });
    } else {
      saveAPI({ ...value, coverImg: imageUrl }).then(() => {
        loadData();
        setVisible(false);
      });
    }
  };
  return (
    <>
      <Modal
        title="新增"
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
      >
        <Form
          form={form}
          onFinish={(values) => {
            // console.log(values);
            saveHandle(values);
          }}
        >
          <Form.Item
            name="name"
            label="名称"
            rules={[
              {
                required: true,
                message: "请填写名称！",
              },
            ]}
          >
            <Input placeholder="请输入商品分类名称" />
          </Form.Item>
          <Form.Item
            name="price"
            label="价格"
            rules={[
              {
                required: true,
                message: "请填写价格！",
              },
            ]}
          >
            <Input placeholder="请输入商品价格" />
          </Form.Item>
          <Form.Item
            name="productCategory"
            label="分类"
            rules={[
              {
                required: true,
                message: "请选择分类！",
              },
            ]}
          >
            <Select placeholder="请选择分类">
              {category.map((item) => (
                <Select.Option key={item._id} value={item._id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="图片"
            rules={[
              {
                required: true,
                message: "请上传图片！",
              },
            ]}
          >
            <FileUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </Form.Item>
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Editor;
