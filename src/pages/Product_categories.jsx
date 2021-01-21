import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Tooltip,
  Table,
  Modal,
  Form,
  Input,
  Popconfirm,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  listByPageAPI,
  saveAPI,
  delAPI,
} from "../services/products_categories";
import { dalImgUrl } from "../utils/tools";

function Productcategories() {
  const columns = [
    {
      title: "序号",
      align: "center",
      width: 80,
      render(txt, record, index) {
        return <>{index + 1}</>;
      },
    },
    {
      title: "商品名称",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "详细信息",
      align: "center",
      dataIndex: "description",
    },
    {
      title: "图片",
      align: "center",
      render(t, r) {
        return (
          <img
            src={dalImgUrl(r.coverImg)}
            alt={r.name}
            style={{ maxWidth: "120px", maxHeight: "100px" }}
          />
        );
      },
    },
    {
      title: "操作",
      align: "center",
      render(t, r) {
        return (
          <>
            <Tooltip title="编辑">
              <Button
                style={{ marginRight: "1rem" }}
                type="primary"
                icon={<EditOutlined />}
              />
            </Tooltip>

            <Popconfirm
              title="确认删除？"
              onConfirm={() => {
                delAPI(r._id).then(() => {
                  loadData();
                });
              }}
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </>
        );
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  // 商品总数
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  const loadData = async (page = 1) => {
    const res = await listByPageAPI({ page });
    setList(res.categories);
    setTotal(res.totalCount);
  };
  const saveHandle = (value) => {
    saveAPI(value).then(() => {
      loadData();
      setVisible(false);
    });
  };
  // 初始化执行
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Card
      title="商品分类"
      extra={
        <Tooltip title="新增">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              // 设置表单的默认值
              form.setFieldsValue({
                name: "",
              });
              setVisible(true);
            }}
          />
        </Tooltip>
      }
    >
      <Table
        columns={columns}
        bordered
        dataSource={list}
        pagination={{
          total,
          pageSize: 10,
          onChange(page) {
            loadData(page);
          },
        }}
      />
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
          <Form.Item>
            <Button block type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}

export default Productcategories;
