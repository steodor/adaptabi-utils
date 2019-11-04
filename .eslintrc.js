module.exports = {
    'extends': ['standard', 'plugin:react/recommended'],
    'parser': 'babel-eslint',
    'plugins': ['react'],
    'globals': {
        'requestAnimationFrame': true,
    },
    "settings": {
        "react": {
            "version": "detect",
        },
    },
    'rules': {
        'no-sequences': 0,
        'no-extend-native': 0,
        'no-return-assign': 0,
        'no-empty-pattern': 0,
        'no-mixed-operators': 0,
        'standard/no-callback-literal': 0,
        'indent': 'off',
        'semi': 0,
        'brace-style': 0,
        'comma-dangle': ['error', 'always-multiline'],
        'one-var': 0,
        'spaced-comment': 0,
        'eqeqeq': 0,
        'operator-linebreak': ['error', 'before'],
        'space-before-function-paren': 0,
        'react/jsx-uses-vars': ['error'],
        'react/display-name': 0,
        'react/prop-types': 0,
    },
};