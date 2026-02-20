import axios from 'axios';
import { FoodItem, ProteinOption } from '../types';

const API_BASE_URL = 'https://atmosfoodin.onrender.com/api';

const api = axios.create({
    baseURL: API_BASE_URL,
});

export const getProducts = async (): Promise<FoodItem[]> => {
    const response = await api.get<any[]>('/products');
    return response.data.map(item => ({
        ...item,
        id: item._id || item.id, // Ensure we have an id for frontend consistency
    }));
};

export const getProteins = async (): Promise<ProteinOption[]> => {
    const response = await api.get<any[]>('/products/proteins');
    return response.data.map(item => ({
        ...item,
        id: item._id || item.id,
    }));
};

export const createOrder = async (orderData: any) => {
    try {
        const response = await api.post('/orders', orderData);
        return response.data;
    } catch (error: any) {
        console.error('API Error Response:', error.response?.data);
        console.error('API Error Status:', error.response?.status);
        console.error('Order Data Sent:', orderData);
        
        // Log validation errors specifically
        if (error.response?.data?.errors) {
            console.error('Validation Errors:', error.response.data.errors);
        }
        
        throw error;
    }
};

export const getOrder = async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
};

export default api;
