import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://react-my-burger-app-a38bc-default-rtdb.firebaseio.com/'
});

export default instance;
