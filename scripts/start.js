const webpack = require('webpack');
const config = require('../webpack.config');
const argv = {};
argv.mode = 'development';
const configObj = config(null,argv);
var client, server;
[client, server] = configObj;
let serverPath = null;
if (server.output){
  const outputName = server.output.filename.indexOf("name]") 
    ? Object.keys(server.entry)[0] 
    : server.output.filename;
  const outputPath = server.output.path.lastIndexOf("\\") 
    ? "../"+server.output.path.slice(server.output.path.lastIndexOf("\\") + 1, server.output.path.length)
    : "../"+server.output.path.slice(server.output.path.lastIndexOf("/") + 1, server.output.path.length);
  serverPath = outputPath.trim()+'/'+outputName.trim();
}
const compiler = webpack(configObj);

const args = process.argv.slice(2);
if (args.length % 2 !== 0) throw new Error('Invalid Arguments');

compiler.run((err, stats) => {
  if(stats) {
   console.log('Stats:');
   console.log(stats);
   // hash args and capture path value for require
   argObj = args.reduce((acc, arg, idx) => {
     if ((idx + 1) % 2 === 0) acc[args[idx-1]] = arg.trim();
     else acc[arg.trim()] = null;
     return acc;
   },{});

   if (serverPath) {
     console.log(`starting server from file ${serverPath}\n`);
     require(serverPath);
   }else if (argObj["-path"]) {
       serverPath = argObj["-path"];
       console.log(`starting server from file ${serverPath}\n`);
       require(serverPath);
     } else {
       console.log(`Failed to start:No server path`);
     }
  }
  if(err) {
  console.log(`Errors: \n ${err}`);
  }
});

