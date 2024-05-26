import axios from 'axios'
const API_URL = 'https://solida-app-lb1t.onrender.com'; 

export const createVolunteer = async (userId, reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/volunteer`,
        { userId, reportId },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  };

  export const deleteVolunteerByUserIdAndReportId = async (userId, reportId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_URL}/volunteer/${userId}/${reportId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Network error');
    }
  };