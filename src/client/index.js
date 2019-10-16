import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
/**
 * Need webpack to bundle the ES6 modules so the frontend can load them.    
 */
ReactDOM.render(<App />, document.getElementById('root'))