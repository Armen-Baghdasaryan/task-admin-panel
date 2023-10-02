import { useSelector } from 'react-redux';
import { TRootState } from 'store';
import ProductItem from 'components/ProductItem/ProductItem';
import './main-page.scss';

const MainPage = () => {
  const { products } = useSelector((store: TRootState) => store.products);

  return (
    <div className="main__wrapper">
      <div className="main__products">
        {products?.map((product) => (
          <ProductItem key={product.id} product={product} type="small" />
        ))}
      </div>
    </div>
  );
};

export default MainPage;
