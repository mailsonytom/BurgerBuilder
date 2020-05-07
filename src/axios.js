import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-d36b8.firebaseio.com/'
});

export default instance;