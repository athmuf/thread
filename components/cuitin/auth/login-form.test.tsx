/**
 * skenario testing
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login dispatch when login button is clicked
 */

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginForm from './login-form';
import authReducer from '@/src/features/auth/auth-slice';
import authDialogReducer, {
  openDialog,
} from '@/src/features/auth-dialog/auth-dialog-slice';
import { Dialog } from '@/components/ui/dialog';

vi.mock('sonner');

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      authDialog: authDialogReducer,
    },
  });

const renderWithProvider = (store = makeStore()) => {
  store.dispatch(openDialog('login'));

  return render(
    <Provider store={store}>
      <Dialog open={true}>
        <LoginForm />
      </Dialog>
    </Provider>,
  );
};

describe('LoginForm component', () => {
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

  it('should call login dispatch when login button is clicked', async () => {
    // Arrange
    const store = makeStore();
    vi.spyOn(store, 'dispatch');
    renderWithProvider(store);

    const user = userEvent.setup({ delay: null });
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');

    // Action
    await user.click(screen.getByRole('button', { name: /login/i }));

    // Assert
    expect(store.dispatch).toHaveBeenCalled();
  });
});
