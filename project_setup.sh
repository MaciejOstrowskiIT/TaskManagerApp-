#!/bin/bash

LOG_DIR="./logs"
mkdir -p "$LOG_DIR"

SCRIPT_DIR="./scripts"
PERMISSION_SCRIPT="$SCRIPT_DIR/add_permissions.sh"
NPM_INSTALL_SCRIPT="$SCRIPT_DIR/install_npm.sh"
DOCKER_SCRIPT="$SCRIPT_DIR/start_docker.sh"
UPDATE_SUBMODULES_SCRIPT="$SCRIPT_DIR/update_submodules.sh"

run_script() {
    local script=$1
    local log_file=$2

    echo "Running $script..." | tee -a "$log_file"
    bash "$script" 2>&1 | tee -a "$log_file" &
    local pid=$!

    local delay=0.1
    local spinstr='|/-\'
    local temp

    echo -n "Processing $script "
    local progress_indicator=" [|]"

    while ps -p $pid > /dev/null; do
        temp=${spinstr#?}
        progress_indicator=" [${spinstr:0:1}]"
        spinstr=$temp${spinstr%"$temp"}
        printf "\rProcessing $script$progress_indicator"
        sleep $delay
    done
    wait $pid

    if [ $? -ne 0 ]; then
        echo -e "\nError occurred while running $script. Check the log for details." | tee -a "$log_file"
        exit 1
    fi

    printf "\rProcessing $script [Done]\n"
}

run_script "$UPDATE_SUBMODULES_SCRIPT" "$LOG_DIR/update_submodules_log.txt"
run_script "$PERMISSION_SCRIPT" "$LOG_DIR/add_permissions_log.txt"
run_script "$NPM_INSTALL_SCRIPT" "$LOG_DIR/install_npm_log.txt"
run_script "$DOCKER_SCRIPT" "$LOG_DIR/start_docker_log.txt"

echo "Project setup completed."
