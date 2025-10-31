FROM node:22-bookworm-slim AS builder
WORKDIR /app

# Build argument for API URL
ARG VITE_API_URL=http://localhost:6900
ENV VITE_API_URL=$VITE_API_URL

# Install dependencies first for better caching
COPY package*.json ./
RUN npm install

# Build the Vite app
COPY . .
RUN npm run build

FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copy custom nginx config (handles SPA routing)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copy production build artifacts
COPY --from=builder /app/dist ./

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
