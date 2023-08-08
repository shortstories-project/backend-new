#!/bin/bash

git pull
/root/.nvm/versions/node/v18.17.0/bin/node
/root/.nvm/versions/node/v18.17.0/bin/npm install
/root/.nvm/versions/node/v18.17.0/bin/npm run build
/root/.nvm/versions/node/v18.17.0/bin/pm2 restart api
