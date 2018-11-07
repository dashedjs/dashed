#!/usr/bin/env bash

set -e

sharedPackages=`ls packages`
for sharedPackage in ${sharedPackages[@]}; do
  if [[ ${sharedPackage} == utils || ${sharedPackage} == styles || ${sharedPackage} == icons ]]; then
    cd packages/${sharedPackage}
    npm link
    cd ../..
  fi
done

packagesFolders=`ls packages`
echo ${packageFolders[@]}
for packageFolder in ${packagesFolders[@]}; do
  if [[ ${packageFolder} == utils || ${packageFolder} == styles || ${packageFolder} == icons || ${packageFolder} == index.js ]]; then
    echo "skipping ${packageFolder}"
  elif [[ ${packageFolder} == icon ]]; then
    cd packages/${packageFolder}
    npm link @dashedjs/dashed-icons
    npm link
    cd ../../
  elif [[ ${packageFolder} == header ]]; then
    cd packages/${packageFolder}
    npm link @dashedjs/dashed-icon @dashedjs/dashed-icons @dashedjs/dashed-utils @dashedjs/dashed-styles
    npm link
    cd ../../
  else
    cd packages/${packageFolder}
    npm link @dashedjs/dashed-utils @dashedjs/dashed-styles
    npm link
    cd ../../
  fi 
done
