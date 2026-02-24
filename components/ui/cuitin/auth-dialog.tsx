'use client';
import { Dialog } from '../dialog';
import RegisterForm from './register-form';

const AuthDialog = () => {
  return (
    <Dialog open={true}>
      <RegisterForm />
    </Dialog>
  );
};

export default AuthDialog;
