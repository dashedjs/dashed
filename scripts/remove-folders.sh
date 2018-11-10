#!/usr/bin/env bash

set -e

# packagesFolders=`ls packages`
# echo ${packageFolders[@]}
# for packageFolder in ${packagesFolders[@]}; do
#   if [[ ${packageFolder} == index.js ]]; then
#     echo "skipping ${packageFolder}"
#   elif [[ -d packages/${packageFolder}/dist ]]; then
#     cd packages/${packageFolder}
#     rm -r dist
#     cd ../../
#   fi
# done


packagesFolders=`ls packages`
echo ${packageFolders[@]}
for packageFolder in ${packagesFolders[@]}; do
  if [[ ${packageFolder} == index.js ]]; then
    echo "skipping ${packageFolder}"
  elif [[ -d packages/${packageFolder}/dist ]]; then
    cd packages/${packageFolder}
    rm -r dist
    cd ../../
  elif [[ -d packages/${packageFolder}/node_modules ]]; then
    cd packages/${packageFolder}
    rm -r node_modules
    cd ../../
  elif [[ -f packages/${packageFolder}/package-lock.json ]]; then
    cd packages/${packageFolder}
    rm package-lock.json
    cd ../../
  fi
done
