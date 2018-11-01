#!/usr/bin/env bash

set -e

packagesFolders=(`ls ../packages`)
for packageFolder in ${packagesFolders[@]}; do
  echo ${packageFolder}
done

echo 'hello world'