import threadsReducer, {
  fetchThreads,
  createThread,
} from "../features/threads/threadsSlice";

describe("Threads Reducer Tests", () => {
  test("should handle fetchThreads.fulfilled by replacing items", () => {
    const initialState = {
      items: [],
      selectedThread: null,
      status: "idle",
      error: null,
    };

    const mockPayload = [
      { id: 1, title: "Thread A" },
      { id: 2, title: "Thread B" },
    ];

    const action = {
      type: fetchThreads.fulfilled.type,
      payload: mockPayload,
    };

    const state = threadsReducer(initialState, action);

    expect(state.items).toEqual(mockPayload);
    expect(state.status).toBe("succeeded");
    expect(state.error).toBeNull();
  });

  test("should handle createThread.fulfilled by unshifting new thread", () => {
    const initialState = {
      items: [{ id: 10, title: "Existing" }],
      selectedThread: null,
      status: "idle",
      error: null,
    };

    const newThread = { id: 99, title: "Thread Baru" };

    const action = {
      type: createThread.fulfilled.type,
      payload: newThread,
    };

    const state = threadsReducer(initialState, action);

    // thread baru harus masuk di depan
    expect(state.items[0]).toEqual(newThread);
    expect(state.items[1]).toEqual({ id: 10, title: "Existing" });
  });
});
