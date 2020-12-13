import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID 7noEd3GAZd7rjW8NA8exfVx-J_sDfWqKiwv9fV617NU'
    }
});