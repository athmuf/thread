import { RootState } from '@/app/store';
import { createSelector } from '@reduxjs/toolkit';
import { usersAdapter } from '../features/users/users-slice';

export const usersSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users,
);

export const selectUserById = (id: string) =>
  createSelector(
    (state: RootState) => usersSelectors.selectById(state, id),
    user => user?.name ?? 'Unknown User',
  );

export const createInitial = (name: string): string => {
  if (!name) return '';

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }

  const first = words[0][0];
  const last = words[words.length - 1][0];

  return (first + last).toUpperCase();
};
