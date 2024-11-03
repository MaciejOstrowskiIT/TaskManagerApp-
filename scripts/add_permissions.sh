#!/bin/bash

submodules=$(find . -type f -name dev-entrypoint.sh -path '*/bin/*')

for dev_entrypoint in $submodules
do
    echo "Adding execute permission to $dev_entrypoint"
    chmod +x "$dev_entrypoint"
done

echo "Execute permissions added to all dev-entrypoint.sh files."
