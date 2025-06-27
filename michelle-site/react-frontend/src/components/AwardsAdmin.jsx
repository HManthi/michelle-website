import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/AwardsAdmin.css';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import AwardModal from './AwardModal';

export default function AwardsAdmin() {
  const [awards, setAwards] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editAward, setEditAward] = useState(null);

  const fetchAwards = async () => {
    const res = await axios.get('http://127.0.0.1:8000/api/awards');
    setAwards(res.data);
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this award?')) {
      await axios.delete(`http://127.0.0.1:8000/api/awards/${id}`);
      fetchAwards();
    }
  };

  return (
    <div className="awards-admin">
      <div className="header">
        <h2>Manage Awards</h2>
        <button className="add-btn" onClick={() => { setEditAward(null); setModalOpen(true); }}>
          <FaPlus /> Add Award
        </button>
      </div>

      <table className="award-table">
        <thead>
          <tr>
            <th>ID</th><th>Title</th><th>Year</th><th>Description</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {awards.map(award => (
            <tr key={award.id}>
              <td>{award.id}</td>
              <td>{award.title}</td>
              <td>{award.year}</td>
              <td>{award.description}</td>
              <td>
                <button onClick={() => { setEditAward(award); setModalOpen(true); }}><FaEdit /></button>
                <button onClick={() => handleDelete(award.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <AwardModal
          award={editAward}
          onClose={() => setModalOpen(false)}
          onSaved={fetchAwards}
        />
      )}
    </div>
  );
}
