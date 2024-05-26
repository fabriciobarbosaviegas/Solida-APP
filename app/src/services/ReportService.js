import axios from 'axios';

const API_URL = 'https://solida-app-lb1t.onrender.com'; 

export const createReport = async (reportData, token) => {
  try {
    const formData = new FormData();
    formData.append('userId', reportData.userId);
    formData.append('category', reportData.category);
    formData.append('cords', JSON.stringify(reportData.cords));
    formData.append('title', reportData.title);
    formData.append('description', reportData.description);
    formData.append('status', reportData.status);

    for (let i = 0; i < reportData.images.length; i++) {
      formData.append('images', reportData.images[i]);
    }

    const response = await axios.post(`${API_URL}/report`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during creating report', error.response ? error.response.data : error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const deleteReport = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/report/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getReports = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/report`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching reports', error.response ? error.response.data : error);
      throw error.response ? error.response.data : new Error('Network error');
  }
};

export const getReportPhoto = async (reportId, token) => {
  try {
    const response = await axios.get(`${API_URL}/report/photo/${reportId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: 'blob',
    });

    console.log(response)
    const imageUrl = URL.createObjectURL(response.data);
    console.log(imageUrl)
    return imageUrl;
  } catch (error) {
    console.error('Error fetching report photo', error.response ? error.response.data : error);
    throw error.response ? error.response.data : new Error('Network error');
  }
};