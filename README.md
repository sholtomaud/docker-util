# docker-util

A node.js command line utility for building and running  docker containers for development projects.

Docker-util  is designed to be run from npm run scripts so that you get the packageName and packageVersion from your package.json file. This enables you to pick up your project details and embed them in your docker image and containers, giving each project a distinct container.

# Commands

**Pull Centos7 base image:** ```>docu  centos7```

When building or running an image or container you need to specify which node version you're running this as

## Server

**Build Server:** ```>docu  build --task server --node 6 -os centos7```

Running a server takes a node version because you may have multiple images which have different node versions. Be sure to specify which version of node you are running against.

**Run Server:**
```bash
docu  run --task server --node 6
```

## Client

**Build Client:** ```>docu  build --task client --node 6 -os centos7```

As with server, running a client takes a node version because you may have multiple images which have different node versions. Be sure to specify which version of node you are running against.

**Run Client** ```>docu  run --taks client --node 6```
