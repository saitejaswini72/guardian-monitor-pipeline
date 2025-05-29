# Using Node.js 
FROM node:18

# Creating app directory
WORKDIR /app

# Copy files
COPY backend/ .

# Install dependencies
RUN npm install

#API port
EXPOSE 3000

# Starting the app
CMD ["npm", "start"]

