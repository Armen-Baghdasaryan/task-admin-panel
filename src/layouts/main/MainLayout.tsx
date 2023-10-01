import { Outlet } from 'react-router-dom';
import Header from 'components/Header/Header.tsx';
import { Layout } from 'antd';

const MainLayout = () => {
  return (
    <div className="container">
      <Header title="Main" />
      <Layout className="full-height">
        <Outlet />
      </Layout>
    </div>
  );
};

export default MainLayout;
