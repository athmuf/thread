/**
 * test scenario for authSlice
 *
 * - login async thunk
 *   - should dispatch action correctly and set isAuthenticated when login success
 *   - should save token to localStorage when login success
 *   - should dispatch action correctly when login failed
 *   - should use fallback error message when response has no message
 *   - should set isLoading to true when login is pending
 *
 * - fetchProfile async thunk
 *   - should dispatch action correctly and set profile when fetch success
 *   - should set isAuthenticated to true when fetch profile success
 *   - should dispatch action correctly when fetch profile failed
 *   - should set isAuthenticated to false when fetch profile failed
 *   - should use fallback error message when response has no message
 *   - should set isLoading to true when fetch profile is pending
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { login, fetchProfile } from '../auth-slice';
import * as api from '@/src/utils/api';

vi.mock('@/src/utils/api');
vi.mock('sonner');

const makeStore = () =>
  configureStore({
    reducer: { auth: authReducer },
  });

const mockLoginResponse = {
  status: 'success',
  message: 'ok',
  data: {
    token: 'some-user-token',
  },
};

const mockProfileResponse = {
  status: 'success',
  message: 'ok',
  data: {
    user: {
      id: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
  },
};

describe('authSlice', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('login async thunk', () => {
    const loginPayload = { email: 'john@example.com', password: 'password123' };

    it('should dispatch action correctly and set isAuthenticated when login success', async () => {
      // arrange
      vi.mocked(api.login).mockResolvedValue(mockLoginResponse);

      // act
      const resultAction = await store.dispatch(login(loginPayload));
      const state = store.getState().auth;

      // assert
      expect(resultAction.type).toBe('auth/login/fulfilled');
      expect(state.login.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should save token to localStorage when login success', async () => {
      // arrange
      vi.mocked(api.login).mockResolvedValue(mockLoginResponse);

      // act
      await store.dispatch(login(loginPayload));

      // assert
      expect(localStorage.getItem('cuitin-token')).toBe('some-user-token');
    });

    it('should dispatch action correctly when login failed', async () => {
      // arrange
      const axiosError = {
        response: { data: { message: 'Invalid credentials' } },
      };
      vi.mocked(api.login).mockRejectedValue(axiosError);

      // act
      const resultAction = await store.dispatch(login(loginPayload));
      const state = store.getState().auth;

      // assert
      expect(resultAction.type).toBe('auth/login/rejected');
      expect(state.login.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
    });

    it('should use fallback error message when response has no message', async () => {
      // arrange
      vi.mocked(api.login).mockRejectedValue({ response: null });

      // act
      const resultAction = await store.dispatch(login(loginPayload));

      // assert
      expect(resultAction.payload).toBe('Failed login');
    });

    it('should set isLoading to true when login is pending', () => {
      // arrange
      vi.mocked(api.login).mockReturnValue(new Promise(() => {}));

      // act
      store.dispatch(login(loginPayload));

      // assert
      expect(store.getState().auth.login.isLoading).toBe(true);
    });
  });

  describe('fetchProfile async thunk', () => {
    it('should dispatch action correctly and set profile when fetch success', async () => {
      // arrange
      vi.mocked(api.getProfile).mockResolvedValue(mockProfileResponse);

      // act
      const resultAction = await store.dispatch(fetchProfile());
      const state = store.getState().auth;

      // assert
      expect(resultAction.type).toBe('auth/getProfile/fulfilled');
      expect(state.me.isLoading).toBe(false);
      expect(state.profile).toEqual(mockProfileResponse.data.user);
    });

    it('should set isAuthenticated to true when fetch profile success', async () => {
      // arrange
      vi.mocked(api.getProfile).mockResolvedValue(mockProfileResponse);

      // act
      await store.dispatch(fetchProfile());

      // assert
      expect(store.getState().auth.isAuthenticated).toBe(true);
    });

    it('should dispatch action correctly when fetch profile failed', async () => {
      // arrange
      const axiosError = {
        response: { data: { message: 'Unauthorized' } },
      };
      vi.mocked(api.getProfile).mockRejectedValue(axiosError);

      // act
      const resultAction = await store.dispatch(fetchProfile());
      const state = store.getState().auth;

      // assert
      expect(resultAction.type).toBe('auth/getProfile/rejected');
      expect(state.me.isLoading).toBe(false);
    });

    it('should set isAuthenticated to false when fetch profile failed', async () => {
      // arrange
      vi.mocked(api.getProfile).mockRejectedValue({
        response: { data: { message: 'Unauthorized' } },
      });

      // act
      await store.dispatch(fetchProfile());

      // assert
      expect(store.getState().auth.isAuthenticated).toBe(false);
    });

    it('should use fallback error message when response has no message', async () => {
      // arrange
      vi.mocked(api.getProfile).mockRejectedValue({ response: null });

      // act
      const resultAction = await store.dispatch(fetchProfile());

      // assert
      expect(resultAction.payload).toBe('Failed get profile');
    });

    it('should set isLoading to true when fetch profile is pending', () => {
      // arrange
      vi.mocked(api.getProfile).mockReturnValue(new Promise(() => {}));

      // act
      store.dispatch(fetchProfile());

      // assert
      expect(store.getState().auth.me.isLoading).toBe(true);
    });
  });
});
