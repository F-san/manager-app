import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Table, Modal } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { listByPageAPI } from "../services/products_categories";
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
            style={{ maxWidth: "120px", maxHeight: "120px" }}
          />
        );
      },
    },
    {
      title: "操作",
      align: "center",
      render() {
        return (
          <>
            <Tooltip title="编辑">
              <Button
                style={{ marginRight: "1rem" }}
                type="primary"
                icon={<EditOutlined />}
              />
            </Tooltip>
            <Tooltip title="删除">
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </>
        );
      },
    },
  ];
  const [visible, setVisible] = useState(false);
  const [list, setList] = useState([]);
  const loadData = async () => {
    const res = await listByPageAPI();
    setList(res.categories);
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
            onClick={() => setVisible(true)}
          />
        </Tooltip>
      }
    >
      <Table columns={columns} bordered dataSource={list} />
      <Modal
        title="新增"
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </Card>
  );
}

export default Productcategories;
