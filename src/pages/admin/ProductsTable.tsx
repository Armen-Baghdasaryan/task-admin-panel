import { useState } from 'react';
import { TablePaginationConfig } from 'antd/lib/table';
import { Button, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { deleteProduct, setCurrentProduct, toggleEditModal } from 'store/products';
import { IProduct } from 'interfaces/product';
import './admin-page.scss';

const ProductsTable = () => {
  const { products } = useSelector((store: TRootState) => store.products);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    total: products.length,
    showSizeChanger: true,
    showQuickJumper: true,
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'decription',
      key: 'decription',
      sorter: true,
      render: (text: string) => <div className="custom-description-cell">{text}</div>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: IProduct) => (
        <div className="custom-actions-cell">
          <Button type="primary" onClick={() => handleEdit(record)} icon={<EditOutlined />} />
          <Button
            className="ml-8"
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setPagination(pagination);
  };

  const handleEdit = (record: IProduct) => {
    dispatch(setCurrentProduct(record))
    setTimeout(() => {
      dispatch(toggleEditModal(true));
    }, 100)
  };

  const handleDelete = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <Table
      dataSource={products}
      pagination={{
        ...pagination,
        showTotal: (total) => <span className="pagination__total">Total {total} Items</span>,
      }}
      columns={columns}
      onChange={handleTableChange}
      scroll={{ x: 'max-content' }}
      rowKey="id"
    />
  );
};

export default ProductsTable;
