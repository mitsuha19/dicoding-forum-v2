/**
 * Skenario Pengujian:
 * 1. Form login harus menampilkan input Email dan Password.
 * 2. Fungsi onSubmit harus dipanggil dengan data yang benar saat tombol Login ditekan.
 */

import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../components/LoginForm';

describe('LoginForm Component Tests', () => {
  test('renders login form correctly', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('calls onSubmit when form is submitted', () => {
    const mockLogin = jest.fn();
    render(<LoginForm onSubmit={mockLogin} />);

    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test3@yopmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByText(/Login/i));

    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test3@yopmail.com',
      password: '123456',
    });
  });
});
