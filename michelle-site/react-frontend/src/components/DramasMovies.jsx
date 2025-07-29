import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/VideoGallery.css';
import Header from './Header';
import Footer from './Footer';

const getEmbedUrl = (url) => {
  try {
    const u = new URL(url);
    const id = u.searchParams.get('v');
    if (id) return `https://www.youtube.com/embed/${id}`;
    if (url.includes('youtu.be/')) return `https://www.youtube.com/embed/${url.split('youtu.be/')[1]}`;
    return url;
  } catch {
    return url;
  }
};

export default function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('/api/videos')
      .then(res => setVideos(res.data))
      .catch(() => alert('Failed to load videos'));
  }, []);

  const filtered = filter === 'all' ? videos : videos.filter(v => v.category === filter);

  return (
    <>
      <Header />

      <div className="video-gallery">
        <div className="video-header">
          <h2>Dramas & Movies</h2>
          <p className="video-subtext">
            Michelle's impactful journey through dramas, films, songs and more. Watch her diverse performances.
          </p>

          <div className="filter-bar">
            {['all', 'dramas', 'movies', 'songs', 'musical'].map(cat => (
              <button
                key={cat}
                className={filter === cat ? 'active' : ''}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="video-list">
          {filtered.map(video => (
            <div className="video-card" key={video.id}>
              <iframe
                src={getEmbedUrl(video.url)}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="video-info">
                <h3>{video.title}</h3>
                <p>{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
