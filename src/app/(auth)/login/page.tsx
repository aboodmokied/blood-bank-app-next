'use client';

import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await axios.post('/api/login', { email, password });

      if (res.status === 200) {
        window.location.href = '/dashboard';
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err: any) {
      // Check if server sent a specific error message
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} style={{ maxWidth: 320, margin: 'auto' }}>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        type="email"
        required
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        required
        style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }}
      />
      <button type="submit" disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && (
        <p style={{ color: 'red', marginTop: 12 }}>
          {error}
        </p>
      )}
    </form>
  );
}
