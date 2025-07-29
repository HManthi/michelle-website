import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EducationAdmin.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function SocialWorkAdmin() {
  const [entries, setEntries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '' });
  const [images, setImages] = useState([]);

  const loadEntries = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/social-work');
      setEntries(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to load entries');
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/social-work/${id}`);
      setEntries(entries.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('description', form.description);
    images.forEach(img => data.append('images[]', img));

    try {
      await axios.post('http://127.0.0.1:8000/api/social-work', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setShowModal(false);
      setForm({ title: '', description: '' });
      setImages([]);
      loadEntries();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  return (
    <div className="edu-admin">
      <div className="edu-header">
        <h2>Social Work Gallery</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Entry
        </button>
      </div>

      <table className="edu-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Images</th>
            <th>Actions</th>
          </tr>
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
                    alt=""
                    height="40"
                    style={{ marginRight: '5px', borderRadius: '4px' }}
                  />
                ))}
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
          <div className="modal-box">
            <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
            <h3>Add Social Work Entry</h3>
            <form onSubmit={handleSubmit} className="edu-admin-form">
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
              ></textarea>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages([...e.target.files])}
                required
              />
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
