# Task Manager Application - Project Setup

This README provides instructions for setting up the Task Manager Application project.

## Prerequisites

- Node.js (v18) and npm
- Docker and Docker Compose
- Linux (WSL can cause problems)
- Git

## Getting Started

1. Clone the repository and its submodules:
   ```bash
   git clone --recursive [repository-url]
   cd [repository-directory]
   ```

2. Run the project setup script:
   ```bash
   ./project_setup.sh
   ```

This script will:
- Update submodules
- Add necessary permissions
- Install npm dependencies
- Start Docker containers

## Project Structure

The project consists of several microservices and a frontend application:

- `user-service-tma` (Port: 4051): User management service
  - Handles basic user operations (listing users)
  - Manages user pagination and sorting
  
- `user-details-service-tma` (Port: 4052): User details service
  - Provides detailed user information (address, phone)
  - Handles individual user data requests
  
- `task-service-tma` (Port: 4053): Task management service
  - Manages user tasks (create, update, list)
  - Handles task status updates and filtering
  
- `frontend-tma` (Port: 3000): React-based frontend application
  - Modern UI built with Material-UI
  - Responsive design with mobile support
  - Real-time alerts and notifications

## Running the Application

After the setup script completes:

1. The backend services will be running in Docker containers
2. MongoDB will be available at port 27017
3. The frontend application will be accessible at `http://localhost:3000`
4. Each service can be monitored through Docker logs

## Development

- Each service has its own `package.json` file for managing dependencies and scripts
- The frontend uses:
  - React with TypeScript for type safety
  - Material-UI for consistent styling
  - React Router for navigation
  - Axios for API requests
- Backend services are built with:
  - Node.js and Express
  - MongoDB for data storage
  - TypeScript for better code maintainability
  - CORS enabled for development

## API Endpoints

- User Service: http://localhost:4051/api/users
- User Details Service: http://localhost:4052/api/users/:id
- Task Service: http://localhost:4053/api/users/:id/tasks

## Prerequisites

Before running the setup script, ensure you have:
- Docker and Docker Compose installed
- Node.js (version 18 or higher)
- Superuser (sudo) privileges
- Git installed

## Common Issues

1. **Script stuck at "Running 'sudo docker-compose up'..."**
   - Make sure you have superuser privileges
   - Solution: 
     ```bash
     # Add your user to docker group
     sudo usermod -aG docker $USER
     # Log out and log back in for changes to take effect
     ```
   - Alternative: Run the script with sudo privileges

2. **Port conflicts**
   - Ensure these ports are available:
     - 3000 (Frontend)
     - 4051 (User Service)
     - 4052 (User Details Service)
     - 4053 (Task Service)
     - 27017 (MongoDB)
   - Solution: Stop any services using these ports or modify the port configuration in docker-compose.yml

3. **Permission denied errors**
   - If you encounter permission issues with scripts:
     ```bash
     chmod +x project_setup.sh
     chmod +x scripts/*.sh
     ```

4. **Node modules installation fails**
   - Clear npm cache:
     ```bash
     npm cache clean --force
     ```
   - Delete existing node_modules:
     ```bash
     find . -name "node_modules" -type d -prune -exec rm -rf '{}' +
     ```