# Todoist-Replication-Software :ledger:


## Index of content.<a name="index"></a>

- [Index of content](#index)
- [Section 1 - What is this?](#section1)
    - [Quick look of the software's interface and way of working.](#working)
        - [Principal Page](#principalpage)
        - [Today Page](#todaypage)
        - [Upcaming Page](#upcamingpage)
        - [Projects page](#projectsPage)
- [Section 2 - My Personal Replication](#section2)
    - [What defines success for this project?](#successproject)
    - [Technologies to use](#technologies)
    - [Technicals details of our software](#technicaldetails)
        - [Database design](#database)
        - [Endpoints](#endpoints)
        - [Postman collection of the endpoints](#postman)
        - [System Constraints](#constraints)
        - [Working behaviour of the system views](#behaviour)
        - [General working behaviour](#generalbehaviour)


***

## Section 1 - What is this?<a name="section1"></a>

I'm going to replicate [Todoist](http://todoist.com/) App to apply my actuals knowledges in software engenering and extends that ones.

## Quick look of the software's interface and way of working.<a name="working"></a>

First let's make a kick look to the interface of the application.

### Principal page.<a name="principalpage"></a>

![Principal Page View.](/NotionPictures/principal_page.png 'Principal Page View')

We can see the principal page with a navbar to the left, showing:

- Inbox.
- Today.
- Upcoming.

And then we have:

- Projects.
- Labels.
- Filters.

Also, we have a Find Bar to search project or notes. And, at the upper right part we have the option to add a new note, to see how many tasks we archived today, to receive notifications of our tasks and to get into the application's settings.

### Today Page.<a name="todaypage"></a>

![Today Page View.](/NotionPictures/todays_page.png 'Todays Page View')

Today's page shows the simples notes and the project notes for the actual day.

### Upcoming Page.<a name="upcamingpage"></a>

![Upcoming Page View.](/NotionPictures/upcaming_page.png 'Upcoming Page View')

Upcaming's page shows all the notes in a calendar to can see what we are going to do in the next days.

### Projects Page.<a name="projectspage"></a>

![Projects Page View](/NotionPictures/projects_page.png 'Projects Page View')

We can create projects with they own notes to be organized. When we finish them, we can archived them.

***

## Section 2 - My personal replication.<a name="section2"></a>

### What defines success for this project?<a name="successproject"></a>

- Replicate the principal working behaviour of Todoist.
- Have a good written Back End controlling exceptions and giving security to the system
- Make a Front End with a user experience ease-to-use to avoid problems. The objetive is to have the most clean and simple User Interface possible and a reactive User Experience to makes the user feel like everything is fluid.
- Extends my knowlegdes using techonologies like NodeJS, ExpressJS, Sequelize, VueJS, etc.
- Have a real view of what means to develop a software application.
- Gain experience handling bugs and fixing bugs.
- Write good tests that let's us know if our code works fine and performs all the functions that we need.

### Technologies to use.<a name="technologies"></a>
- [NodeJS](https://nodejs.org)
- [ExpressJS](https://expressjs.com)
- [Postegresql](https://www.postgresql.org)
- [Sequelize](https://sequelize.org)
- [VueJS](https://vuejs.org)
- [Bootstrap](https://getbootstrap.com)
- [Postman](https://www.postman.com)
- [Cryptob](https://github.com/kelektiv/node.bcrypt.js)
- [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)

### Technicals details of our software.<a name="technicaldetails"></a>

#### Database design.<a name="database"></a>

![Database Design](/NotionPictures/database_design.png 'Database Design')

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

#### Endpoints.<a name="endpoints"></a>

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

#### Postman collection of the endpoints.<a name="postman"></a>

[Postman Collection](https://web.postman.co/collections/11228098-060b9bb6-55d3-47a8-93e0-1de55a2e0668?version=latest&workspace=ad6b593d-3cca-46a9-8864-c87f1dd423b7)

#### System Constraints.<a name="constraints"></a>

1. Once you create a task, simple or project, you can't edit it to move between the two existing types.
2. If you create a new task and you don't specify the day, it will be saved in the actual day.
3. You can't create tasks for the days before today.
4. You can't change the `iduser` of the tables Tags, Projects and Tasks because the tasks belongs tothe user.
5. You can't modifies the tuples of the table TasksTagged. You can just request, add and delete from it.

5. You can't modifies the tuples of the table TasksTagged. You can just request, add and delete from it.

#### Working behaviour of the system views.<a name="behaviour"></a>

**Inbox View.** 

Lists only the simple tasks. First, sorted by date starting the actual day and after by hour.

It will let's us to create new tasks that are going to go all to the inbox view.

**Today View.**

This is going to be the homepage. Here we are going to show all the tasks. First, the inbox and then all the project ones, sorted by hour in case that they have it.

**Upcoming View.**

Shows today's tasks and we can see them day by day. We can add more specifying if they are gointo to be save in inbox or in some project.

Inbox and project's tasks are going to be presented sorted by hour.

Also, we need to show a button that, if we are in a different day than today, it will take us to the actual day.

**Projects View.**

The lateral bar lists all the projects of the user in case that he have somes.

In every one, lists the tasks sorted by date and the by hour in case of have it. You can add new task to the project.

We need to show two bars with percentage, one with the today's tasks and other with the tasks of the entire project.

Also, we need to put a button so the users can see the archived projects, but them cannot be restored.

**Tags View.**

This view shows all the tags that the user created. If yout click in one of them, it will displays all the actuve tasks that uses the tag. Also, you can create new tags.

#### General working behaviour.<a name="generalbehaviour"></a>

- If a day past and are tasks that are not marked as done, the system is going to show us all that ones and it will ask us if we want to mark them as complete or we want to reprogram them.
- If a task has been deleted, we are going to give the chance to get it back.