module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
    "standard",
    "eslint:recommended",
    "plugin:react/recommended"
    ],
    "plugins": [
        "react"
    ],
    "rules": {
        "react/prop-types": [0],
        "semi": [2, "always"],
        "comma-dangle": [2, "always-multiline"],
    },
};
