#!/bin/bash

<<<<<<< Updated upstream
=======
# Default port to 80 if not set (Render sets $PORT)
RENDER_PORT=${PORT:-80}
echo "Using port $RENDER_PORT for Nginx"

# Substitute port in Nginx config
sed -i "s/%PORT%/$RENDER_PORT/g" /etc/nginx/sites-available/blogapp

>>>>>>> Stashed changes
# Start MongoDB
echo "Starting MongoDB..."
mkdir -p /data/db
mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

# Start Backend
echo "Starting Backend..."
cd /app/backend
<<<<<<< Updated upstream
node server.js &
=======
PORT=3000 node server.js &
>>>>>>> Stashed changes

# Start Nginx in foreground
echo "Starting Nginx..."
nginx -g "daemon off;"
