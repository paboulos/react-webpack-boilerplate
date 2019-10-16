# A React boilerplate with unified webpack config for client and server modules

- The path that you provide to the express.static function is relative to the 
  directory from where you launch your node process. 

## Webpack setup wizzard 
- Note: From wizard don't overwrite package.json if you want to preserve 
  previous changes.
  1. yarn add rimraf webpack-node-externals webpack webpack-cli @webpack-cli/init --dev
  2. start wizard: node_modules\.bin\webpack-cli init

## Boilerplate Install
yarn install
yarn run build
yarn run start
yarn run clean

