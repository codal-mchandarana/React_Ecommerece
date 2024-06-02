import axios from "axios";

const EcommerceClient = axios.create({
    baseURL:'http://localhost:8080/'
})

export default EcommerceClient;