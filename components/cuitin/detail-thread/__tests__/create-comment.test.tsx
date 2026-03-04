import { describe, beforeEach, afterEach, vi, it, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/src/features/auth/auth-slice';
import detailThreadReducer from '@/src/features/detail-thread/detail-thread-slice';
import CreateComment from '../create-comment';
import { Provider } from 'react-redux';
import { initialState as initialAuthState } from '@/src/features/auth/auth-slice';
import userEvent from '@testing-library/user-event';

/**
 * skenario testing
 *
 * - createComment component
 *   - should render createComment component when authenticated
 *   - should not render createComment component when unauthenticated
 *   - should handle comment input correctly
 */

describe('createComment component', () => {
  const reducers = {
    auth: authReducer,
    detailThread: detailThreadReducer,
  };

  type RootState = ReturnType<ReturnType<typeof configureStore>['getState']>;

  const makeStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
      reducer: reducers,
      preloadedState: preloadedState as RootState,
    });

  const renderWithProvider = (store = makeStore()) => {
    return render(
      <Provider store={store}>
        <CreateComment />
      </Provider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render createComment component when authenticated', async () => {
    // Arrange
    const store = makeStore({
      auth: {
        ...initialAuthState,
        isAuthenticated: true,
      },
    });

    // Action
    renderWithProvider(store);

    // Assert
    expect(
      screen.getByPlaceholderText('Posting your reply...'),
    ).toBeInTheDocument();
  });

  it('should not render createComment component when unauthenticated', async () => {
    // Arrange
    const store = makeStore({
      auth: {
        ...initialAuthState,
        isAuthenticated: false,
      },
    });

    // Action
    renderWithProvider(store);

    // Assert
    expect(
      screen.queryByPlaceholderText('Posting your reply...'),
    ).not.toBeInTheDocument();
  });

  it('should handle comment input correctly', async () => {
    // Arrange
    const store = makeStore({
      auth: {
        ...initialAuthState,
        isAuthenticated: true,
      },
    });
    renderWithProvider(store);
    const commentInput = screen.getByPlaceholderText('Posting your reply...');
    const replyButton = screen.getByRole('button', { name: /reply/i });

    expect(replyButton).toBeDisabled();

    // Action
    const user = userEvent.setup({ delay: null });
    await await user.type(commentInput, 'i agree with you');

    expect(commentInput).toHaveValue('i agree with you');
    expect(replyButton).toBeEnabled();
  });
});
