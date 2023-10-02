import { Button } from 'antd';
import ProductsTable from './ProductsTable';
import AddProductModal from 'components/AddProductModal/AddProductModal';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/products';
import EditProductModal from 'components/EditProductModal/EditProductModal';
import { IProduct } from 'interfaces/product';
import { useState } from 'react';
import './admin-page.scss';

const AdminPage = () => {
  const dispatch = useDispatch();
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);

  return (
    <div className="admin__wrapper">
      <div className="admin__add">
        <Button type="primary" onClick={() => dispatch(toggleModal(true))}>
          Add
        </Button>
      </div>
      <div>
        <ProductsTable setCurrentProduct={setCurrentProduct} />
      </div>
      <AddProductModal />
      <EditProductModal currentProduct={currentProduct} />
    </div>
  );
};

export default AdminPage;
