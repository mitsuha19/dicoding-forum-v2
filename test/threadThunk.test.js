/**
 * Skenario Pengujian:
 * 1. Saat fetchThreads berhasil, state harus berisi daftar thread dari server.
 * 2. Saat fetchThreads gagal, state harus menampilkan error.
 */

import { fetchThreads } from "../features/threads/threadsSlice";
import client from "../api/client";
import { configureStore } from "@reduxjs/toolkit";
import threadReducer from "../features/threads/threadsSlice";

jest.mock("../api/client");

describe("Thread Thunk Tests", () => {
  test("should fetch threads successfully", async () => {
    const mockData = [{ id: 1, title: "Test Thread" }];
    client.get.mockResolvedValue({
      data: { data: { threads: mockData } },
    });

    const store = configureStore({ reducer: { threads: threadReducer } });
    await store.dispatch(fetchThreads());

    const state = store.getState().threads;
    expect(state.items).toEqual(mockData);
    expect(state.status).toBe("succeeded");
  });

  test("should handle fetch error", async () => {
    client.get.mockRejectedValue({ message: "Network error" });

    const store = configureStore({ reducer: { threads: threadReducer } });
    await store.dispatch(fetchThreads());

    const state = store.getState().threads;
    expect(state.status).toBe("failed");
    expect(state.error).toBe("Network error");
  });
});
