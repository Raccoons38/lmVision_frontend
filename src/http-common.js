import axios from "axios";

var token = "";
var user = JSON.parse(localStorage.getItem("user"));
if (user && user.accessToken) {
  token = user.accessToken;
}
export default axios.create({
  baseURL: "https://irkcam.ru:3001", // указание адреса серве
  headers: {
    "Content-Type": "application/json", // обмен данными будем осуществлять в формате json
    "x-access-token": token,
  },
  crossDomain: true
});
