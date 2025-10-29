/**
 * Skenario Pengujian ThreadList:
 * 1. Menampilkan komponen <Loading /> jika status threads/users = "loading".
 * 2. Menampilkan daftar ThreadItem ketika data threads & users sudah tersedia.
 * 3. Menampilkan teks "Tidak ada thread." jika tidak ada thread.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ThreadList from "../components/ThreadList";

// Kita mock ThreadItem dan Loading supaya simple dan stabil.
// - ThreadItem kita ganti dengan komponen dummy yang predictable
// - Loading kita ganti dengan indikator teks khusus
jest.mock("../components/ThreadItem", () => ({
  __esModule: true,
  default: ({ thread }) => (
    <div data-testid="thread-item">
      {thread.title} - {thread.owner?.name}
    </div>
  ),
}));

jest.mock("../components/Loading", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

// Kita juga mock fetchThreads & fetchUsers agar pemanggilan dispatchnya tidak error
jest.mock("../features/threads/threadsSlice", () => {
  const originalModule = jest.requireActual("../features/threads/threadsSlice");
  return {
    __esModule: true,
    ...originalModule,
    fetchThreads: jest.fn(() => ({ type: "threads/fetchMock" })),
  };
});

jest.mock("../features/users/usersSlice", () => ({
  __esModule: true,
  fetchUsers: jest.fn(() => ({ type: "users/fetchMock" })),
}));

// helper render dengan store mock
function renderWithStore(preloadedState) {
  const store = configureStore({
    reducer: {
      threads: (state = preloadedState.threads, action) => state,
      users: (state = preloadedState.users, action) => state,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <ThreadList />
    </Provider>
  );
}

describe("ThreadList Component Tests", () => {
  test("renders Loading when status is loading", () => {
    renderWithStore({
      threads: {
        items: [],
        status: "loading",
        selectedThread: null,
        error: null,
      },
      users: {
        items: [],
        status: "loading",
        error: null,
      },
    });

    // Harus menampilkan komponen Loading
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("renders thread list with owner names when data is ready", () => {
    renderWithStore({
      threads: {
        status: "succeeded",
        error: null,
        selectedThread: null,
        items: [
          { id: "t1", title: "Thread Satu", ownerId: "u1" },
          { id: "t2", title: "Thread Dua", ownerId: "u2" },
        ],
      },
      users: {
        status: "succeeded",
        error: null,
        items: [
          { id: "u1", name: "Alice" },
          { id: "u2", name: "Bob" },
        ],
      },
    });

    // Karena kita mock ThreadItem menjadi <div data-testid="thread-item">...</div>,
    // kita bisa cari semua elemen itu.
    const renderedThreads = screen.getAllByTestId("thread-item");
    expect(renderedThreads).toHaveLength(2);

    // pastikan text gabungan (title - owner.name) muncul
    expect(screen.getByText(/Thread Satu - Alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Thread Dua - Bob/i)).toBeInTheDocument();
  });

  test('renders "Tidak ada thread." if no threads available', () => {
    renderWithStore({
      threads: {
        status: "succeeded",
        error: null,
        selectedThread: null,
        items: [], // kosong
      },
      users: {
        status: "succeeded",
        error: null,
        items: [{ id: "u1", name: "Alice" }],
      },
    });

    expect(screen.getByText(/Tidak ada thread\./i)).toBeInTheDocument();
  });
});
