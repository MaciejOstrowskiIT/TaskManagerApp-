#!/bin/bash

if ! command -v npm &> /dev/null
then
    echo "npm not found. Please install npm and try again."
    exit 1
fi

submodules=$(find . -type f -name package.json -exec dirname {} \;)

for submodule in $submodules
do
    if [[ "$submodule" =~ /node_modules/ ]]; then
        continue
    fi
    
    if [ -d "$submodule/node_modules" ]; then
        continue
    fi
    
    echo "Navigating to $submodule"
    cd "$submodule" || { echo "Failed to navigate to $submodule"; continue; }
    
    if [ -f package.json ]; then
        echo "Running npm install in $submodule"
        npm install
    fi
    
    cd - > /dev/null
done

echo "npm install completed for all applicable submodules."
