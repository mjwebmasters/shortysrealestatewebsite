#!/bin/bash

# Start MongoDB if not running
if ! docker ps | grep -q realestate-mongodb; then
    echo "Starting MongoDB..."
    docker-compose up -d mongodb
    sleep 5 # Wait for MongoDB to be ready
fi

# Start backend
echo "Starting backend server..."
cd backend
npm install
npm start &
BACKEND_PID=$!

# Start frontend
echo "Starting frontend server..."
cd ../client
npm install
npm start &
FRONTEND_PID=$!

# Function to handle cleanup
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID
    kill $FRONTEND_PID
    exit
}

# Trap SIGINT and SIGTERM signals and call cleanup
trap cleanup SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 