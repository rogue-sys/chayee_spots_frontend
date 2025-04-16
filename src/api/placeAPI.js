import axios from 'axios';

// Base API URL
const API_URL = process.env.REACT_APP_API_BASE;

// Add a new place (with image)
export const addPlace = async (placeData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, placeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding place:', error);
    throw error;
  }
};

// Get all places
export const getAllPlaces = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching places:', error);
    throw error;
  }
};

// Get places by location
export const getPlacesByLocation = async (location) => {
  try {
    const response = await axios.get(`${API_URL}/location/${location}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching places by location:', error);
    throw error;
  }
};

// Get places by category
export const getPlacesByCategory = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching places by category:', error);
    throw error;
  }
};

// Get paginated places
export const getPaginatedPlaces = async (page = 1, limit = 5) => {
  try {
    const response = await axios.get(`${API_URL}/paginated`, { params: { page, limit } });
    return response.data;
  } catch (error) {
    console.error('Error fetching paginated places:', error);
    throw error;
  }
};

/// Corrected deletePlace function to match the backend route
export const deletePlace = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);  
    return response.data;
  } catch (error) {
    console.error('Error deleting place:', error);
    throw error;
  }
};
  
  // Get a place by ID
  export const getPlaceById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching place by ID:', error);
      throw error;
    }
  };
  
  // Update a place by ID
export const updatePlace = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating place:', error);
      throw error;
    }
  };
  