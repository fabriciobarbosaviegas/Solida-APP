import axios from 'axios';

const API_URL = 'http://localhost:3333';

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
