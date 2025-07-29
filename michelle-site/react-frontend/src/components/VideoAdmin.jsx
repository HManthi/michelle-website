import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EducationAdmin.css';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function VideoAdmin() {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    url: '',
    category: 'dramas'
  });

  const loadVideos = async () => {
    try {
      const { data } = await axios.get('/api/videos');
      setVideos(data);
    } catch {
      alert('Failed to load videos');
    }
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this video?')) return;
    await axios.delete(`/api/videos/${id}`);
    setVideos(videos.filter(v => v.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/videos', form);
      setForm({ title: '', description: '', url: '', category: 'dramas' });
      setShowModal(false);
      loadVideos();
    } catch {
      alert('Failed to save video');
    }
  };

  return (
    <div className="edu-admin">
      <div className="edu-header">
        <h2>Dramas & Movies</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Add Video
        </button>
      </div>

      <table className="edu-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {videos.map(video => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.category}</td>
              <td>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  View
                </a>
              </td>
              <td>
                <button onClick={() => handleDelete(video.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Video</h3>
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
                type="url"
                placeholder="YouTube URL"
                value={form.url}
                onChange={e => setForm({ ...form, url: e.target.value })}
                required
              />
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
              >
                <option value="dramas">Dramas</option>
                <option value="movies">Movies</option>
                <option value="songs">Songs</option>
                <option value="musical">Musical Videos</option>
                <option value="all">All Her Work</option>
              </select>
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
