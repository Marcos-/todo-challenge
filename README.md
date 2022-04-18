
# Boltech Challenge

This is an Fullstack todo app Challenge using React, node and mongo.

To set up, do the following:
1. Start mongo by composing up it's docker containter, on the root dir type:
```
docker-compose up
```
2. Start the node.js backend service on todo-backend
```
cd todo-backend 
npm install
DEBUG=todo-backend:* npm start
```
3. And the same with the react front end service 
```
cd todo 
npm install 
npm start
```

And finally access http://localhost:3001 in your favorite brownser
