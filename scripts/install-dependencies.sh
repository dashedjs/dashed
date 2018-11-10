#!/usr/bin/env bash

set -e

packages=`ls packages`
echo ${packages[@]}

for package in ${packages[@]}; do
  if [[ ${package} == utils || ${package} == styles || ${package} == icons ]]; then
    cd packages/${package}
    npm link
    cd ../..
  fi
done

for package in ${packages[@]}; do
  if [[ ${package} == base ]]; then
    cd packages/${package}
    npm link @dashedjs/dashed-styles
    npm link @dashedjs/dashed-utils
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
  if [[ ${package} == utils || ${package} == styles || ${package} == icons ||  ${package} == base || ${package} == index.js ]]; then
    echo "skipping ${package}"
  elif [[ ${package} == header ]]; then
    cd packages/${package}
    npm link @dashedjs/dashed-icon @dashedjs/dashed-icons @dashedjs/dashed-utils @dashedjs/dashed-styles @dashedjs/dashed-base
    npm link
    cd ../../
    echo skipping header
  else
    cd packages/${package}
    npm link @dashedjs/dashed-base  @dashedjs/dashed-utils @dashedjs/dashed-styles
    npm link
    cd ../../
  fi 
done
