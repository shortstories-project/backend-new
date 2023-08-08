#!/bin/bash

export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

git pull

node_path=/root/.nvm/versions/node/v18.17.0/bin/node
npm_path=/root/.nvm/versions/node/v18.17.0/bin/npm
pm2_path=/root/.nvm/versions/node/v18.17.0/bin/pm2

$node_path $npm_path install
$node_path $npm_path run build
$node_path $pm2_path restart api
