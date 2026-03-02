import { describe, it, expect } from 'vitest';
import reducer, { updateVote, setSelectedCategory } from '../threads-slice';

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
  categories: ['all', 'redux'],
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
    expect(nextState.data[0].voteData.totalUpVote).toBe(1);
    expect(nextState.data[0].upVotesBy).toContain('user-1');
  });

  // updateVote - upvote remove
  it('should remove upvote correctly', () => {
    const stateWithVote = {
      ...initialState,
      data: [
        {
          ...initialState.data[0],
          upVotesBy: ['user-1'],
          voteData: {
            ...initialState.data[0].voteData,
            totalUpVote: 1,
          },
        },
      ],
    };

    const nextState = reducer(
      stateWithVote,
      updateVote({
        id: 'thread-1',
        type: 'up',
        mode: 'remove',
        userId: 'user-1',
      }),
    );

    expect(nextState.data[0].voteData.totalUpVote).toBe(0);
    expect(nextState.data[0].upVotesBy).not.toContain('user-1');
  });
});
