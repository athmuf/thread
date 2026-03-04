'use client';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../ui/dialog';
import { toast } from 'sonner';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../../ui/field';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { fetchProfile, login } from '@/src/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import {
  openDialog,
  closeDialog,
} from '@/src/features/auth-dialog/auth-dialog-slice';
import { useEffect } from 'react';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(state => state.auth.login);
  const { open } = useAppSelector(state => state.authDialog);
  const tempEmail =
    useAppSelector(state => state.auth.register.data?.data.user.email) || '';

  const loginSchema = z.object({
    email: z.string().email('Email must be a valid email'),
    password: z.string(),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: tempEmail,
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      await dispatch(login(data))
        .unwrap()
        .then(res => toast.success(res.message || 'Login success'));
      await dispatch(fetchProfile());
      dispatch(closeDialog());
      loginForm.reset();
    } catch (error) {
      const message = error as string;
      const match = message.match(/"(.*?)"/);
      const field = match?.[1] as keyof z.infer<typeof loginSchema> | undefined;

      if (field) {
        loginForm.setError(field, {
          type: 'server',
          message,
        });
      } else {
        loginForm.setError('root', {
          type: 'server',
          message,
        });
      }
    }
  };

  useEffect(() => {
    if (!open) {
      loginForm.reset();
    }
  }, [open, loginForm]);

  return (
    <DialogContent className="py-24">
      <DialogHeader className="items-center">
        <DialogTitle className="text-2xl">Login to Your Account</DialogTitle>
        <DialogDescription>See what’s new on Cuitin by login</DialogDescription>
      </DialogHeader>
      <form onSubmit={loginForm.handleSubmit(onSubmit)}>
        <FieldGroup className="py-6">
          <Controller
            name="email"
            control={loginForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="johndoe@example.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={loginForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  aria-invalid={fieldState.invalid}
                  type="password"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {loginForm.formState.errors.root && (
            <p className="text-sm font-medium text-destructive mb-4">
              {loginForm.formState.errors.root.message}
            </p>
          )}
          <Button
            type="submit"
            className="w-full mt-4 cursor-pointer"
            disabled={isLoading}
          >
            Login
          </Button>
        </FieldGroup>
      </form>
      <DialogFooter className="flex justify-center sm:justify-center">
        <DialogDescription className="text-center">
          Don&quot;t have an account yet?{' '}
          <Button
            type="button"
            variant="link"
            className="cursor-pointer px-0"
            onClick={() => dispatch(openDialog('register'))}
          >
            Register
          </Button>
        </DialogDescription>
      </DialogFooter>
    </DialogContent>
  );
};

export default LoginForm;
