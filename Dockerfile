# Use an official Node.js image as the base image
FROM node:20
# Set the working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire project to the working directory
COPY . .
# Build the Next.js application
RUN npm run build
# Expose the port on which your Next.js application will run (change this if needed)
EXPOSE 3001
# Start the Next.js application
CMD ["npm", "start"]