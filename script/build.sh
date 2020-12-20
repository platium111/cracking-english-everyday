#!/usr/bin/env bash

build() {
  echo 'cracking library build script'

  rm -rf dist/*

  export INLINE_RUNTIME_CHUNK=false
  export GENERATE_SOURCEMAP=false

  npm run build

  mkdir -p dist
  cp -r build/* dist

  mv dist/index.html dist/popup.html
}

build