import http from './http-common';

class projectServices {
    CreateProject = async (data) => {
        try {
            const project = await http.post('/projects', data);

            return project;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetProjects = async (iduser) => {
        try {
            const projects = await http.get(`/projects/${iduser}`);

            return projects;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetProjectsArchived = async (iduser) => {
        try {
            const projects = await http.get(`/projects/${iduser}?archived=true`);

            return projects;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    EditProject = async (idproject, data) => {
        try {
            const result = await http.put(`/projects/${idproject}`, data);

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