#!/bin/sh

set -e

pnpm i
pnpm update:version

pnpm build

find dist/customhub/packages -type d -name node_modules -print0 | xargs -0 -I {} rm -rf {}

cd dist/customhub
npm publish --access public
cd -

echo "Publish completed"
