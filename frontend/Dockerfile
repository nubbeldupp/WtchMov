FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV WDS_SOCKET_PORT=0

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
