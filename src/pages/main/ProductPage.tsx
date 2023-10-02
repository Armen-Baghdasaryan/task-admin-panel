import { Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductItem from 'components/ProductItem/ProductItem';
import { useSelector } from 'react-redux';
import { TRootState } from 'store';

const ProductPage = () => {
  const { products } = useSelector((store: TRootState) => store.products);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameSegments = location.pathname.split('/');
  const lastSegment = pathnameSegments[pathnameSegments.length - 1];
  const currentProduct = products.find((i) => i.id === lastSegment);

  if (!currentProduct) return;

  return (
    <div className="py-10">
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Button type="text" onClick={() => navigate('/')}>
          Back
        </Button>
      </div>
      <ProductItem product={currentProduct} />
    </div>
  );
};

export default ProductPage;
