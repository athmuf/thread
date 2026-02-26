'use client';
import { Dialog } from '../dialog';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { useAppSelector } from '@/src/hooks/redux-hooks';

const AuthDialog = () => {
  const { open, type } = useAppSelector(state => state.AuthDialog);
  console.log(type, 'ini tope');

  const getFormType = () => {
    if (type === 'register') {
      return <RegisterForm />;
    } else {
      return <LoginForm />;
    }
  };

  return <Dialog open={open}>{getFormType()}</Dialog>;
};

export default AuthDialog;
