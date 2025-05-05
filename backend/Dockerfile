# Use the predefined node base image for this application.
FROM node:23.11.0-slim

WORKDIR /app

# This will copy from docker cache unless the package.json file has changed
COPY package.json .

# Install node dependencies
RUN npm install

# add app to root directory
COPY . .

EXPOSE 9000

# Start the app
CMD ["npm", "run", "start:dev"]