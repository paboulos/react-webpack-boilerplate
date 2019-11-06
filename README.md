# A React boilerplate with unified webpack config for client and server modules

- The path that you provide to the express.static function is relative to the 
  directory from where you launch your node process.
- Use 'yarn run start' nodemon will monitor source folder and rebuild automatically 

# Summary of how it was created follows.

## yarn PnP
Added to package pnp: true. Similar to create-react-app --use-pnp

## Webpack was setup via wizard 
- Note: (don't overwrite package.json if you want to preserve previous changes. 
    For help node_modules\.bin\webpack --help)
  1. yarn add rimraf webpack-node-externals webpack webpack-cli @webpack-cli/init --dev
  2. start wizard: node_modules\.bin\webpack-cli init
  3. webpack will create verification entry files that can be removed

## Boilerplate Install
- yarn install
- yarn run build
- yarn run start
- yarn run clean

## Unit Testing
- flow-typed install jest enzyme
- Tests are transpiled with flow-remove-type
- Tests are executed from the temp directory
## enzyme
- yarn add enzyme enzyme-adapter-react-16 --dev

## Node debug
Open chrome://inspect in a Chromium-based browser 
  - Click the Configure button and ensure your target host and port are listed.

  - Visual Studio Code also has a debug: In the Debug panel, click the settings 
    icon to open .vscode/launch.json. Select "Node.js" for initial setup.

## Flow Dependencies
- yarn global add flow-typed 
- yarn add flow-bin --dev
- yarn add @babel/preset-flow --dev
- The flow-typed install command reads your project’s package.json file, queries the flow-typed 
  repository for libdefs matching your dependencies, and installs the correctly-versioned libdefs 
  into the flow-typed/ directory for you. By default, Flow knows to look in the flow-typed/ 
  directory for libdefs — so there is no additional configuration necessary.
    
## eslint Dependencies
- yarn add eslint --dev
- yarn add babel-eslint --dev
- yarn add eslint-plugin-flowtype --dev
- yarn add eslint-import-resolver-webpack --dev
- yarn add eslint-import-resolver-babel-module --dev
- yarn add eslint-plugin-import --dev

## Async/Await dependencies
- yarn add @babel/polyfill
- yarn add @babel/plugin-transform-regenerator --dev

## dev monitoring
- create a node script that runs the webpack compiler and run it from nodemon  