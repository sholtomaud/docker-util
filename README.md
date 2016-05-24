# docker-util

A node.js command line utility for building and running  docker containers for development projects.

Docker-util  is designed to be run from npm run scripts so that you get the packageName and packageVersion from your package.json file. This enables you to pick up your project details and embed them in your docker image and containers, giving each project a distinct container.

# Commands

**Pull Centos7 base image:** ```>docu  centos7```

When building or running an image or container you need to specify which node version you're running this as

**Build Server: ** ```>docu  --buildServer --node 6```

**Run Server: ** ```>docu  --runServer --node 6```

**Build Client** ```>docu  --buildClient --node 6```

**Run Client** ```>docu  --runClient --node 6```
