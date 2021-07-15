# PROJECT SETUP
This repository contains the Vue-Frontend. The backend is located in a separate repository. This allows independent versioning of frontend and backend.

On your computer the final structure with both repositories in one folder should look like this:
```	
fine_app
├── fine_backend
├── fine_frontend
```
# FRONTEND SPECIFIC: QUICK START VUE IN DOCKER CONTAINER 

## Project setup
We use docker compose because it makes it easy to start the container, specify volumes and provide hot-reload for development. 
## Build Containers
-> inside the fine_frontend-Folder
```console
docker-compose build
```
### Run Containers in Docker 
-> inside the fine_frontend-Folder
```console
docker-compose up
```

## Tear down Containers in Docker
-> inside the fine_frontend-Folder
```console
docker-compose down
```

# FRONTEND SPECIFIC: QUICK START VUE
## Project setup 
-> inside the fine_frontend-Folder
```console
npm install
```

## Compiles and hot-reloads for development
-> inside the fine_frontend-Folder
```console
npm run serve
```

## Compiles and minifies for production
-> inside the fine_frontend-Folder
```console
npm run build
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# ESLINT
The linter is enabled by default and always runs at 
```console
npm run serve
```
You can manually lint with
```console
npm run lint
```
Lint specifications in detail: https://github.com/airbnb/javascript 

## Autofix Problems, Style and Syntax with ESLINT 
-> inside the fine_frontend-Folder
```console
npm run lint --fix
```

# Icon Sprite
The Icon Sprite will be generated with the module svg-sprite. It replaces the default icon color with currentColor, so it can be styled inside the code. All svg icons must be named by 'size'-'name' and placed inside src/assets/icons.
To generate a sprite run (inside the fine_frontend-Folder)
`npm run icons`
For Windows-User please use
`npm run icons-win`

# Touch Events
Library: https://github.com/robinrodricks/vue3-touch-events#readme

