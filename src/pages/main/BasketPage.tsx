import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from 'store';
import { useNavigate } from 'react-router-dom';
import defaultPhoto from 'assets/images/add-photo.png';
import { DeleteOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { decreaseQty, deleteFromBasket, increaseQty } from 'store/basket';
import './main-page.scss';

const BasketPage = () => {
  const { basket } = useSelector((store: TRootState) => store.basket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let totalPrice = 0;
  basket.forEach((i) => (totalPrice += i.price * i.qty));

  const handleDelete = (id: string) => {
    dispatch(deleteFromBasket(id));
  };

  const handleAddQty = (id: string) => {
    dispatch(increaseQty(id));
  };

  const handleMinuseQty = (id: string) => {
    dispatch(decreaseQty(id));
  };

  return (
    <div className="basket__container">
      <div className="basket__products">
        <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <Button type="text" onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
        {basket?.map((product) => (
          <div className="basket__product" key={product.id}>
            <div className="basket__section">
              <img src={product.imgPath ? product.imgPath : defaultPhoto} width={50} height={50} alt="prod" />
              <h3>{product.name}</h3>
              <p>{product.price * product.qty}$</p>
              <h4>total: {product.qty}</h4>
            </div>
            <div className="basket__section">
              <Button icon={<PlusCircleOutlined />} onClick={() => handleAddQty(product.id)} />
              <Button icon={<MinusCircleOutlined />} onClick={() => handleMinuseQty(product.id)} />
              <Button danger type="primary" icon={<DeleteOutlined />} onClick={() => handleDelete(product.id)} />
            </div>
          </div>
        ))}
        <div className="basket__buy">
          <p>Total: {totalPrice}$</p>
          <Button disabled={!basket.length} type="primary">
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
