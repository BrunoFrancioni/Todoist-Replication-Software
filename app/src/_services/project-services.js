import http from './http-common';
import qs from 'qs';

class projectServices {
    CreateProject = async (data) => {
        try {
            const result = await http.post('/projects', qs.stringify(data));

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetProjects = async (iduser, archived = false) => {
        try {
            const result = await http.get(`/projects/${iduser}?archived=${archived}`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    EditProject = async (idproject, data) => {
        try {
            const result = await http.put(`/projects/${idproject}`, qs.stringify(data));

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    DeleteProject = async (idproject) => {
        try {
            const result = await http.delete(`/projects/${idproject}`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }
}

export default new projectServices();