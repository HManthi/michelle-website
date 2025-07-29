import { useEffect, useState } from 'react';
import './css/EducationOutreach.css';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';

export default function EducationOutreach() {
  const [items, setItems] = useState([]);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/education-gallery')
      .then(res => setItems(res.data))
      .catch(() => alert('Failed to load education gallery.'));
  }, []);

  const openModal = item => setModalItem(item);
  const closeModal = () => setModalItem(null);

  const renderMedia = (item) => {
    const url = item.source === 'upload'
      ? `http://127.0.0.1:8000/storage/${item.url}`
      : item.url;

    if (item.type === 'image') {
      return <img src={url} alt={item.title} onClick={() => openModal(item)} />;
    } else if (item.type === 'video' && item.source === 'upload') {
      return (
        <video onClick={() => openModal(item)} controls>
          <source src={url} />
        </video>
      );
    } else {
      return (
        <iframe
          src={url}
          title={item.title}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          onClick={() => openModal(item)}
        />
      );
    }
  };

  return (
    <>
      <Header />
      <div className="edu-hero"></div>

      <section className="edu-section">
        <div className="edu-container">
          <h2>Education Outreach</h2>
          <p>
            Michelle Dilhara extends her humanitarian efforts by conducting impactful sessions in schools and universities,
            focusing on social awareness, emotional wellbeing, environmental sustainability, and student empowerment.
          </p>

          <p className="edu-quote">
            “Transforming youth into thoughtful leaders — one outreach at a time.”
          </p>

          <div className="edu-gallery">
            {items.map(item => (
              <div className="edu-gallery-item" key={item.id}>
                {renderMedia(item)}
                <div style={{ marginLeft: '1rem', maxWidth: '320px' }}>
                  <h4 style={{ color: '#d4af37', fontFamily: 'Cinzel' }}>{item.title}</h4>
                  <p style={{ color: '#ccc' }}>{item.description}</p>
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
            {modalItem.type === 'image' ? (
              <img src={modalItem.source === 'upload'
                ? `http://127.0.0.1:8000/storage/${modalItem.url}`
                : modalItem.url}
                alt={modalItem.title}
              />
            ) : modalItem.type === 'video' && modalItem.source === 'upload' ? (
              <video controls autoPlay>
                <source src={`http://127.0.0.1:8000/storage/${modalItem.url}`} />
              </video>
            ) : (
              <iframe
                src={modalItem.url}
                title={modalItem.title}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
            <h4>{modalItem.title}</h4>
            <p>{modalItem.description}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
