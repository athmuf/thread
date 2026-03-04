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
 * - threadSlice reducer
 *   - should return the initial state when given by unknown action
 *
 * - updateVote function
 *   - should add upvote correctly when mode is "add" and type is "up"
 *   - should remove upvote correctly when mode is "remove" and type is "up"
 *   - should add downvote correctly when mode is "add" and type is "down"
 *   - should remove downvote correctly when mode is "remove" and type is "down"
 *   - should not change state when thread id is not found
 *
 * - setSelectedCategory function
 *   - should update selectedCategory when given a valid category
 *   - should update selectedCategory even if category does not exist in categories list
 *
 */

const initialState = {
  data: [
    {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-1',
      upVotesBy: ['user-1'],
      downVotesBy: ['user-2', 'user-3'],
      totalComments: 2,
      voteData: {
        totalUpVote: 1,
        totalDownVote: 2,
        totalComment: 2,
      },
    },
    {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini adalah thread Kedua',
      category: 'Global',
      createdAt: '2021-06-21T07:00:00.000Z',
      ownerId: 'users-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
      voteData: {
        totalUpVote: 0,
        totalDownVote: 0,
        totalComment: 0,
      },
    },
  ],
  error: null,
  isLoading: false,
  selectedCategory: 'all',
  categories: ['all', 'General', 'Global'],
};

describe('threadSlice reducer', () => {
  // unknown action
  it('should return the initial state when given unknown action', () => {
    const nextState = reducer(initialState, { type: 'UNKNOWN' });
    expect(nextState).toEqual(initialState);
  });

  // updateVote - upvote add
  it('should add upvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateVote({
        id: 'thread-1',
        type: 'up',
        mode: 'add',
        userId: 'user-1',
      }),
    );
    const updatedThread = nextState.data.find(
      thread => thread.id === 'thread-1',
    )!;

    expect(updatedThread.voteData.totalUpVote).toBe(2);
    expect(updatedThread.upVotesBy).toContain('user-1');
  });

  // updateVote - upvote remove
  it('should remove upvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateVote({
        id: 'thread-1',
        type: 'up',
        mode: 'remove',
        userId: 'user-1',
      }),
    );

    const updatedThread = nextState.data.find(
      thread => thread.id === 'thread-1',
    )!;

    expect(updatedThread.voteData.totalUpVote).toBe(0);
    expect(updatedThread.upVotesBy).not.toContain('user-1');
  });

  // updateVote - downvote add
  it('should add downvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateVote({
        id: 'thread-2',
        type: 'down',
        mode: 'add',
        userId: 'user-1',
      }),
    );
    const updatedThread = nextState.data.find(
      thread => thread.id === 'thread-2',
    )!;

    expect(updatedThread.voteData.totalDownVote).toBe(1);
    expect(updatedThread.downVotesBy).toContain('user-1');
  });

  // updateVote - downvote remove
  it('should remove downvote correctly', () => {
    const nextState = reducer(
      initialState,
      updateVote({
        id: 'thread-1',
        type: 'down',
        mode: 'remove',
        userId: 'user-2',
      }),
    );

    const updatedThread = nextState.data.find(
      thread => thread.id === 'thread-1',
    )!;

    expect(updatedThread.voteData.totalDownVote).toBe(1);
    expect(updatedThread.upVotesBy).not.toContain('user-2');
  });

  // updateVote - upvote thread id not found
  it('should not change state when thread id is not found', () => {
    const nextState = reducer(
      initialState,
      updateVote({
        id: 'thread-3',
        type: 'up',
        mode: 'add',
        userId: 'user-3',
      }),
    );

    expect(nextState).toEqual(initialState);
  });

  // setSelectedCategory
  it('should change selectedCategory correctly', () => {
    const nextState = reducer(initialState, setSelectedCategory('frontend'));

    expect(nextState.selectedCategory).toBe('frontend');
  });
});
