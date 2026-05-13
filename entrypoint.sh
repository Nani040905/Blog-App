#!/bin/bash

# Start MongoDB
echo "Starting MongoDB..."
mkdir -p /data/db
mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db

# Start Backend
echo "Starting Backend..."
cd /app/backend
node server.js &

# Start Nginx in foreground
echo "Starting Nginx..."
nginx -g "daemon off;"
