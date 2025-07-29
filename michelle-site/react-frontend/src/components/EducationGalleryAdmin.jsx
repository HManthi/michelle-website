import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EducationGalleryAdmin.css';

export default function EducationGalleryAdmin() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'image',
    source: 'upload',
    url: ''
  });
  const [fileInput, setFileInput] = useState(null);

  const fetchGallery = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/education-gallery');
    setItems(res.data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'url') data.append(key, value);
    });
    if (form.source === 'upload') data.append('url', fileInput);
    else data.append('url', form.url);

    try {
      await axios.post('http://127.0.0.1:8000/api/education-gallery', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm({ title: '', description: '', type: 'image', source: 'upload', url: '' });
      setFileInput(null);
      fetchGallery();
    } catch (err) {
      alert('Failed to upload item.');
    }
  };

  return (
    <div className="edu-admin-wrapper">
      <h2>Education Gallery Management</h2>

      <form onSubmit={handleSubmit} className="edu-admin-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

        <div className="row">
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <select name="source" value={form.source} onChange={handleChange}>
            <option value="upload">Upload</option>
            <option value="facebook">Facebook Link</option>
          </select>
        </div>

        {form.source === 'upload' ? (
          <input type="file" onChange={(e) => setFileInput(e.target.files[0])} required />
        ) : (
          <input name="url" placeholder="Facebook Video/Image URL" value={form.url} onChange={handleChange} required />
        )}

        <button type="submit">Add</button>
      </form>

      <div className="edu-gallery-preview">
        {items.map((item) => (
          <div className="edu-item" key={item.id}>
            <h4>{item.title}</h4>
            <p>{item.description}</p>
            {item.type === 'image' ? (
              item.source === 'upload' ? (
                <img src={`http://127.0.0.1:8000/storage/${item.url}`} alt={item.title} />
              ) : (
                <img src={item.url} alt={item.title} />
              )
            ) : item.source === 'upload' ? (
              <video controls>
                <source src={`http://127.0.0.1:8000/storage/${item.url}`} />
              </video>
            ) : (
              <iframe src={item.url} title={item.title} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
