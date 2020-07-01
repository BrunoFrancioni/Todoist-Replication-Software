import http from './http-common';

class tagsServices {
    CreateTag = async (data) => {
        try {
            const result = await http.post('/tags', data);

            return result;
        } catch(error) {
            console.log(error);
            return error;
        }
    }

    GetTags = async (iduser) => {
        try {
            const tags = await http.get(`/tags/${iduser}`);

            return tags;
        } catch(error) {
            console.log(error);
            return error;
        }
    }

    EditTag = async (idtag, data) => {
        try {
            const result = await http.put(`/tags/${idtag}`, data);

            return result;
        } catch(error) {
            console.log(error);
            return error;
        }
    }

    DeleteTag = async (idtag) => {
        try {
            const result = await http.delete(`/tags/${idtag}`);

            return result;
        } catch(error) {
            console.log(error);
            return error;
        }
    }
}

export default new tagsServices();