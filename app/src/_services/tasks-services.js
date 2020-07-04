import http from './http-common';

class tasksServices {
    CreateTask = async (data) => {
        try {
            const result = await http.post("/tasks", data);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetTodayUserTasks = async (iduser) => {
        try {
            const result = await http.get(`/tasks/users/${iduser}/today`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetInboxUserTasks = async (iduser) => {
        try {
            const result = await http.get(`/tasks/users/${iduser}/inbox`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetUpcomingUserTasks = async (iduser) => {
        try {
            const result = await http.get(`/tasks/users/${iduser}/upcoming`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    GetProjectTasks = async (idproject, deleted) => {
        try {
            const result = await http.get(`/tasks/projects/${idproject}?deleted=${deleted}`);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    EditTask = async (idtask, data) => {
        try {
            const result = await http.put(`/tasks/${idtask}`, data);

            return result;
        } catch(error) {
            console.log(error);
            return [];
        }
    }

    DeleteTask = async (idtask) => {
        try {
            const result = await http.delete(`/tasks/${idtask}`);

            return result;
        }catch(error) {
            console.log(error);
            return [];
        }
    }
}

export default new tasksServices();