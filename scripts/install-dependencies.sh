#!/usr/bin/env bash

set -e

packages=`ls packages`

for package in ${packages[@]}; do
  if [[ ${package} == icons ]]; then
    cd packages/${package}
    npm link
    cd ../..
  fi
done

for package in ${packages[@]}; do
  if [[ ${package} == base ]]; then
    cd packages/${package}
    npm link
    cd ../../
  elif [[ ${package} == icon ]]; then
    cd packages/${package}
    npm link @dashedjs/dashed-icons
    npm link
    cd ../../
    echo skipping icon
  fi
done

for package in ${packages[@]}; do
  echo "into package ===> ${package}"
  if [[ ${package} == icons || ${package} == base || ${package} == index.js ]]; then
    echo "skipping ${package}"
  elif [[ ${package} == header ]]; then
    cd packages/${package}
    npm link @dashedjs/dashed-base @dashedjs/dashed-icon @dashedjs/dashed-icons
    npm link
    cd ../../
  else
    cd packages/${package}
    npm link @dashedjs/dashed-base
    npm link
    cd ../../
  fi 
done
