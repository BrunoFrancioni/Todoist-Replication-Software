import http from './http-common';
import qs from 'qs';

class tasksTaggedServices {
    CreateTaskTagged = async (data) => {
        try {
            const result = await http.post("/taskstagged", qs.stringify(data));

            return result;
        } catch(error) {
            console.log(error);
            return error;
        }
    }

    DeleteTaskTagged = async (idtasktagged) => {
        try {
            const result = await http.delete(`/taskstagged/${idtasktagged}`);

            return result;
        } catch(error) {
            console.log(error);
            return error;
        }
    }
}

export default new tasksTaggedServices();