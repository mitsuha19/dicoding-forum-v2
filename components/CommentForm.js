import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../features/threads/threadDetailSlice";

export default function CommentForm({ threadId }) {
  const [content, setContent] = useState("");
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const submit = async (e) => {
    e.preventDefault();

    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    if (!content.trim()) return;

    setLoading(true);
    await dispatch(createComment({ threadId, content }));
    setContent("");
    setLoading(false);
    setShowLoginAlert(false);
  };

  return (
    <div style={{ marginTop: 16 }}>
      <form onSubmit={submit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentar..."
          rows={3}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: 8,
            border: "1px solid #ccc",
            resize: "none",
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: 8,
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Mengirim..." : "Kirim"}
        </button>
      </form>

      {showLoginAlert && (
        <p style={{ color: "red", marginTop: 8 }}>
          Silakan login terlebih dahulu sebelum berkomentar.
        </p>
      )}
    </div>
  );
}
