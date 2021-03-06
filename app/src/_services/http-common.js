import axios from 'axios';
//import authHeader from '../_helpers/auth-header';

export default axios.create({
    baseURL: `${process.env.VUE_APP_DEV_URL}`,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Bearer ${process.env.VUE_APP_DEV_TOKEN}`
    }
});