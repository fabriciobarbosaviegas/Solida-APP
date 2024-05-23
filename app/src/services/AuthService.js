import axios from 'axios';

const API_URL = 'http://localhost:3333'; 

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    localStorage.setItem('userId', response.data.userId)
    
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const signIn = async (fullName, email, password, type, image) => {
  try {
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('type', type);
    if (image) {
      formData.append('avatar', image);
    }

    const response = await axios.post(`${API_URL}/user`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    } else {
      console.warn('No token found in response:', response.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('Error during sign in:', error.response ? error.response.data : error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  return localStorage.getItem('token');
};

export const getUserById = async (id) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getPhotoByUserId = async (id) => {
  try {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.get(`${API_URL}/user/photo/${id}`, {
      responseType: 'blob', // To handle the binary data
      headers: {
        Authorization: `Bearer ${currentUser}`,
      },
    });
    return URL.createObjectURL(response.data); // Create a URL for the binary data
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};