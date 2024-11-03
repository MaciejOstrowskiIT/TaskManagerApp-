#!/bin/bash

echo "Running 'sudo docker-compose up'..."
sudo docker compose up -d

if [ $? -ne 0 ]; then
    echo "Error occurred while running 'docker-compose up'."
    exit 1
fi

echo "Docker containers started successfully."
