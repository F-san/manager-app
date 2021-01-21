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
  Upload,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  listByPageAPI,
  saveAPI,
  delAPI,
} from "../services/products_categories";
import { dalImgUrl, uploadUrl } from "../utils/tools";

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
  const [loading, setLoading] = useState(false);
  // 当前图片
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const loadData = async (page = 1) => {
    const res = await listByPageAPI({ page });
    setList(res.categories);
    setTotal(res.totalCount);
  };
  const saveHandle = (value) => {
    saveAPI({ ...value, coverImg: imageUrl }).then(() => {
      loadData();
      setVisible(false);
    });
  };
  // 图片上传状态改变
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setLoading(false);
      console.log(info);
      setImageUrl(info.file.response.info);
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
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
              setImageUrl("");
              // 设置表单的默认值
              form.setFieldsValue({
                name: "",
                coverImg: "",
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
          <Form.Item
            name="coverImg"
            label="图片"
            rules={[
              {
                required: true,
                message: "请上传图片！",
              },
            ]}
          >
            <Upload
              // name 表示服务器端接收到的数据的name属性
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={uploadUrl}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img
                  src={dalImgUrl(imageUrl)}
                  alt="file"
                  style={{ maxWidth: "80%", maxHeight: "80%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
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
