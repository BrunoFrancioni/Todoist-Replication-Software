# API Specification.

## Technologies to use.

- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com)
- [Postegresql](https://www.postgresql.org)
- [Sequelize](https://sequelize.org)
- [Postman](https://www.postman.com)
- [Cryptob](https://github.com/kelektiv/node.bcrypt.js)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)

## Technical details of the Backend.

### Database design.

![Database Design](../NotionPictures/database_design.png 'Database Design')

**Users Table.**

Saves all the users with their information to login.

**Tasks Table.**

Saves the simple and the project users notes. If the task belongs to a a project, it will saves the project's id, and if is not, it will be null.

**Projects Table.**

Saves the users projects.

**Tags Table.**

Saves all the tags created by the users, so when a user asks for the tags that he created we can show it.

**Tasks Tagged.**

Saves all the tags that every task haves. If you add a tag to a task, one of this is going to be created to save the relationship.

### Endpoints.<a name="endpoints"></a>

**Users Table.**

'/users/signup' → `post` to register into the system.

'/users/login' →`post` to get into the system.

'/users/:iduser → `put` edits the user information.

'/users/:iduser' → `delete` deletes the user and all his info.

**Tasks Table.**

'/tasks' → `post` creates a new task for a user.

'/tasks/:idtask' → `put` changes information of a task.

'/tasks/users/:iduser' →*`get`* returns all the tasks of the user.

'/tasks/users/:iduser?deleted=true' → `get` returns all the tasks deleted of a user.

'/tasks/projects/:idproject' →*`get`* returns all the tasks that belongs to the project.

'/tasks/projects/:idproject?deleted=true' →*`get`* returns all the tasks  deleted that belongs to the project.

'/tasks/:idtask' →`delete` marks as deleted the task.

**Projects Table.**

'/projects' →`post` creates a new project.

'/projects/:iduser' → `get` returns all the not archived projects of the user.

'/projects/:iduser?archived=true' → `get` returns all the archived projects of the user.

'/projects/:idproject' → `put` marks the project as archived or changes the name of it.

'/project/:idproject' → `delete` deletes the project with all it's tasks.

**Tags Table.**

'/tags' → `post` creates a new tag that belongs to the user.

'/tags/:iduser' → `get` returns all the tags that belongs to the user.

'/tags/:idtag' → `put` edit the tag information.

'/tags/:idtag' → `delete` deletes the tag.

**Tasks Tagged.**

'/taskstagged' → `post` creates a new tag for a task.

'/taskstagged/:idtaskstagged' → `delete` deletes the tag of the task.

### Postman collection of the endpoints.<a name="postman"></a>

[Postman Collection](https://web.postman.co/collections/11228098-060b9bb6-55d3-47a8-93e0-1de55a2e0668?version=latest&workspace=ad6b593d-3cca-46a9-8864-c87f1dd423b7)