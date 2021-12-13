# Families Share by GingerTeam
The Project consists in the development of new features to be implemented in an existing Android application, called [“Families Share”](https://github.com/vilabs/Families_Share-platform).
The aim of the project is to extend the initial idea of the project described above, which aimed to use the application by small groups of parents who knew each other, to make the application usable to a greater number of parents, even non-acquaintances, while guaranteeing availability, and above all, safety for their children.
  
Therefore, the objectives are:
- Safety for their children <img src="https://lluch.org/sites/lluch.org/files/images/patients-families/safe-kids/ch-safety.jpg" alt="safety" width="400"/>
- Availability <img src="https://itsm.tools/wp-content/uploads/2017/06/measure-and-report-1024x512.png" alt="availability" width="400"/>
- Ease of use <img src="https://lockinside.com/wp-content/uploads/2019/04/easy-work.png" alt="easy" width="400"/>

## Features

- We will implement a categorization of activities, making it easier to find a group that parents could potentially be more interested in. We will use a category filter function for this.
- We will also implement a group bulletin board, which can be viewed before registering with the group itself, consisting of photos of the proposed activity, so as to make it easier to evaluate the actual activities proposed by the various groups.
- We will implement buttons that will allow notice of the correct performance of a previously established activity.
- The latest implementation concerns the feedback system for volunteers, this service will allow you to extend the use of the application to a larger circle of parents.

## Installation

First of all download the project or clone the repository.
We recommend you to use [nvm](https://github.com/nvm-sh/nvm) to select the right version of nodejs to use.
To run this project you need to use nodejs version 10.14.2, run your cmd as administrator:

```sh
nvm install 10.14.2 64
nvm use 10.14.2
npm install supervisor -g
```

Now you have to install all the packages in the main folder (server) and in the client folder:

```sh
npm install
```

Remember that you have to edit the two .env files as well. as described on the original project page. 
After that, to start the project, go to the main folder (server) and run:

```sh
npm run dev
```
## License

MIT

**Free Software, Hell Yeah!**
