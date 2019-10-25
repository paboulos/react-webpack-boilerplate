import '@babel/polyfill';
import WebServer from './web.server';


const { log, error } = console;
let webserver = new WebServer(3000);
webserver.start().then(() => log('started')).catch(err => error(err));
 