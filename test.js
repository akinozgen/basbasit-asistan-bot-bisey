import axios from "axios";

const url = "http://localhost:3004/";
const params = {
  q: "hava",
  lat: 40.73061,
  lng: -73.935242,
};

axios.get(url, { params }).then((response) => {
  console.log(response.data);
});
