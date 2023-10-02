import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Layout className="container">
      <Outlet />
    </Layout>
  );
};
