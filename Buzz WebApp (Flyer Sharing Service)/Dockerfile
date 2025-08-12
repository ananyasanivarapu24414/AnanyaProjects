# 1. Use Node.js base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# 4. Copy all app files
COPY . .

# 5. Build the app
RUN npm run build

# 6. Start the Next.js server
EXPOSE 3000
CMD ["npm", "start"]
