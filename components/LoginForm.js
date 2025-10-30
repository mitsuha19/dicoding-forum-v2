import React, { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both fields!');
      return;
    }

    if (onSubmit) onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        style={{
          width: '100%',
          padding: 8,
          marginBottom: 8,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
        style={{
          width: '100%',
          padding: 8,
          marginBottom: 8,
          border: '1px solid #ccc',
          borderRadius: 4,
        }}
      />
      <button
        type="submit"
        style={{
          width: '100%',
          padding: 10,
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Login
      </button>
    </form>
  );
}
