import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Elements';
import { useAuthContext } from '@/lib/auth';

import { Layout } from '../components/Layout';

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const handleLoginClick = async () => {
    await auth?.signIn('google');
    navigate('/app');
  };

  return (
    <Layout title="Log in to your account">
      <Button onClick={handleLoginClick}>Login</Button>
    </Layout>
  );
};
