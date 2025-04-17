import React, { useState } from 'react';
import { addPlace } from '../../api/placeAPI';
import { useNavigate } from 'react-router-dom';
import './AddPlaceStyle.css';
import imageCompression from 'browser-image-compression';


const AddPlacePage = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [mapLink, setMapLink] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const MAX_NAME_LENGTH = 50;
  const MAX_LOCATION_LENGTH = 50;
  const MAX_CATEGORY_LENGTH = 50;
  const MAX_DESCRIPTION_LENGTH = 150;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('location', location);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('mapLink', mapLink);
    formData.append('addedBy', 'Admin');
  
    try {
      if (image) {
        const compressedImage = await imageCompression(image, {
          maxSizeMB: 1,            // max size in MB
          maxWidthOrHeight: 800,   // resize if larger
          useWebWorker: true
        });
        formData.append('image', compressedImage);
      }
  
      await addPlace(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to add place');
      console.error('Error adding place:', err);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="add-place-container container">
      <h2 className="add-place-title">Add a New Place</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="add-place-form">
        <div className="form-group">
          <label className="form-label">Place Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
            maxLength={MAX_NAME_LENGTH} 
          />
          <small>{name.length}/{MAX_NAME_LENGTH} characters</small>
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input 
            type="text" 
            className="form-control" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required
            maxLength={MAX_LOCATION_LENGTH} 
          />
          <small>{location.length}/{MAX_LOCATION_LENGTH} characters</small>
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <input 
            type="text" 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
            maxLength={MAX_CATEGORY_LENGTH} 
          />
          <small>{category.length}/{MAX_CATEGORY_LENGTH} characters</small>
        </div>
        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            rows="3"
            maxLength={MAX_DESCRIPTION_LENGTH} 
          />
          <small>{description.length}/{MAX_DESCRIPTION_LENGTH} characters</small>
        </div>
        <div className="form-group">
          <label className="form-label">Google Maps Link</label>
          <input 
            type="url" 
            className="form-control" 
            value={mapLink} 
            onChange={(e) => setMapLink(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Upload Image</label>
          <input 
            type="file" 
            className="form-control" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>
        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading}
        >
          {loading ? 'Adding Place...' : 'Add Place'}
        </button>
      </form>
    </div>
  );
};

export default AddPlacePage;