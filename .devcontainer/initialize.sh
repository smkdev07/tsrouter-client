#!/usr/bin/env bash

red=$(tput setaf 1)
yellow=$(tput setaf 3)
normal=$(tput sgr0)

# Create docker-compose.local.yml if it doesn't exist

COMPOSE_CONTENTS=$(cat <<-END
# This file allows you to customize the Dev Container environment when running
# it on your machine. It should not be committed to the git repository.
services: {}
END
)

if [[ ! -f './.devcontainer/docker-compose.local.yml' ]]
then
    echo "${yellow}Creating .devcontainer/docker-compose.local.yml...${normal}"

    echo "${COMPOSE_CONTENTS}" > .devcontainer/docker-compose.local.yml
fi

# Ensure directories mounted by the `devcontainer.json` exist.

if [[ ! -d "$HOME/.chassis" ]]
then
    echo "${yellow}Creating chassis config directory...${normal}"
    mkdir -p "$HOME/.chassis"
fi

if [[ ! -d "$HOME/.ssh" ]]
then
    echo "${yellow}Creating ssh directory...${normal}"
    mkdir -p "$HOME/.ssh"
fi

if [[ ! -d "$HOME/.config/devcontainer/gcloud" ]]
then
    echo "${yellow}Creating devcontainer gcloud config directory...${normal}"
    mkdir -p "$HOME/.config/devcontainer/gcloud"
fi

# Docker network create support

function create_docker_network() {
    if [[ ! "$1" =~ $2 ]]
    then
        echo "${yellow}Creating "$2" docker network...${normal}"
        docker network create "$2" 1>/dev/null 2>/dev/null
    fi
}

if ! network_command_output=$(docker network list --format '{{.Name}}' 2>/dev/null)
then
    echo "${red}ERROR: Could not get list of docker networks.${normal}"
else
    existing_networks="${network_command_output[*]}"
    create_docker_network "$existing_networks" "platform"
    create_docker_network "$existing_networks" "local"
fi