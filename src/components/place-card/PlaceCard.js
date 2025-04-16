import React, { useState } from 'react';
import { deletePlace } from '../../api/placeAPI';
import { useNavigate } from 'react-router-dom';
import './placeCardStyle.css';

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePlace(place.id);
      navigate(0);
    } catch (error) {
      console.error('Error deleting place:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${place.id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  return (
    <div className="place-card card">
      <div 
        className="place-image-container"
        style={{
          background: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.3),rgba(0,0,0,0.8)),url('${place.imageUrl}')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          aspectRatio: 16/9,
          color: "white",
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexDirection: "column",
          position: "relative"
        }}
      >
        <div className="kebab-menu" onClick={toggleMenu}>
          ⋮
        </div>

        {showMenu && (
          <div className="dropdown-menu">
            <button 
              className="dropdown-btn btn btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
                setShowMenu(false);
              }}
            >
              Edit
            </button>
            <button 
              className="dropdown-btn btn btn-sm text-danger"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
                setShowMenu(false);
              }}
            >
              Delete
            </button>
          </div>
        )}

        <div className="place-info">
          <h5 className="card-title">{place.name}</h5>
          <p className="card-text"><em>{place.description || 'No description available'}</em></p>
        </div>
      </div>
      
      <div className="card-body">
        <p className="card-text"><strong>Category:</strong> {place.category}</p>
        <p className="card-text"><strong>Location:</strong> {place.location}</p>
        {place.mapLink && (
          <a 
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapLink)}`} 
            className="btn btn-primary" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View on Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;