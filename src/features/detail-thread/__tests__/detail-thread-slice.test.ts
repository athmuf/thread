import * as api from '@/src/utils/api';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import reducer, {
  fetchDetailThread,
  updateCommentVote,
} from '../detail-thread-slice';
import { configureStore } from '@reduxjs/toolkit';

/**
 * test scenario for detailThreadSlice
 *
 * - detailThreadSlice reducer
 *   - should return the initial state when given by unknown action
 *
 * - updateCommentVote function
 *   - should add upvote in comment correctly when mode is "add" and type is "up"
 *   - should remove upvote in comment correctly when mode is "remove" and type is "up"
 *   - should add downvote in comment correctly when mode is "add" and type is "down"
 *   - should remove downvote in comment correctly when mode is "remove" and type is "down"
 *   - should not change in comment state when thread id is not found
 */

const initialState = {
  isLoading: false,
  error: null,
  voteData: {
    totalDownVote: 0,
    totalUpVote: 0,
    totalComment: 0,
  },
  data: {
    status: 'success',
    message: 'ok',
    data: {
      detailThread: {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: ['user-3'],
            downVotesBy: ['user-4', 'user-5'],
            voteData: {
              totalUpVote: 1,
              totalDownVote: 2,
            },
          },
        ],
      },
    },
  },
};

describe('detailThreadSlice reducer', () => {
  // unknown action
  it('should return the initial state when given unknown action', () => {
    const nextState = reducer(initialState, { type: 'UNKNOWN' });
    expect(nextState).toEqual(initialState);
  });

  // updateVote - upvote add
  it('should add upvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateCommentVote({
        id: 'comment-1',
        type: 'up',
        mode: 'add',
        userId: 'user-1',
      }),
    );
    const updatedThread = nextState.data?.data.detailThread.comments.find(
      comment => comment.id === 'comment-1',
    );

    if (!updatedThread) {
      throw new Error('Comment not found');
    }

    expect(updatedThread.voteData.totalUpVote).toBe(2);
    expect(updatedThread.upVotesBy).toContain('user-1');
  });

  // updateVote - upvote remove
  it('should remove upvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateCommentVote({
        id: 'comment-1',
        type: 'up',
        mode: 'remove',
        userId: 'user-3',
      }),
    );

    const updatedThread = nextState.data?.data.detailThread.comments.find(
      comment => comment.id === 'comment-1',
    );

    if (!updatedThread) {
      throw new Error('Comment not found');
    }

    expect(updatedThread.voteData.totalUpVote).toBe(0);
    expect(updatedThread.upVotesBy).not.toContain('user-3');
  });

  // updateVote - downvote add
  it('should add downvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateCommentVote({
        id: 'comment-1',
        type: 'down',
        mode: 'add',
        userId: 'user-1',
      }),
    );
    const updatedThread = nextState.data?.data.detailThread.comments.find(
      comment => comment.id === 'comment-1',
    );

    if (!updatedThread) {
      throw new Error('Comment not found');
    }

    expect(updatedThread.voteData.totalDownVote).toBe(3);
    expect(updatedThread.downVotesBy).toContain('user-1');
  });

  // updateVote - downvote remove
  it('should remove downvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateCommentVote({
        id: 'comment-1',
        type: 'down',
        mode: 'remove',
        userId: 'user-5',
      }),
    );

    const updatedThread = nextState.data?.data.detailThread.comments.find(
      comment => comment.id === 'comment-1',
    );

    if (!updatedThread) {
      throw new Error('Comment not found');
    }

    expect(updatedThread.voteData.totalDownVote).toBe(1);
    expect(updatedThread.upVotesBy).not.toContain('user-5');
  });

  // updateVote - upvote thread id not found
  it('should not change state when thread id is not found', () => {
    const nextState = reducer(
      initialState,
      updateCommentVote({
        id: 'comment-2',
        type: 'up',
        mode: 'add',
        userId: 'user-3',
      }),
    );

    expect(nextState).toEqual(initialState);
  });
});

/**
 * test scenario for detailThreadSlice
 *
 * - fetchDetailThread async thunk
 *   - should dispatch action correctly when data fetching success
 *   - should dispatch action correctly when data fetching failed
 *   - should use fallback error message when response has no message
 *
 */

// Mock API
vi.mock('@/src/utils/api');

const makeStore = () =>
  configureStore({
    reducer: { detailThreads: reducer },
  });

const mockDetailThreadResponse = {
  status: 'success',
  message: 'ok',
  data: {
    detailThread: {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['user-1', 'user-2', 'user-3'],
          downVotesBy: ['user-4'],
        },
      ],
    },
  },
};

describe('fetchDetailThread async thunk', () => {
  let store: ReturnType<typeof makeStore>;

  beforeEach(() => {
    store = makeStore();
    vi.clearAllMocks();
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    vi.mocked(api.fetchDetailThread).mockResolvedValue(
      mockDetailThreadResponse,
    );

    // action
    expect(store.getState().detailThreads.isLoading).toBe(true);
    const resultAction = await store.dispatch(fetchDetailThread('thread-1'));

    // assert
    expect(resultAction.type).toBe('detailThreads/fetchDetailThread/fulfilled');

    const state = store.getState().detailThreads;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();

    expect(state.data?.data.detailThread).toEqual(
      expect.objectContaining({
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
        comments: [
          {
            id: 'comment-1',
            content: 'Ini adalah komentar pertama',
            createdAt: '2021-06-21T07:00:00.000Z',
            owner: {
              id: 'users-1',
              name: 'John Doe',
              avatar: 'https://generated-image-url.jpg',
            },
            upVotesBy: ['user-1', 'user-2', 'user-3'],
            downVotesBy: ['user-4'],
            voteData: {
              totalUpVote: 3,
              totalDownVote: 1,
            },
          },
        ],
      }),
    );
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arrange
    const axiosError = {
      response: { data: { message: 'Unauthorized' } },
    };
    vi.mocked(api.fetchDetailThread).mockRejectedValue(axiosError);

    // action
    const resultAction = await store.dispatch(fetchDetailThread('thread-2'));

    // assert
    expect(resultAction.type).toBe('detailThreads/fetchDetailThread/rejected');
    const state = store.getState().detailThreads;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Unauthorized');
    expect(state.data).toEqual(null);
  });

  it('should use fallback error message when response has no message', async () => {
    // arrange
    const axiosError = { response: null };
    vi.mocked(api.fetchDetailThread).mockRejectedValue(axiosError);

    // action
    await store.dispatch(fetchDetailThread('thread-3'));

    // assert
    expect(store.getState().detailThreads.error).toBe(
      'Failed fetch detail thread',
    );
  });
});
