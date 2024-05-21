import axios  from '../BaseService'; //Isso aqui importa o axios que tem um interceptor com autentificação com token

const API_BASE_URL = 'http://localhost:3333';

const apiService = axios.create({
    baseURL: API_BASE_URL,
});

export const Login = async (email, password) => {
    try {
      const response = await apiService.post('/login', {
        "email": email,
        "password": password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
};