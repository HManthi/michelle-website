import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/UsersAdmin.css';
import { FaUserPlus, FaEdit, FaTrash } from 'react-icons/fa';
import UserModal from './UserModal';

export default function UsersAdmin() {
  const [users, setUsers]     = useState([]);
  const [modalOpen, setOpen]  = useState(false);
  const [editing, setEditing] = useState(null);

  const loadUsers = async () => {
    const { data } = await axios.get('/api/users');
    setUsers(data);
  };

  /* initial + refresh on success */
  useEffect(() => { loadUsers(); }, []);

  /* ------------  CRUD helpers  ------------ */
  const handleDelete = async id => {
    if (!window.confirm('Delete this user?')) return;
    await axios.delete(`/api/users/${id}`);
    setUsers(u => u.filter(x => x.id !== id));
  };

  const openAdd   = () => { setEditing(null); setOpen(true); };
  const openEdit  = u  => { setEditing(u);  setOpen(true);  };
  const close     = () => setOpen(false);

  return (
    <div className="users-admin">
      <div className="header">
        <h2>Manage Users</h2>
        <button className="add-btn" onClick={openAdd}>
          <FaUserPlus /> Add User
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th/>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td className="actions">
                <button onClick={() => openEdit(u)}   title="Edit"><FaEdit  /></button>
                <button onClick={() => handleDelete(u.id)} title="Delete"><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <UserModal
          user={editing}
          onClose={close}
          onSaved={loadUsers}
        />
      )}
    </div>
  );
}
