/**
 * skenario testing
 *
 * - RegisterForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should show error when email is invalid
 *   - should show error when password is invalid
 *   - should not dispatch register when validation fails
 *   - should call register dispatch when register button is clicked with valid data
 */

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/src/features/auth/auth-slice';
import authDialogReducer, {
  openDialog,
} from '@/src/features/auth-dialog/auth-dialog-slice';
import { Dialog } from '@/components/ui/dialog';
import RegisterForm from '../register-form';
import * as api from '@/src/utils/api';

describe('LoginForm component', () => {
  vi.mock('sonner');

  vi.mock('@/src/utils/api', () => ({
    register: vi.fn(),
    login: vi.fn(),
    getProfile: vi.fn(),
  }));

  const makeStore = () =>
    configureStore({
      reducer: {
        auth: authReducer,
        authDialog: authDialogReducer,
      },
    });

  const renderWithProvider = (store = makeStore()) => {
    store.dispatch(openDialog('register'));

    return render(
      <Provider store={store}>
        <Dialog open={true}>
          <RegisterForm />
        </Dialog>
      </Provider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    renderWithProvider();
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');

    // Action
    const user = userEvent.setup({ delay: null });
    await await user.type(emailInput, 'john@example.com');

    // Assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    renderWithProvider();
    const passwordInput = screen.getByLabelText('Password');

    // Action
    const user = userEvent.setup({ delay: null });
    await user.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should show error when email is invalid', async () => {
    // Arrange
    renderWithProvider();
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');

    // Action
    const user = userEvent.setup({ delay: null });
    await await user.type(emailInput, 'john#example.com');
    await user.click(screen.getByRole('button', { name: /register/i }));

    // Assert
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(
      await screen.findByText(/Email must be a valid email/i),
    ).toBeInTheDocument();
  });

  it('should show error when password is invalid', async () => {
    // Arrange
    renderWithProvider();
    const passwordInput = screen.getByLabelText('Password');

    // Action
    const user = userEvent.setup({ delay: null });
    // User not input password
    await user.click(screen.getByRole('button', { name: /register/i }));

    // Assert
    expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
    expect(
      await screen.findByText(/Password is not allowed to be empty/i),
    ).toBeInTheDocument();
  });

  it('should not dispatch register when validation fails', async () => {
    renderWithProvider();
    // Arrange
    const store = makeStore();
    vi.spyOn(store, 'dispatch');
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');
    const passwordInput = screen.getByLabelText('Password');

    // Action
    const user = userEvent.setup({ delay: null });
    await await user.type(emailInput, 'john#example.com');
    await await user.type(passwordInput, 'password123');
    await user.click(screen.getByRole('button', { name: /register/i }));

    // Assert
    expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should call register dispatch when register button is clicked with valid data', async () => {
    // Arrange
    vi.mocked(api.register).mockResolvedValue({
      status: 'success',
      message: 'Create account success',
      data: {
        user: {
          id: 'John Doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: '',
        },
      },
    });

    const store = makeStore();
    renderWithProvider(store);
    const nameInput = screen.getByPlaceholderText('John Doe');
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');
    const passwordInput = screen.getByLabelText('Password');

    // Action
    const user = userEvent.setup({ delay: null });
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /register/i }));

    // Assert
    expect(nameInput).toHaveAttribute('aria-invalid', 'false');
    expect(emailInput).toHaveAttribute('aria-invalid', 'false');
    expect(passwordInput).toHaveAttribute('aria-invalid', 'false');
  });
});
