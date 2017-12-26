#!/bin/bash

yarn install 
yarn global add pm2 
yarn cache clean 
yarn build 
export NODE_ENV=production
pm2-docker --raw process.yml