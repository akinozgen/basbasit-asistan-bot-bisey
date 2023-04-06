import axios from 'axios';

const url = 'http://localhost:3004/';
const params = {
    q: 'saat',
    lat: 40.730610,
    lng: -73.935242,
};

axios.get(url, { params })
    .then((response) => {
        console.log(response.data);
    });