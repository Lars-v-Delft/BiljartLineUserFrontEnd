# Build stage
FROM node:20-alpine as build
WORKDIR /app
# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the entire project to the working directory
COPY . .
# Build the Next.js application
RUN npm run build

# Final stage
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/.next /app/.next
COPY --from=build /app/package*.json /app/
RUN npm install --omit=dev
# Expose the port on which your Next.js application will run
EXPOSE 3000
CMD ["npm", "start"]