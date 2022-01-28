#!/bin/sh

set -e

pnpm build

cd dist/customhub

yalc push

cd ../../play

pnpm uninstall customhub
yalc remove customhub
yalc add customhub
pnpm i customhub

echo "Publish completed"
