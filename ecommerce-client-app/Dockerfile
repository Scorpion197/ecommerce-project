FROM node:16

WORKDIR /clientApp 

COPY package.json ./
RUN yarn install 

COPY . . 

RUN pwd && ls 
RUN yarn build 
EXPOSE 3002
CMD ["yarn", "start", "-p", "3002"]
