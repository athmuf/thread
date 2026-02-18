import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    threads: threadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
