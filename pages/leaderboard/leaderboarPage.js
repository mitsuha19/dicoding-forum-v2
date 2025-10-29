"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboards } from "../../features/leaderboard/leaderboardSlice";

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((s) => s.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        🏆 Leaderboard
      </h1>

      {loading && <p style={{ textAlign: "center" }}>Loading leaderboard...</p>}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
      )}
      {!loading && !error && items.length === 0 && (
        <p style={{ textAlign: "center" }}>Belum ada data leaderboard.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((entry, index) => (
            <li
              key={entry.user?.id ?? index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "12px 8px",
                fontSize: "16px",
              }}
            >
              <span>
                {index + 1}.{" "}
                <strong
                  style={{
                    color:
                      index === 0
                        ? "gold"
                        : index === 1
                        ? "silver"
                        : index === 2
                        ? "#cd7f32"
                        : "#333",
                  }}
                >
                  {entry.user?.name ?? "Unknown User"}
                </strong>
              </span>
              <strong>{entry.score}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
