#!/bin/bash

cd $(dirname $(realpath $0))
rm -r -f node_modules
npm install
git pull
node --max-old-space-size=4096 kissmanga.js
node --max-old-space-size=4096 mangago.js
git add .
git commit -m 'autoupdate'
git push