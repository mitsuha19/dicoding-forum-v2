import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../api/client';

// Ambil semua threads
export const fetchThreads = createAsyncThunk(
  'threads/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await client.get('/threads');
      return res.data.data.threads;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Ambil detail thread berdasarkan ID
export const fetchThreadById = createAsyncThunk(
  'threads/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const res = await client.get(`/threads/${id}`);
      return res.data.data.detailThread;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Buat thread baru
export const createThread = createAsyncThunk(
  'threads/create',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await client.post('/threads', payload);
      return res.data.data.thread;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const threadsSlice = createSlice({
  name: 'threads',
  initialState: {
    items: [],
    selectedThread: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchThreads.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchThreadById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchThreadById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedThread = action.payload;
      })
      .addCase(fetchThreadById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createThread.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export default threadsSlice.reducer;
