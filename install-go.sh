#!/bin/bash

# Exit if any command fails
set -e

# Get the latest version of Go
LATEST_VERSION=1.24.0

# Set the download URL and file name
DOWNLOAD_URL="https://go.dev/dl/go${LATEST_VERSION}.linux-amd64.tar.gz"
echo $DOWNLOAD_URL

FILE_NAME="go${LATEST_VERSION}.linux-amd64.tar.gz"

# Download the latest version
echo "Downloading Go $LATEST_VERSION..."
curl -OL $DOWNLOAD_URL

# Remove any existing Go installation
sudo rm -rf /usr/local/go

# Extract the tarball to /usr/local
echo "Extracting Go..."
sudo tar -C /usr/local -xzf $FILE_NAME

# Clean up the tarball
rm $FILE_NAME

# Add Go to PATH if not already present
if ! grep -q 'export PATH=$PATH:/usr/local/go/bin' ~/.profile; then
  echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.profile
  echo 'Go path added to ~/.profile. Please restart your terminal or run "source ~/.profile" to apply changes.'
else
  echo 'Go path already present in ~/.profile.'
fi

# Print Go version to confirm installation
echo "Go installation complete."
export PATH=$PATH:/usr/local/go/bin
go version
