# Learn Docker

This is just following a tutorial to learn the basics of docker in preparation for the capstone project.

Instruction:

To initialize the docker image, you open `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`. This will build up the development version of the web app dockers and you will be able to connect.

You can clear up the docker images with `sudo docker-compose down`.

After using NGINX, to scale up, you can use the `--scale` flag: i.e. `sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build --scale node-app=2` to have two ports open on the backend.
