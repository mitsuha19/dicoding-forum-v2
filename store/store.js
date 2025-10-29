import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authslice';
import threadsReducer from '../features/threads/threadsSlice';
import usersReducer from '../features/users/usersSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';
import threadDetailReducer from '../features/threads/threadDetailSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboard: leaderboardReducer,
    threadDetail: threadDetailReducer,
  },
});

export default store;
