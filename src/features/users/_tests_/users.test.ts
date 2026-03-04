import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import reducer, { fetchUsers, usersAdapter } from '../users-slice';
import * as api from '@/src/utils/api';

/**
 * test scenario for usersSlice
 *
 * - usersSlice reducer
 *   - should return the initial state when given by unknown action
 *
 * - fetchUsers async thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 *   - should use fallback error message when response has no message
 *   - should set isLoading to true when fetch is pending
 */

vi.mock('@/src/utils/api');

const makeStore = () =>
  configureStore({
    reducer: { users: reducer },
  });

const mockUsersResponse = {
  status: 'success',
  message: 'ok',
  data: {
    users: [
      {
        id: 'john_doe',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'jane_doe',
        name: 'Jane Doe',
        email: 'jane@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
      {
        id: 'fulan',
        name: 'Si Fulan',
        email: 'fulan@example.com',
        avatar: 'https://generated-image-url.jpg',
      },
    ],
  },
};

describe('usersSlice', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();
  });

  describe('usersSlice reducer', () => {
    it('should return the initial state when given by unknown action', () => {
      const initialState = store.getState().users;

      expect(initialState.isLoading).toBe(true);
      expect(initialState.error).toBeNull();
      expect(usersAdapter.getSelectors().selectAll(initialState)).toEqual([]);
    });
  });

  describe('fetchUsers async thunk', () => {
    it('should dispatch action correctly when data fetching success', async () => {
      // arrange
      vi.mocked(api.fetchUsers).mockResolvedValue(mockUsersResponse);

      // action
      const resultAction = await store.dispatch(fetchUsers());
      const state = store.getState().users;

      // assert
      expect(resultAction.type).toBe('users/fetchUsers/fulfilled');
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
      expect(usersAdapter.getSelectors().selectAll(state)).toEqual(
        mockUsersResponse.data.users,
      );
      expect(usersAdapter.getSelectors().selectTotal(state)).toBe(3);
    });

    it('should dispatch action correctly when data fetching failed', async () => {
      // arrange
      const axiosError = {
        response: { data: { message: 'Unauthorized' } },
      };
      vi.mocked(api.fetchUsers).mockRejectedValue(axiosError);

      // action
      const resultAction = await store.dispatch(fetchUsers());
      const state = store.getState().users;

      // assert
      expect(resultAction.type).toBe('users/fetchUsers/rejected');
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Unauthorized');
      expect(usersAdapter.getSelectors().selectAll(state)).toEqual([]);
    });

    it('should use fallback error message when response has no message', async () => {
      // arrange
      vi.mocked(api.fetchUsers).mockRejectedValue({ response: null });

      // action
      await store.dispatch(fetchUsers());

      // assert
      expect(store.getState().users.error).toBe('Failed fetch threads data');
    });

    it('should set isLoading to true when fetch is pending', async () => {
      // arrange
      vi.mocked(api.fetchUsers).mockReturnValue(new Promise(() => {}));

      // action
      store.dispatch(fetchUsers());

      // assert
      expect(store.getState().users.isLoading).toBe(true);
    });
  });
});
