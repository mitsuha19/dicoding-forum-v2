import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThread } from "../features/threads/threadsSlice";

export default function CreateThreadForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert("Judul dan isi thread tidak boleh kosong");
      return;
    }
    if (!token) {
      alert("Anda harus login untuk membuat thread");
      return;
    }

    await dispatch(createThread({ title, body, category }));
    setTitle("");
    setBody("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        background: "#f9fafb",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="📝 Judul thread"
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
        }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="💭 Tulis isi thread kamu..."
        rows={4}
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          resize: "vertical",
        }}
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="🏷️ Kategori (opsional)"
        style={{
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
        }}
      />
      <button
        type="submit"
        style={{
          backgroundColor: "#2563eb",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Buat Thread
      </button>
    </form>
  );
}
