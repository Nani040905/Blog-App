#!/bin/bash

# Render provides the port in $PORT environment variable
# If not set, default to 80 (for local testing)
LISTEN_PORT=${PORT:-80}
echo "Configuring Nginx to listen on port $LISTEN_PORT"

# Substitute %PORT% in the nginx config with the actual port
sed -i "s/%PORT%/$LISTEN_PORT/g" /etc/nginx/sites-available/blogapp

# Start MongoDB in the background
echo "Starting MongoDB..."
mkdir -p /data/db
mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

# Start Backend in the background, explicitly on port 3000
echo "Starting Backend on port 3000..."
cd /app/backend
PORT=3000 node server.js &

# Start Nginx in the foreground
echo "Starting Nginx Proxy..."
nginx -g "daemon off;"
