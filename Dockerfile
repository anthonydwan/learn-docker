
FROM node:16
# sets the working directory for any subsequent ADD, COPY, CMD, ENTRYPOINT, or RUN instructions that follow it
# in the Dockerfile
# by default sends to that dir
# note that if you do not have node_modules the bind mount might also "delete" it. You need to include node_modules in the command 
WORKDIR /app 
# . means going to /app
COPY package.json .

# this on its own will but we dont need dev dep for prod
# RUN npm install 

# we set the argument NODE_ENV in the compose file so we can run differently
ARG NODE_ENV
# it is important that the spacing is correct or your env will not run properly
RUN if [ "$NODE_ENV" = "development" ]; \
		then npm install; \
		else npm install --only=production; \
		fi
# it is more optimized to first copy package.json 
# this is copying everything (need ignore)
# this is needed for deploy since we do not have bind mount to copy
COPY . ./

ENV PORT 3000
EXPOSE $PORT
CMD ["node", "index.js"]