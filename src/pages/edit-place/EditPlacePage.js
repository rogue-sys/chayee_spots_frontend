import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPlaceById, updatePlace } from '../../api/placeAPI';
import './EditPlaceStyle.css';

const EditPlacePage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();
  
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Fetched ID from URL:', id);

    const fetchPlaceDetails = async () => {
      try {
        const place = await getPlaceById(id);
        console.log('Fetched place details:', place);

        if (place) {
          setName(place.name || '');
          setLocation(place.location || '');
          setCategory(place.category || '');
          setDescription(place.description || '');
          setMapLink(place.mapLink || '');
        } else {
          setError('Place not found');
        }
      } catch (error) {
        setError('Failed to fetch place details');
        console.error('Error fetching place:', error);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !location || !category) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('mapLink', mapLink);
    if (image) formData.append('image', image);

    try {
      await updatePlace(id, formData);
      console.log('Place updated successfully');
      navigate('/');
    } catch (err) {
      setError('Failed to update place');
      console.error('Error updating place:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-place-container">
      <h2 className="edit-place-title">Edit Place</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="edit-place-form">
        <div className="edit-form-group">
          <label className="edit-form-label">Place Name</label>
          <input
            type="text"
            className="edit-form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label">Location</label>
          <input
            type="text"
            className="edit-form-control"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label">Category</label>
          <input
            type="text"
            className="edit-form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label">Description</label>
          <textarea
            className="edit-form-control edit-form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label">Google Maps Link</label>
          <input
            type="url"
            className="edit-form-control"
            value={mapLink}
            onChange={(e) => setMapLink(e.target.value)}
          />
        </div>
        <div className="edit-form-group">
          <label className="edit-form-label file-input-label">
            Change Image
            <span className="file-input-hint">(optional)</span>
          </label>
          <input
            type="file"
            className="edit-form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <button 
          type="submit" 
          className="update-btn" 
          disabled={loading}
        >
          {loading ? 'Updating Place...' : 'Update Place'}
        </button>
      </form>
    </div>
  );
};

export default EditPlacePage;