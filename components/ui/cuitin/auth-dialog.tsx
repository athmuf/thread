'use client';
import { Dialog } from '../dialog';
import LoginForm from './login-form';
import RegisterForm from './register-form';
import { useAppSelector, useAppDispatch } from '@/src/hooks/redux-hooks';
import { closeDialog } from '@/src/features/auth-dialog/auth-dialog-slice';

const AuthDialog = () => {
  const dispatch = useAppDispatch();
  const { open, type } = useAppSelector(state => state.AuthDialog);

  const getFormType = () => {
    if (type === 'register') {
      return <RegisterForm />;
    } else {
      return <LoginForm />;
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => dispatch(closeDialog())}>
      {getFormType()}
    </Dialog>
  );
};

export default AuthDialog;
