import http from './http-common';
import qs from 'qs';

class userServices {
    CreateUser = async (data) => {
        try {
            const result = await http.post('/users/signup', qs.stringify(data));

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    LoginUser = async (data) => {
        try {
            const result = await http.post('/users/login', qs.stringify(data));

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    EditUser = async (iduser, data) => {
        try {
            const result = await http.put(`/users/${iduser}`, qs.stringify(data));

            return result
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    DeleteUser = async (iduser) => {
        try {
            const result = await http.delete(`/users/${iduser}`);

            return result;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default new userServices();
