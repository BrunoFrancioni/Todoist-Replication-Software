const Tasks = require('../models/Tasks');

module.createTask = async (req, res) => {
    let { idUser, idProject, title, content, done, date, time} = req.body;


}

module.getTasks = async (req, res) => {
    let idUser = req.params.idUser;

    const tasks = await Tasks.findAll({ where: { idUser: idUser}})
                        .catch(error => console.log(error));

    if(tasks === null) res.status(404)
    else {
        res.status(200).json ({
            tasks
        });
    }
}