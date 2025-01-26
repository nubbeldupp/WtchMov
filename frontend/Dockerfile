FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Clean install dependencies
RUN npm ci --silent

# Copy the rest of the application
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
