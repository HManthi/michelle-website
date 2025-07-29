import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/EducationOutreach.css';
import Header from './Header';
import Footer from './Footer';

export default function SocialWork() {
  const [items, setItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/social-work')
      .then(res => setItems(res.data))
      .catch(() => alert('Failed to load social work entries.'));
  }, []);

  const openModal = (item) => {
    setModalItem(item);
    setCurrentSlide(0); // reset to first image
  };

  const closeModal = () => {
    setModalItem(null);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (modalItem && modalItem.images.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % modalItem.images.length);
    }
  };

  const prevSlide = () => {
    if (modalItem && modalItem.images.length > 0) {
      setCurrentSlide((prev) =>
        (prev - 1 + modalItem.images.length) % modalItem.images.length
      );
    }
  };

  return (
    <>
      <Header />
      <div className="edu-hero"></div>

      <section className="edu-section">
        <div className="edu-container">
          <h2>Social Work</h2>
          <p>
            Michelle Dilhara engages in impactful social work projects that uplift communities, support the underprivileged,
            and drive social awareness. Her initiatives extend to various regions where she promotes empowerment,
            environmental responsibility, and human connection.
          </p>

          <p className="edu-quote">
            "True change begins with compassion in action."
          </p>

          <div className="edu-gallery-list">
            {items.map(item => (
              <div key={item.id} className="edu-gallery-item">
                {item.images.length > 0 && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.images[0].path}`}
                    alt=""
                    onClick={() => openModal(item)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <div className="edu-info">
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalItem && (
        <div className="edu-modal" onClick={closeModal}>
          <div className="edu-modal-content" onClick={e => e.stopPropagation()}>
            <button className="edu-close" onClick={closeModal}>×</button>

            <img
              src={`http://127.0.0.1:8000/storage/${modalItem.images[currentSlide].path}`}
              alt={modalItem.title}
              style={{ maxWidth: '100%', maxHeight: '60vh', borderRadius: '8px' }}
            />

            <h4>{modalItem.title}</h4>
            <p>{modalItem.description}</p>

            {modalItem.images.length > 1 && (
              <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                <button onClick={prevSlide} style={navBtnStyle}>◀ Prev</button>
                <button onClick={nextSlide} style={navBtnStyle}>Next ▶</button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

const navBtnStyle = {
  backgroundColor: '#d4af37',
  border: 'none',
  padding: '0.5rem 1rem',
  color: '#000',
  borderRadius: '5px',
  cursor: 'pointer',
  fontWeight: 'bold'
};
