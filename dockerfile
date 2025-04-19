# Use an official Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before copying other files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Build the React app (optional, if you’re using a production build)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 5173  


# Command to start the app (adjust if necessary)
CMD ["npm", "run", "dev"]
