import { Link } from 'react-router-dom';

export const EmailNotVerified: React.FC = () => {

  return (
    <>
      <h2>Email not verified</h2>
      <Link to="/auth/login">Back to Login</Link>
    </>
  );
};
