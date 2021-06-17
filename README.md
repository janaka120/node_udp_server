# Dummy UDP Server [![DockerHub](https://img.shields.io/badge/docker-hub-brightgreen.svg?style=flat)](https://hub.docker.com/r/eexit/dumudp-server)

A basic UDP mirror server that dumps in STDOUT anything you send to it. Useful to test your application
or metrics backends like DataDog.

## Quick start

    $ docker pull eexit/dumudp-server
    $ docker run -dp 8125:8125/udp --name dumudp-server eexit/dumudp-server

Send your UDP packets:

    $ echo -n "dumudp-server.test.counter:1|c" | nc -w 1 -u 127.0.0.1 8125

Check on the container log:

    $ docker logs -f dumudp-server
    > dumudp-server@1.1.0 start /app
    > node server.js

    Started to listen on 0.0.0.0:8125...
    172.17.0.1:38722 >>> dumudp-server.test.counter:1|c
    172.17.0.1:43596 >>> dumudp-server.test.counter:1|c
    172.17.0.1:39459 >>> dumudp-server.test.counter:1|c


Docker compose up Command 
`docker-compose up --build`


### Change the port

Default port is `8125` but you can change the port by running the container like this (here set the port `28900` up):

    $ docker run -d --name dumudp-server -e PORT=28900 -p 28900:28900/udp eexit/dumudp-server


Docker commands ---

List all Docker containers
- docker container ls -a

To stop a specific container
- docker container stop [container_id]

 Remove a stopped container
 - docker container rm [container_id]


 
- Use `docker ps` to get the name of the existing container
- Use the command `docker exec -it <container name> /bin/bash` to get a bash shell in the container
- Exist from container - `press ctrl+c then ctrl+d`


Mongo DB shell commands
- log to mongo-shell `mongo`
- Show all databases `show dbs`
- Create a database, say, testdb; Switch to the database: `use testdb`
- show all collections - `show collections`
- Add a collection: `db.createCollection("user")`
- Insert recode to collection `db.user.insert({"name": "Ajitesh Shukla", "location": "hyderabad", "username": "eajitesh"})`
- Display list of records of a *user* collection `db.user.find().pretty()`

