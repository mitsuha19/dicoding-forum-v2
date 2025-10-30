import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { registerUser } from '../../features/auth/authslice';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(registerUser({ name, email, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        alert('Register success. Please login.');
        router.push('/auth/login');
      } else {
        alert(result.payload?.message || 'Register failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 6)"
          type="password"
          style={{ width: '100%', padding: 8, marginBottom: 8 }}
        />
        <button type="submit">Register</button>
      </form>
    </main>
  );
}
