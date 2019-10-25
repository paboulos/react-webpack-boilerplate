module.exports = {
    "parser": 'babel-eslint',
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:flowtype/recommended",
        "plugin:jest/recommended",
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        'import',
        'flowtype',
        'jest',
    ],
    "settings": {
      "import/resolver": {
          'babel-module': {},
          'webpack': {'config': 'webpack.config.js'},  
       }
    },

    "rules": {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error" 
    }
};