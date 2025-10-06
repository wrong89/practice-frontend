import axios from 'axios';

const API_BASE = 'http://localhost:9091/api'; // замени на свой адрес

export const api = axios.create({
    baseURL: API_BASE,
    headers: { 'Content-Type': 'application/json' },
});
