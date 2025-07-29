import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Gallery.css';
import Header from './Header';
import Footer from './Footer';

export default function Gallery() {
  const [entries, setEntries] = useState([]);
  const [modalImages, setModalImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/gallery')
      .then(res => setEntries(res.data))
      .catch(() => alert('Failed to load gallery'));
  }, []);

  const openModal = (images) => {
    setModalImages(images.map(img => `http://127.0.0.1:8000/storage/${img.url}`));
    setCurrentIndex(0);
  };

  const closeModal = () => setModalImages([]);

  const next = () => {
    if (currentIndex < modalImages.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const prev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  return (
    <>
      <Header />
      <div className="edu-hero"></div>

      <section className="edu-section">
        <div className="edu-container gallery-intro">
          <h2>Michelle’s Life in Frames</h2>
          <h4>A Visual Journey Through Impact and Inspiration</h4>
          <p>
            Explore a curated collection of moments that reflect Michelle Dilhara’s incredible journey —
            from social outreach to global recognition. Each photograph captures a story, a milestone,
            a spark of change. Let this gallery be a window into compassion, creativity, and connection.
          </p>
        </div>

        <div className="edu-container gallery-grid">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="gallery-card fade-in"
              onClick={() => openModal(entry.images)}
            >
              {entry.images.length > 0 && (
                <img
                  src={`http://127.0.0.1:8000/storage/${entry.images[0].url}`}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {modalImages.length > 0 && (
        <div className="edu-modal" onClick={closeModal}>
          <div className="edu-modal-content" onClick={e => e.stopPropagation()}>
            <button className="edu-close" onClick={closeModal}>×</button>
            <img src={modalImages[currentIndex]} alt="" />
            <div className="modal-controls">
              <button onClick={prev} disabled={currentIndex === 0}>‹</button>
              <button onClick={next} disabled={currentIndex === modalImages.length - 1}>›</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
