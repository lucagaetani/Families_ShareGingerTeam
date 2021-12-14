# Families Share by GingerTeam
The Project consists in the development of new features to be implemented in an existing Android application, called [“Families Share”](https://github.com/vilabs/Families_Share-platform).
The aim of the project is to extend the initial idea of the project described above, which aimed to use the application by small groups of parents who knew each other, to make the application usable to a greater number of parents, even non-acquaintances, while guaranteeing availability, and above all, safety for their children.
  
Therefore, the objectives are:
- Safety for their children, which is the main goal!
- Availability
- Ease of use

## Features

- We will implement a categorization of activities, making it easier to find a group that parents could potentially be more interested in. We will use a category filter function for this.
- We will also implement a group bulletin board, which can be viewed before registering with the group itself, consisting of photos of the proposed activity, so as to make it easier to evaluate the actual activities proposed by the various groups.
- We will implement buttons that will allow notice of the correct performance of a previously established activity.
- The latest implementation concerns the feedback system for volunteers, this service will allow you to extend the use of the application to a larger circle of parents.

## Installation

First of all download the project or clone the repository.
We recommend you to use [nvm](https://github.com/nvm-sh/nvm) to select the right version of nodejs to use.
To run this project you need to use nodejs version 10.14.2, and supervisor, run your cmd as administrator:

```sh
nvm install 10.14.2 64
nvm use 10.14.2
npm install supervisor -g
```

Now you have to install all the packages in the main folder (server) and in the client folder:

```sh
npm install
```

In order to use the software you need to have MongoDB Compass installed or to create a mongodb database in the cloud. You need to create a new document in the database called "Category". It will be necessary to manually add all the categories in the various languages that we intend to implement, as seen in the image.
![alt text](https://github.com/lucagaetani/Families_ShareGingerTeam/blob/main/category.png?raw=true)

Remember that you have to edit the two .env files as well. as described on the original project page. 
After that, to start the project, go to the main folder (server) and run:

```sh
npm run dev
```
## License

MIT

**Free Software, Hell Yeah!**
