import axios from 'axios';

const API_BASE_URL = 'http://localhost:3333';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const Create = async (userid, category, cords, title, description, imageurl, statuss) => {
    try {
        const token = localStorage.getItem("value");    
        const response = await apiService.post('/report', {
        headers: { token },
        "userId": userid,
        "category": category,
        "cords": cords,
        "title": title,
        "description": description,
        "imageUrl": imageurl,
        "status": statuss
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};

export const Update = async (category, cords, title, description, imageurl, statuss) => {
    try {
        const token = localStorage.getItem("token");
        const response = await apiService.put('/report/',  { //Preciso concatenar o id aq (someone help me)
          headers: { token },
          "category": category,
          "cords": cords,
          "title": title,
          "description": description,
          "imageUrl": imageurl,
          "status": statuss
        });
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const Delete = async (category, cords, title, description, imageurl, statuss) => {
    try {
        const response = await apiService.del('/report/', { //Preciso concatenar o id aq (someone help me)
          "category": category,
          "cords": cords,
          "title": title,
          "description": description,
          "imageUrl": imageurl,
          "status": statuss
        });
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const FindById = async (category, cords, title, description, imageurl, statuss) => {
    try {
        const response = await apiService.get('/report/', {headers: { userId }}); //Novamente acho que precisamos do userid
        return response.data;
      } catch (error) {
        throw error;
      }
}