import React, { useState } from "react";
import { Card, Button, Tooltip, Table, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
function Productcategories() {
  const columns = [
    {
      title: "序号",
      align: "center",
    },
    {
      title: "商品名称",
      align: "center",
    },
    {
      title: "详细信息",
      align: "center",
    },
    {
      title: "图片",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
    },
  ];
  const [visible, setVisible] = useState(false);
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
      <Table columns={columns} bordered />
      <Modal
        title="新增"
        visible={visible}
        onCancel={() => setVisible(false)}
      />
    </Card>
  );
}

export default Productcategories;
