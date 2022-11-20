#!/usr/bin/env bash
chmod +x ./build.sh

NPM_CONFIG_PRODUCTION=false

echo "INSTALL BACKEND DEPENDENCIES"
npm install

echo "INSTALLING FRONTEND DEPENDENCIES"
cd frontend
npm install

echo "BUILDING FRONTEND"
npm run build
