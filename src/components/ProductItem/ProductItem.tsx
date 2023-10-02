import { IProduct } from 'interfaces/product';
import defaultPhoto from 'assets/images/add-photo.png';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addBasket } from 'store/basket';
import './product-item.scss';

interface PageProps {
  product: IProduct;
  type?: string;
}

const ProductItem = ({ product, type }: PageProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSmall = type === 'small';

  const handleAdd = (e: React.MouseEvent, product: IProduct) => {
    e.stopPropagation();
    dispatch(addBasket(product));
  };

  return (
    <div
      className={`product__item ${!isSmall ? 'product__item2' : null}`}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <img
        src={product.imgPath ? product.imgPath : defaultPhoto}
        alt="prod"
        className={`${isSmall ? 'img__small' : null}`}
      />
      <h3>{product.name}</h3>
      <p className={`${isSmall ? 'description__small' : null}`}>{product.decription}</p>
      <div className="product__price">
        <p>{product.price}$</p>
        <Button onClick={(e) => handleAdd(e, product)} type="primary">
          Add
        </Button>
      </div>
    </div>
  );
};

export default ProductItem;
