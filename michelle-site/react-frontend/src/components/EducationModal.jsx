import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/EducationModal.css';

export default function EducationModal({ onClose, onSaved, editData }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'image',
    source: 'upload',
    url: ''
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editData) {
      setForm({
        title: editData.title,
        description: editData.description,
        type: editData.type,
        source: editData.source,
        url: editData.source === 'upload' ? '' : editData.url
      });
    }
  }, [editData]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('type', form.type);
    formData.append('source', form.source);

    if (form.source === 'upload') {
      if (!file && !editData) return alert('Please choose a file');
      if (file) formData.append('url', file);
    } else {
      formData.append('url', form.url);
    }

    try {
      if (editData) {
        await axios.post(`http://127.0.0.1:8000/api/education-gallery/${editData.id}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://127.0.0.1:8000/api/education-gallery', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      onSaved();
      onClose();
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{editData ? 'Edit' : 'Add'} Entry</h3>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

          <div className="row">
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            <select name="source" value={form.source} onChange={handleChange}>
              <option value="upload">Upload</option>
              <option value="facebook">Facebook/Youtube</option>
            </select>
          </div>

          {form.source === 'upload' ? (
            <input type="file" onChange={handleFile} />
          ) : (
            <input name="url" value={form.url} onChange={handleChange} placeholder="Enter Facebook/Youtube URL" />
          )}

          <div className="btn-group">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
