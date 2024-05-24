import axios from 'axios';

const API_URL = 'http://localhost:3333';

export const createReport = async (userId, category, cords, title, description, imageUrl, status, token) => {
    try{
        const response = await axios.post(`${API_URL}/report`, {
            userId,
            category,
            cords,
            title,
            description,
            imageUrl,
            status,
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error){
        console.error('Error during creating report', error.response ? error.response.data : error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

export const updateReport = async (reportId,userId, category, cords, title, description, imageUrl, status, token) => {
    try{
        const response = await axios.put(`${API_URL}/report/${reportId}`, {
            userId,
            category,
            cords,
            title,  
            description,
            imageUrl,
            status,
        }, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error){
        console.error('Error during creating report', error.response ? error.response.data : error);
        throw error.response ? error.response.data : new Error('Network error');
    }
};

