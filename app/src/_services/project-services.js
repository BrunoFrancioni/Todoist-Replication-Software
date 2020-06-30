import http from './http-common';

class projectServices {
    GetProjects = async (iduser) => {
        try {
            const projects = await http.get(`/projects/${iduser}`);

            return projects;
        } catch(error) {
            console.log(error);
            return [error];
        }
    }
}

export default new projectServices();