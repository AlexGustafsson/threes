#!/usr/bin/env bash

name="$(cat package.json | grep -o "name....[^\"]\{0,\}" | head -1 | cut -b 9-)"
version="$(cat package.json | grep -o 'version....[^\"]\{0,\}' | cut -b 12-)"

docker build -t "$name" -t "$name:$version" .
