import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/GalleryAdmin.css'; 
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function GalleryAdmin() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [images, setImages] = useState([]);

  const loadEntries = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/gallery');
      setEntries(res.data);
    } catch (err) {
      alert('Failed to load entries');
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this gallery entry?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/gallery/${id}`);
      loadEntries();
    } catch {
      alert('Failed to delete entry');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    images.forEach(img => fd.append('images[]', img));
    try {
      await axios.post('http://127.0.0.1:8000/api/gallery', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setShowModal(false);
      setForm({ title: '', description: '' });
      setImages([]);
      loadEntries();
    } catch {
      alert('Failed to upload');
    }
  };

  return (
    <div className="edu-admin">
      <div className="edu-header">
        <h2>Michelle Gallery Admin</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Photos
        </button>
      </div>

      <table className="edu-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Photos</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.title}</td>
              <td>{entry.description}</td>
              <td>
                {entry.images?.length > 0 && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${entry.images[0].url}`}
                    height="40"
                    style={{ borderRadius: '5px' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleDelete(entry.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Gallery Entry</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={e => setImages([...e.target.files])}
                required
              />
              <div className="btn-group">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
