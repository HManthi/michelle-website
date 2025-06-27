import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Awards() {
  const [awards, setAwards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/awards') // backend URL (adjust if needed)
      .then(response => setAwards(response.data))
      .catch(error => console.error('Error fetching awards:', error));
  }, []);

  return (
    <ul>
      {awards.map((award, index) => (
        <li key={index}>
          {award.title} {award.year && `(${award.year})`}
        </li>
      ))}
    </ul>
  );
}
