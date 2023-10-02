import { Button } from 'antd';
import useLogout from '../../hooks/useLogout.ts';
import { IMenuItem } from 'interfaces/menu-items';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { TRootState } from 'store';
import './header.scss';
interface PageProps {
  title?: string;
  type?: string;
}

const menuItems: IMenuItem[] = [
  {
    id: '1',
    name: 'Products',
    path: 'products',
  },
  {
    id: '2',
    name: 'Delivery',
    path: 'delivery',
  },
  {
    id: '3',
    name: 'About',
    path: 'about',
  },
];

const AdminHeader = ({ title = 'Admin', type }: PageProps) => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { basket } = useSelector((store: TRootState) => store.basket);
  const isMain = type === 'main';

  return (
    <>
      <div className="admin__header">
        <h2>{title}</h2>
        {isMain && (
          <div className="menu__items">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        )}
        <div>
          <Button danger type="primary" onClick={logout}>
            Log Out
          </Button>
        </div>
      </div>

      {isMain && (
        <div className="basket__wrapper">
          <div className="basket" onClick={() => navigate('basket')}>
            <ShoppingCartOutlined />
            <p>{basket.length}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminHeader;
