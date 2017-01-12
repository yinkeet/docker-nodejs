# Docker NodeJS

This is a bootstrap for developing NodeJS apps using Docker.
Under the hood it uses Gulp to automate tasks and watch for file changes.

Browsersync is used in development mode to reload browser(s) automatically on file changes.
For minification and transpilation, gulp-sass and gulp-ugilify are used in conjunction with gulp-sourcemaps .

***
## Development

### Running the server

1. Prepare the utilities script

        $ chmod +x docker-utilities.sh

    to make the it executable.

2. Run the server by using the utilities shell script included

        $ ./docker-utilities.sh run-dev

### Creating a static page

1. Create a folder in the **public** folder, the name of the folder will make up the url.

        public $ mkdir hello-world

2. In that folder, create an **index.html** file.

        hello-world $ touch index.html

3. Navigate to http://localhost:3000/hello-world to view your page.

### Adding a SASS file to your page

1. Create a folder in **resources** and name according to the route.

        resources $ mkdir hello-world

    Then proceed to create a **SASS** folder in that folder.

        hello-world $ mkdir sass

2. Create a **SCSS** file in that folder.

        sass $ touch style.scss

3. Anytime you make changes to any sccs file, a css file with the same name will be compiled in the corresponding public folder. In this example **style.css** can be found at **src/public/hello-world**.

4. You could also add a **CSS** file directly to any css folder in the **public** folder. But bear in mind that if a same named **SCSS** file also exists in the css folder it will be overwritten.

### Adding a JS file to your page

1. Create a folder in **resources** and name according to the route.

        resources $ mkdir hello-world

    Then proceed to create a **JS** folder in that folder.

        hello-world $ mkdir js

2. Create a **JS** file in that folder.

        js $ touch custom.js

3. Anytime you make changes to any js file in the resources folder, an uglified js file with the same name and **min** extension will be compiled in the corresponding public folder. In this example **custom.min.js** can be found at **src/public/hello-world**.

4. You could also add a **JS** file directly to any js folder in the **public** folder. But bear in mind that if a same named **SCSS** file also exists in the css folder it will be overwritten.

## Production

### Running server in production

Running the server in production is easy, there are 2 commands in **docker-utilities** to help us do just that.

1. Prepare the utilities script (skip this step if you have already done it)

        $ chmod +x docker-utilities.sh

    to make the it executable.

2. Run the server by using the utilities shell script included

        $ ./docker-utilities.sh build-run-prod

    This command builds the resources folder for production then runs the server in production mode.

        $ ./docker-utilities.sh run-prod

    This command just runs the server in production mode.

### Folder structure

```
.
+-- nodejs
|   +-- Dockerfile
|   +-- Dockerfile-build
|   +-- Dockerfile-prod
|   +-- gulpfile.build.js - gulp tasks for production build
|   +-- gulpfile.js - gulp tasks for development
|   +-- package.json
+-- src
|   +-- bin
|       +-- server.js - main file
|   +-- controllers
|   +-- helpers - helper js files goes here
|   +-- public - nodejs express static pages
|   +-- resources - development javascript and css located here
+-- docker-compose.build.yml
+-- docker-compose.prod.yml
+-- docker-compose.yml
+-- docker-utilities.sh
```