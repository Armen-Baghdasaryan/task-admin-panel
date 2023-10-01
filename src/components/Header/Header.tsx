import { Button } from 'antd';
import useLogout from '../../hooks/useLogout.ts';
import './header.scss';

interface PageProps {
  title?: string;
}

const AdminHeader = ({ title='Admin' }: PageProps) => {
  const logout = useLogout();

  return (
    <div className="admin__header">
      <h2>{title} Header</h2>
      <Button danger type='primary' onClick={logout}>Log Out</Button>
    </div>
  );
};

export default AdminHeader;
