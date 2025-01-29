import axios from 'axios';

// I intentionally not using env because I want to keep it simple for this example
export const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 5000,
});
