#!/usr/bin/env bash

set -e

packagesFolders=`ls packages`
echo ${packageFolders[@]}
for packageFolder in ${packagesFolders[@]}; do
  if [[ ${packageFolder} == index.js ]]; then
    echo "skipping ${packageFolder}"
  elif [[ -d packages/${packageFolder}/dist ]]; then
    cd packages/${packageFolder}
    rm -r dist
    cd ../../
  fi
done
