FROM node:16 

WORKDIR /VendorApp 

COPY package.json ./ 
RUN npm install --legacy-peer-deps
COPY . . 
RUN npm run build 

EXPOSE 3000 
CMD ["npx", "serve", "build"]