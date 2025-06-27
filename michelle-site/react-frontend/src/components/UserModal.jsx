import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UserModal.css';

export default function UserModal({ user, onClose, onSaved }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email, password: '' }); // Don't prefill password
    }
  }, [user]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      if (user) {
        // Editing user
        await axios.put(`http://127.0.0.1:8000/api/users/${user.id}`, form);
      } else {
        // Adding new user
        if (!form.password) {
          setError('Password is required when adding a user.');
          return;
        }
        await axios.post('http://127.0.0.1:8000/api/users', form);
      }
      onSaved(); // Refresh list
      onClose(); // Close modal
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join('\n') ||
        'Failed to save user';
      setError(msg);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{user ? 'Edit User' : 'Add User'}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder={user ? 'New Password (optional)' : 'Password'}
            value={form.password}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">{user ? 'Update' : 'Save'}</button>
            <button type="button" onClick={onClose} className="cancel">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
