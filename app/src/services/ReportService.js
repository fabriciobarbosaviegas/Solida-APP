import axios from 'axios';

const API_URL = 'http://localhost:3333';

export const createReport = async (reportData, token) => {
    try {
        const response = await axios.post(`${API_URL}/report`, reportData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error during creating report', error.response ? error.response.data : error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

