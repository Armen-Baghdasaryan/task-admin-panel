import { Layout } from 'antd';
import Header from 'components/Header/Header';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="container">
      <Header />
      <Layout className='full-height'>
        <Outlet />
      </Layout>
    </div>
  );
}

export default AdminLayout;
