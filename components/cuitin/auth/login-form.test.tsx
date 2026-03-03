/**
 * skenario testing
 *
 * - LoginForm component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login dispatch when login button is clicked
 */

import { describe, expect, it, vi, beforeEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import LoginForm from './login-form';
import authReducer from '@/src/features/auth/auth-slice';
import authDialogReducer from '@/src/features/auth-dialog/auth-dialog-slice';

// Mock sonner
vi.mock('sonner');

const makeStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      authDialog: authDialogReducer,
    },
  });

// Helper render with provider
const renderWithProvider = (store = makeStore()) => {
  return render(
    <Provider store={store}>
      <LoginForm />
    </Provider>,
  );
};

describe('LoginForm component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    renderWithProvider();
    const emailInput = screen.getByPlaceholderText('johndoe@example.com');

    // Action
    await userEvent.type(emailInput, 'john@example.com');

    // Assert
    expect(emailInput).toHaveValue('john@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    renderWithProvider();
    const passwordInput = screen.getByLabelText('Password');

    // Action
    await userEvent.type(passwordInput, 'password123');

    // Assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login dispatch when login button is clicked', async () => {
    // Arrange
    const store = makeStore();
    vi.spyOn(store, 'dispatch');
    renderWithProvider(store);

    await userEvent.type(
      screen.getByPlaceholderText('johndoe@example.com'),
      'john@example.com',
    );
    await userEvent.type(screen.getByLabelText('Password'), 'password123');

    // Action
    await userEvent.click(screen.getByRole('button', { name: /loqgin/i }));

    // Assert
    expect(store.dispatch).toHaveBeenCalled();
  });
});
