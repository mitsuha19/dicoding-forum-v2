// pages/login/index.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginUser, fetchMe } from '../../features/auth/authslice';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async ({ email, password }) => {
    try {
      const result = await dispatch(loginUser({ email, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        await dispatch(fetchMe());
        router.push('/');
      } else {
        alert(result.payload?.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <h2>Login</h2>
      <LoginForm onSubmit={handleLogin} />
    </main>
  );
}
