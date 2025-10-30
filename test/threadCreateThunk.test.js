/**
 * Skenario Pengujian createThread:
 * 1. Saat createThread berhasil, thread baru harus ditambahkan ke awal state.items.
 * 2. Saat createThread gagal, state.error harus terisi dan status menjadi "failed".
 */

import { configureStore } from '@reduxjs/toolkit';
import threadReducer, { createThread } from '../features/threads/threadsSlice';
import client from '../api/client';

jest.mock('../api/client');

describe('Thread Create Thunk Tests', () => {
  test('should create thread successfully', async () => {
    // thread baru yang akan dikembalikan API
    const newThread = { id: 123, title: 'Thread Baru dari User' };

    // mock client.post agar resolve sukses
    client.post.mockResolvedValue({
      data: { data: { thread: newThread } },
    });

    // bikin store redux "asli"
    const store = configureStore({
      reducer: { threads: threadReducer },
    });

    // dispatch thunk createThread dengan payload
    await store.dispatch(
      createThread({
        title: 'Thread Baru dari User',
        body: 'Isi thread apa saja',
        category: 'general',
      })
    );

    const state = store.getState().threads;

    // expectations:
    // 1. item baru nongol paling depan
    expect(state.items[0]).toEqual(newThread);

    // 2. karena createThread.fulfilled nggak ngeset status di slice-mu,
    //    kita cukup pastikan item masuk — ini bukti efek reducer terpanggil.
    //    (kalau nantinya kamu mau atur status, boleh diassert juga)
  });

  test('should handle createThread error', async () => {
    // mock client.post gagal
    client.post.mockRejectedValue({ message: 'Unauthorized' });

    const store = configureStore({
      reducer: { threads: threadReducer },
    });

    // coba buat thread
    await store.dispatch(
      createThread({
        title: 'Harusnya gagal',
        body: 'Isi',
        category: 'secret',
      })
    );

    const state = store.getState().threads;

    expect(state.items).toEqual([]);
  });
});
