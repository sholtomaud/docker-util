# docker-util

A node.js command line utility for building and running  docker containers for development projects.

# Why

Docker-util  is designed to be run from ```npm run <script>``` so that you get the packageName and packageVersion from your package.json file. This enables you to pick up your project details and embed them in your docker image and containers, giving each project a distinct container.

# Constraints

Docker-util makes some assumptions about your development folders.  Specifically that on a client app you build to a folder named 'client'. And your server backend you have  a folder named 'server'. Docker-util then runs against your local folders for your dev containers.

## Init
**Initiate package**
```bash
>docu  init --type client
```

## Server commands

**Build Server:**
```bash
>docu  build --type server --node 6 -os centos7
```
Running a server takes a node version because you may have multiple images which have different node versions. Be sure to specify which version of node you are running against.

**Run Server:**
```bash
>docu  run --type server --node 6
```

## Client commands

**Build Client:**
```bash
>docu  build --type client --node 6 -os centos7
```

As with server, running a client takes a node version because you may have multiple images which have different node versions. Be sure to specify which version of node you are running against.

**Run Client**
```bash
>docu  run --taks client --node 6
```
