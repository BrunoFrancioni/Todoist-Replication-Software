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
    - [Technicals details of our software](#technicaldetails)
        - [System Constraints](#constraints)
        - [Working behaviour of the system views](#behaviour)
        - [General working behaviour](#generalbehaviour)
- [Section 3 - Final thoughts](#section3)
    - [What I achieved](#archieved)
    - [What I didn't achieved](#notarchieved)
    - [What I learned](#learned)


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

### Technicals details of our software.<a name="technicaldetails"></a>

#### System Constraints.<a name="constraints"></a>

1. If you create a new task and you don't specify the day, it will be saved in the actual day.
2. You can't create tasks for the days before today.
3. You can't change the `iduser` of the tables Tags, Projects and Tasks because the tasks belongs to the user.
4. You can't modifies the tuples of the table TasksTagged. You can just request, add and delete from it.
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

## Section 3 - Final thoughts.<a name="section3"></a>

### What I achieved.<a name="achieved"></a>

- The principal behaviour of Todoist is present in the software.
- The system gives a good user experience.
- If you delete a task or you archived a project you can retrieve them.

### What I didn't achieved.<a name="notachieved"></a>

- There is no way to make a search in the system.
- The upbar don't shows how many tasks you marked as complete.
- There are no tests in all over the project.

### What I learned.<a name="learned"></a>

- Is really necessary to write tests to make a better code.
- I don't feel confortable using javascript in the backend. Next time that I want to develop a project in Node, I want to use a framework that uses Typescript, so I will be more sure about the types of the data that is sended from the app.
