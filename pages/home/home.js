import React from "react";
import CreateThreadForm from "../../components/CreateThreadForm";
import ThreadList from "../../components/ThreadList";

export default function Home() {
  return (
    <main className="container">
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        💬 Forum Diskusi
      </h1>
      <div style={{ marginBottom: "24px" }}>
        <CreateThreadForm />
      </div>
      <ThreadList />
    </main>
  );
}
