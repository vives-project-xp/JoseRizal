# Build stage
FROM node:20.19.1-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the application for production
RUN npm run build

# Production stage with Nginx
FROM nginx:stable-alpine

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Nginx runs as non-root by default
CMD ["nginx", "-g", "daemon off;"]