import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';
import './css/EducationAdmin.css';
import { FaEnvelopeOpenText, FaTrash } from 'react-icons/fa';

export default function ContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const loadContacts = async () => {
    try {
      const res = await axios.get('/api/admin/contacts');
      setContacts(res.data);
    } catch (error) {
      console.error('Error loading contacts:', error);
      alert('Failed to load messages');
    }
  };

  const openMessage = async (msg) => {
    setSelectedMessage(msg);

    if (!msg.read) {
      try {
        await axios.post(`/api/admin/contacts/${msg.id}/mark-read`);
        setContacts(prev =>
          prev.map(m => m.id === msg.id ? { ...m, read: true } : m)
        );
      } catch {
        alert('Failed to mark as read');
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await axios.delete(`/api/admin/contacts/${id}`);
      setContacts(prev => prev.filter(msg => msg.id !== id));
    } catch {
      alert('Failed to delete message');
    }
  };

  const closeModal = () => setSelectedMessage(null);

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    
      <div className="edu-admin">
        <div className="edu-header">
          <h2>Inbox Messages</h2>
        </div>

        {contacts.length === 0 ? (
          <p style={{ padding: '1rem', color: '#ccc' }}>No messages found.</p>
        ) : (
          <table className="edu-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td style={{ color: msg.read ? 'limegreen' : 'goldenrod' }}>
                    {msg.read ? 'Read' : 'Unread'}
                  </td>
                  <td>
                    <button className="mark-read-btn" onClick={() => openMessage(msg)}>
                      <FaEnvelopeOpenText /> View
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(msg.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {selectedMessage && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Message from {selectedMessage.name}</h3>
              <p><strong>Email:</strong> {selectedMessage.email}</p>
              <p><strong>Message:</strong></p>
              <p style={{ whiteSpace: 'pre-line' }}>{selectedMessage.message}</p>
              <div className="btn-group" style={{ marginTop: '1rem' }}>
                <button onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    
  );
}
