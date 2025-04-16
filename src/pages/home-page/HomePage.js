import React, { useEffect, useState } from 'react';
import { getAllPlaces } from '../../api/placeAPI';
import PlaceCard from '../../components/place-card/PlaceCard';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const data = await getAllPlaces();
        setPlaces(data);
      } catch (err) {
        console.error('Error loading places:', err);
        setError('Failed to load places.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div  className=" container mt-4">
      <div  className=" d-flex justify-content-between align-items-center mb-4">
        <h2>All Places</h2>
        <Link to="/add" className="btn btn-primary">Add New Place</Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div>Loading places...</div>
      ) : places.length === 0 ? (
        <div>No places found.</div>
      ) : <div style={{
        display:places?.length > 0 ? "grid" : "flex",
        gridTemplateColumns:"1fr 1fr 1fr",
        gap:20
      }}>
       { places.map((place) => (
          <div key={place.id} className="mb-4">
           
            <PlaceCard place={{ ...place, id: place.id }} />
          </div>
        ))}
      </div>}
    </div>
  );
};

export default HomePage;
