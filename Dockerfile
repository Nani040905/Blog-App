# Use Node.js 20 as base
FROM node:20-bookworm

# Install MongoDB, Nginx and other utilities
RUN apt-get update && apt-get install -y \
    gnupg \
    curl \
    nginx \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg \
    && echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/debian bookworm/mongodb-org/7.0 main" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-org \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# --- Build Frontend ---
COPY frontend/package*.json ./frontend/
RUN cd frontend && npm install

COPY frontend/ ./frontend/
# Set build-time variables for Vite
ARG HOST_IP=localhost
ENV VITE_API_URL=http://${HOST_IP}:3000
RUN cd frontend && npm run build

# --- Setup Backend ---
COPY backend/package*.json ./backend/
RUN cd backend && npm install --omit=dev

COPY backend/ ./backend/

# --- Setup Nginx ---
RUN rm /etc/nginx/sites-enabled/default
COPY <<EOF /etc/nginx/sites-available/blogapp
server {
    listen 80;
    location / {
        root /app/frontend/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
EOF
RUN ln -s /etc/nginx/sites-available/blogapp /etc/nginx/sites-enabled/

# --- Final Prep ---
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Expose ports
EXPOSE 80 3000 27017

# Set production environment
ENV NODE_ENV=production
ENV MONGO_URI=mongodb://127.0.0.1:27017/blogDB

ENTRYPOINT ["./entrypoint.sh"]
