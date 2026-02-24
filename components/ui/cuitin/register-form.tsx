'use client';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { toast } from 'sonner';
import { Input } from '../input';
import { Button } from '../button';
import { useForm, Controller } from 'react-hook-form';
import { Field, FieldError, FieldGroup, FieldLabel } from '../field';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '@/src/features/auth/auth-slice';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';

const RegisterForm = () => {
  const dispatch = useAppDispatch();

  const { isLoading } = useAppSelector(state => state.auth.register);

  const registerSchema = z.object({
    name: z.string().min(1, 'Name is not allowed to be empty'),
    email: z
      .string()
      .min(1, 'Email is not allowed to be empty')
      .email('Email must be a valid email'),
    password: z.string().min(1, 'Password is not allowed to be empty'),
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      await dispatch(register(data))
        .unwrap()
        .then(res => toast.success(res.message));
    } catch (error) {
      const message = error as string;
      const fields = ['name', 'email', 'password'] as const;

      const matchedField = fields.find(field =>
        message.toLowerCase().includes(field),
      );
      if (matchedField) {
        registerForm.setError(matchedField, {
          type: 'server',
          message,
        });
      } else {
        registerForm.setError('root', {
          type: 'server',
          message,
        });
      }
    }
  };
  return (
    <DialogContent className="py-24">
      <DialogHeader className="items-center">
        <DialogTitle className="text-2xl">Create an account</DialogTitle>
        <DialogDescription>
          Create an account to explore cuitin
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={registerForm.handleSubmit(onSubmit)}>
        <FieldGroup className="py-6">
          <Controller
            name="name"
            control={registerForm.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="John Doe"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={registerForm.control}
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
            control={registerForm.control}
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
          <Button
            type="submit"
            className="w-full mt-4 cursor-pointer"
            disabled={isLoading}
          >
            Register
          </Button>
        </FieldGroup>
      </form>
      <DialogFooter className="flex justify-center sm:justify-center">
        <DialogDescription className="text-center">
          Already have an account?{' '}
          <Button type="button" variant="link" className="cursor-pointer px-0">
            Login
          </Button>
        </DialogDescription>
      </DialogFooter>
    </DialogContent>
  );
};

export default RegisterForm;
