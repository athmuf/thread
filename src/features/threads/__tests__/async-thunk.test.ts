import * as api from '@/src/utils/api';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, {
  updateVote,
  setSelectedCategory,
  fetchThreads,
} from '../threads-slice';
import { configureStore } from '@reduxjs/toolkit';
import { RootThreadsApi } from '../types';

/**
 * test scenario for threadSlice
 *
 * - fetchThreads async thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 *   - should use fallback error message when response has no message
 *
 */

// Mock API
vi.mock('@/src/utils/api');

const makeStore = () =>
  configureStore({
    reducer: { threads: reducer },
  });

const mockThreadsResponse = {
  status: 'success',
  message: 'ok',
  data: {
    threads: [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: ['user-1', 'user-3', 'user-4'],
        downVotesBy: ['user-5'],
        totalComments: 3,
      },
    ],
  },
};

describe('fetchThreads async thunk', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.mocked(api.fetchThreads).mockResolvedValue(mockThreadsResponse);

    // action
    expect(store.getState().threads.isLoading).toBe(true);
    const resultAction = await store.dispatch(fetchThreads());

    // assert
    expect(resultAction.type).toBe('threads/fetchThreads/fulfilled');

    const state = store.getState().threads;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();

    expect(state.data).toHaveLength(2);
    expect(state.data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: ['user-1', 'user-3', 'user-4'],
          downVotesBy: ['user-5'],
          totalComments: 3,
          voteData: {
            totalUpVote: 3,
            totalDownVote: 1,
            totalComment: 3,
          },
        }),
      ]),
    );
    expect(state.categories).toEqual(['all', 'General']);
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const axiosError = {
      response: { data: { message: 'Unauthorized' } },
    };
    vi.mocked(api.fetchThreads).mockRejectedValue(axiosError);

    // action
    const resultAction = await store.dispatch(fetchThreads());

    // assert
    expect(resultAction.type).toBe('threads/fetchThreads/rejected');
    const state = store.getState().threads;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Unauthorized');
    expect(state.data).toEqual([]);
  });

  it('should use fallback error message when response has no message', async () => {
    // arrange
    const axiosError = { response: null };
    vi.mocked(api.fetchThreads).mockRejectedValue(axiosError);

    // action
    await store.dispatch(fetchThreads());

    // assert
    expect(store.getState().threads.error).toBe('Failed fetch threads data');
  });
});
