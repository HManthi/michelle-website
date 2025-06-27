import { useEffect, useState } from 'react';
import './css/AwardModal.css';
import axios from 'axios';

export default function AwardModal({ award, onClose, onSaved }) {
  const [form, setForm] = useState({ title: '', year: '', description: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (award) setForm({ title: award.title, year: award.year, description: award.description || '' });
  }, [award]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (award) {
        await axios.put(`http://127.0.0.1:8000/api/awards/${award.id}`, form);
      } else {
        await axios.post('http://127.0.0.1:8000/api/awards', form);
      }
      onSaved();
      onClose();
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        Object.values(err.response?.data?.errors || {}).flat().join('\n') ||
        'Failed to save award';
      setError(msg);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{award ? 'Edit Award' : 'Add Award'}</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
          <input name="year" value={form.year} onChange={handleChange} placeholder="Year" />
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
          <div className="modal-buttons">
            <button type="submit">{award ? 'Update' : 'Save'}</button>
            <button type="button" onClick={onClose} className="cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
