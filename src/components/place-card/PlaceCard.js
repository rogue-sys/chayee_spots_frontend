import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../place-card/placeCardStyle.css';
import { ReactComponent as LocationIcon } from '../../assets/location.svg';

const PlaceCard = ({ place }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportMessage, setReportMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 150;

  const handleReport = async () => {
    try {
      await axios.post('/api/reports', {
        placeId: place.id,
        message: reportMessage
      });
      setShowReportModal(false);
      setReportMessage('');
      setCharCount(0);
      alert('Report submitted successfully!');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${place.id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (showMenu) {
        setShowMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMenu]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showReportModal) {
        setShowReportModal(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showReportModal]);

  return (
    <>
      <div className="place-card card">
        <div
          className="place-image-container"
          style={{
            background: `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.3),rgba(0,0,0,0.8)),url('${place.imageUrl}')`
          }}
        >
          <div
            className="kebab-menu"
            onClick={toggleMenu}
            onMouseDown={(e) => e.preventDefault()}
          >
            ⋮
          </div>

          {showMenu && (
            <div className="drop-down-menu-1" onClick={(e) => e.stopPropagation()}>
              <button
                className="dropdown-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                  setShowMenu(false);
                }}
              >
                Edit
              </button>
              <button
                className="dropdown-btn text-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReportModal(true);
                  setShowMenu(false);
                }}
              >
                Report
              </button>
            </div>
          )}

          <div className="place-info">
            <h5 className="card-title">{place.name}</h5>
            <p className="card-text-1"><em>{place.category || 'No description available'}</em></p>
          </div>
        </div>

        <div className="card-body">
          <p className="card-text-2"><em>"<strong>{place.description}</strong>"</em></p>
          <div className="location-container">
            <LocationIcon className="location-icon" />
            <span>{place.location}</span>
          </div>
          {place.mapLink && (
            
            <div className="d-flex justify-content-center">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapLink)}`}
              className="btn btn-secondary w-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
            </div>
          
            
          )}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="report-modal-overlay" onClick={() => setShowReportModal(false)}>
          <div className="report-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Report {place.name}</h3>
            <p>Please explain the issue:</p>
            <textarea
              value={reportMessage}
              onChange={(e) => {
                setReportMessage(e.target.value);
                setCharCount(e.target.value.length);
              }}
              maxLength={maxChars}
              placeholder="Your report message..."
            />
            <div className="char-counter">
              {charCount}/{maxChars} characters
            </div>
            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setShowReportModal(false)}
              >
                Cancel
              </button>
              <button
                className="submit-btn"
                onClick={handleReport}
                disabled={!reportMessage.trim() || charCount === 0}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceCard;
