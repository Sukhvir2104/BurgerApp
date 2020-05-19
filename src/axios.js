import axios from "axios";
const instance = axios.create({
    baseURL:"https://burgerapp-c6517.firebaseio.com/"
});
export default instance;
