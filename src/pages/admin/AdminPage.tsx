import { Button } from 'antd';
import ProductsTable from './ProductsTable';
import AddProductModal from 'components/AddProductModal/AddProductModal';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'store/products';
import EditProductModal from 'components/EditProductModal/EditProductModal';
import './admin-page.scss';

const AdminPage = () => {
  const dispatch = useDispatch();

  return (
    <div className="admin__wrapper">
      <div className="admin__add">
        <Button type="primary" onClick={() => dispatch(toggleModal(true))}>
          Add
        </Button>
      </div>
      <div>
        <ProductsTable />
      </div>
      <AddProductModal />
      <EditProductModal />
    </div>
  );
};

export default AdminPage;
