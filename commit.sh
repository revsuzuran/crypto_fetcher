#!/bin/bash
# Usage: ./git_init_push.sh <GITHUB_TOKEN> <USERNAME> <REPO_NAME>

TOKEN=$1
USERNAME=$2
REPO=$3

if [ -z "$TOKEN" ] || [ -z "$USERNAME" ] || [ -z "$REPO" ]; then
  echo "Usage: $0 <GITHUB_TOKEN> <USERNAME> <REPO_NAME>"
  exit 1
fi

# Init repo
git init
git add .
git commit -m "first commit"

# Set branch
git branch -M main

# Set remote with token
git remote remove origin 2>/dev/null
git remote add origin https://$TOKEN@github.com/$USERNAME/$REPO.git

# Push
git push -u origin main

