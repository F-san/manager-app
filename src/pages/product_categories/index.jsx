import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Table, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { listByPageAPI, delAPI } from "../../services/products_categories";
import { dalImgUrl } from "../../utils/tools";
import Editor from "./components/Editor";
function Productcategories() {
  const columns = [
    {
      title: "序号",
      align: "center",
      width: 80,
      // 参数分别为当前行的值，当前行数据，行索引
      render(text, record, index) {
        return <>{index + 1}</>;
      },
    },
    {
      title: "分类名称",
      align: "center",
      dataIndex: "name",
    },
    {
      title: "详细信息",
      align: "center",
      dataIndex: "description",
    },
    {
      title: "主图",
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
                onClick={() => {
                  setVisible(true);
                  setCurrent({
                    id: r._id,
                    name: r.name,
                    coverImg: r.coverImg,
                  });
                }}
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
  //当前数据
  const [current, setCurrent] = useState({});
  const loadData = async (page = 1) => {
    const res = await listByPageAPI({ page });
    setList(res.categories);
    setTotal(res.totalCount);
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
              setVisible(true);
              //  设置当前数据为空
              setCurrent({
                id: "",
                name: "",
                coverImg: "",
              });
            }}
          />
        </Tooltip>
      }
    >
      <Table
        columns={columns}
        bordered
        rowKey="_id"
        dataSource={list}
        pagination={{
          total,
          pageSize: 10,
          onChange(page) {
            loadData(page);
          },
        }}
      />
      <Editor
        visible={visible}
        setVisible={setVisible}
        loadData={loadData}
        current={current}
      />
    </Card>
  );
}

export default Productcategories;
