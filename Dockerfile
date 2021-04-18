# Use Node Version 14.16 and alpine, because it is smaller
FROM node:14.16-alpine

# Set the working directory 
WORKDIR /frontend

# copy package.json into the container 
COPY package*.json ./

# install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

EXPOSE 8080

# Run the app when the container launches
CMD ["npm", "run", "serve"]
