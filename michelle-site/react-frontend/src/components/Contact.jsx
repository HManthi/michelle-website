import { useState } from 'react';
import axios from 'axios';
import './css/Contact.css';
import Header from './Header';
import Footer from './Footer';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', form);
      setStatus('Your message was sent! Thank you.');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Sorry, failed to send. Please try again later.');
    }
  };

  return (
    <>
      <Header />
      <div className="contact-hero"><h2>Contact Us</h2></div>
      <section className="contact-section">
        <div className="contact-container">
          <p>Have a question, collaboration or just want to say hello? Reach out below — we'd love to hear!</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <input name="name" type="text" placeholder="Your Name" value={form.name}
                   onChange={e => setForm({ ...form, name: e.target.value })} required />
            <input name="email" type="email" placeholder="Your Email" value={form.email}
                   onChange={e => setForm({ ...form, email: e.target.value })} required />
            <textarea name="message" rows="5" placeholder="Your Message" value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })} required />
            <button type="submit">Send Message</button>
          </form>

          {status && <p className="contact-status">{status}</p>}
        </div>
      </section>
      <Footer />
    </>
  );
}
