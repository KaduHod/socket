#!/bin/bash

dockerStatus=$(service docker status)

if echo "$dockerStatus" | grep -q "* Docker is not running"; then
    sudo service docker start;
fi

netWorkName="socket-project"

if docker network inspect "$netWorkName" >/dev/null 2>&1; then
    echo "A rede $network_name já está criada."
else
    sudo docker network create "$netWorkName"
fi

docker compose up --build
