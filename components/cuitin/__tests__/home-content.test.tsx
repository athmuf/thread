import { describe, beforeEach, afterEach, vi, it, expect } from "vitest";
import { render, screen, cleanup } from '@testing-library/react';
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userEvent from '@testing-library/user-event';
import HomeContent from "../home-content";
import threadsReducer from "@/src/features/threads/threads-slice"
import usersReducer from "@/src/features/users/users-slice"
import authReducer from "@/src/features/auth/auth-slice"
import leaderboardsReducer from "@/src/features/leaderboards/leaederboards-slice"

/**
 * Test Scenarios:
 *
 * - homeContent component
 *   - should render the default tab content on initial render
 *   - should update active tab and display corresponding content when a tab is clicked
 */

const mockPush = vi.fn();
const mockGet = vi.fn()

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  useSearchParams: () => ({
    get: mockGet,
    toString: () => '',
  }),
}));

vi.mock('../leaderboards/leaderboards', () => ({
  default: () => <div data-testid="leaderboards">Leaderboards</div>,
}));

vi.mock('../category/category-content', () => ({
  default: () => <div data-testid="category-content">Category</div>,
}));

vi.mock('../threads/thread-list', () => ({
  default: () => <div data-testid="threads">News</div>,
}));

vi.mock('../detail-thread/create-thread', () => ({
  default: () => <div data-testid="create-thread">Create thread</div>,
}));

describe('homeContent component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGet.mockReturnValue(null);
  });

  afterEach(() => {
    cleanup();
  });

  const makeStore = () =>
  configureStore({
    reducer: {
      threads: threadsReducer,
      users: usersReducer,
      leaderboards: leaderboardsReducer,
      auth: authReducer,
    },
  });

const renderComponent = (store = makeStore()) => {
  return render(
    <Provider store={store}>
      <HomeContent />
    </Provider>,
  );
};

  it('should render the default tab content on initial render', () => {
    // Arrange & Act
    renderComponent();

    // Assert
    expect(screen.getByTestId('threads')).toBeInTheDocument();
    expect(screen.getByTestId('create-thread')).toBeInTheDocument();
    expect(screen.queryByTestId('category-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('leaderboards')).not.toBeInTheDocument();
  });

  it('should display category content when category tab is clicked', async () => {
    // Arrange
    mockGet.mockReturnValue('category');
    const user = userEvent.setup({ delay: null });
    renderComponent();

    // Action
    await user.click(screen.getByRole('tab', { name: /Category/i }));

    // Assert
    expect(screen.getByTestId('category-content')).toBeInTheDocument();
    expect(screen.queryByTestId('threads')).not.toBeInTheDocument();
  });

  it('should display leaderboard content when leaderboard tab is clicked', async () => {
    // Arrange
    mockGet.mockReturnValue('leaderboard');
    const user = userEvent.setup({ delay: null });
    renderComponent();

    // Act
    await user.click(screen.getByRole('tab', { name: /Leaderboards/i }));

    // Assert
    expect(screen.getByTestId('leaderboards')).toBeInTheDocument();
    expect(screen.queryByTestId('threads')).not.toBeInTheDocument();
  });
});