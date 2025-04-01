#!/bin/bash

# Exit if any command fails
set -e

# Update and install prerequisites
echo "Updating package list and installing prerequisites..."
sudo apt-get update
sudo apt-get install -y ca-certificates curl

# Add Docker's official GPG key
echo "Adding Docker's GPG key..."
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add Docker repository to Apt sources
echo "Adding Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
$(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list and install Docker
echo "Installing Docker..."
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Post-installation: Allow running Docker without sudo
echo "Configuring Docker to run without sudo..."
sudo groupadd docker || true  # Ignore error if group already exists
sudo usermod -aG docker $USER

# Apply group changes
echo "Applying group changes..."
newgrp docker

# Enable and start Docker service
echo "Enabling and starting Docker service..."
sudo systemctl enable docker
sudo systemctl start docker

# Check Docker version to verify installation
echo "Docker installation complete. Verifying installation..."
docker version
