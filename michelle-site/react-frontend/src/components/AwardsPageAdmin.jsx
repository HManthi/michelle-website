import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EducationAdmin.css'; // reusing SocialWorkAdmin styles
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function AwardsPageAdmin() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [images, setImages] = useState([]);

  const loadEntries = async () => {
    try {
      const { data } = await axios.get('/api/awards-page');
      setEntries(data);
    } catch {
      alert('Failed to load awards page entries');
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await axios.delete(`/api/awards-page/${id}`);
    setEntries(entries.filter(e => e.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    images.forEach(img => fd.append('images[]', img));
    await axios.post('/api/awards-page', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setShowModal(false);
    setForm({ title: '', description: '' });
    setImages([]);
    loadEntries();
  };

  return (
    <div className="edu-admin">
      <div className="edu-header">
        <h2>Awards Page Entries</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Award Entry
        </button>
      </div>

      <table className="edu-table">
        <thead>
          <tr><th>Title</th><th>Description</th><th>Images</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <tr key={entry.id}>
              <td>{entry.title}</td>
              <td>{entry.description}</td>
              <td>
                {entry.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`http://127.0.0.1:8000/storage/${img.url}`}
                    height="40"
                    style={{ marginRight: '5px', borderRadius: '4px' }}
                    alt=""
                  />
                ))}
              </td>
              <td><button onClick={() => handleDelete(entry.id)}><FaTrash /></button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Award Entry</h3>
            <form onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
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
