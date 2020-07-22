# FolkHub  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-green.svg)

FolkHub is a social media platform. The main idea is to demonstrate how one can build a large scalable project with Javascript. However you get the core functionality of social network by running one command and then you can build more on top of that.

Repository is divided into three main packages:

- **api** This package contains API for Social Networking App, built with Nodejs, Express and MongoDB with Mongoose.
- **frontend** Is a frontend for Social Networking App, built with HTML, CSS, Bootstrap, Javascript and Styled Components.
- **lib** Is a Nodejs command line script, that helps users to install FolkHub App with one command.

## Features

- **News Feed** All posts are showed.
- **Dashboard** graph will show the statics.
- **Create Post** You can create post.
- **Categories** You can create your own different categories.
- **Comments** You can handlde comments on your posts.
- **Authentication & Authorization** with Password reset functionality.

## Demo

https://folkhub.herokuapp.com/

## Screenshots of the app

|                                        Home                                        |                                        Dashboard                                        |
| :--------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------: | 
| ![](https://github.com/harshitbansal373/folkhub/blob/master/public/uploads/home.png) | ![](https://github.com/harshitbansal373/folkhub/blob/master/public/uploads/dashboard.png) |

|                                        Create Post                                        |                                        All Posts                                        | 
| :----------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------: | 
| ![](https://github.com/harshitbansal373/folkhub/blob/master/public/uploads/createPost.png) | ![](https://github.com/harshitbansal373/folkhub/blob/master/public/uploads/allPosts.png) |

## Quick Installation

After installation open [http://localhost:4111/](http://localhost:4111/) to see your FolkHub app as cms.

```
cms
├── config
├── helpers
├── models
├── node_modules
├── .gitignore
├── public
├── routes
├── views
├── app.js
├── package-lock.json
├── package.json
├── README.md
```

Once the installation is done, you can open your project folder:

```sh
cd cms
```

And start the application with `npm start` or `yarn start` that will run the app in development mode.
Open [http://localhost:4111/](http://localhost:4111/) to view it in the browser.

The page will automatically reload if you make changes to the code.

## Contribution
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.
