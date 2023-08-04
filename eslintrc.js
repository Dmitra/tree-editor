module.exports = {
  env: {
    browser: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb-base'
  ],
  globals: {
    _: true
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  plugins: [
    'react'
  ],
  root: true,
  settings: {
    'import/resolver': {
      node: {
        paths: ['ide', 'platform'],
        extensions: ['.js', '.jsx']
      }
    }
  },
  rules: {    // array1[i] = array2[j] should be possible
    'prefer-destructuring': ['error', { AssignmentExpression: { array: false } }],
    // Automatic semicolon insertion saves time and symbols
    semi: ['error', 'never'],
    // ensure semicolon when it is needed
    'semi-style': ['error', 'first'],
    'func-names': 0,
    // 4 symbols is too much for max 100 string length
    indent: ['error', 2, { 'SwitchCase': 1 }],
    'vars-on-top': 0,
    'comma-dangle': ['error', 'always-multiline'],
    // useful but cannot handle all cases
    'consistent-return': 0,
    'space-before-function-paren': ['error', 'always'],
    'function-paren-newline': 0,
    // clean after debugging
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    // it is necessary to document what is passed to callback
    'no-unused-vars': ['error', { args: 'none' }],
    // undefined is pretty usefull by itself
    'no-undefined': 0,
    // no need in empty parentheses after self-explanatory new tagKeysword
    'new-parens': 0,
    // let's deprecate C++ than
    'no-plusplus': 0,
    'no-loop-func': 0,
    // mutational functions are a great feature of JS
    'no-param-reassign': 0,
    // linting is a bad way to fix language
    'no-continue': 0,
    // naming convention for private methods and params
    'no-underscore-dangle': 0,
    // non-critical errors can be just caught
    'no-empty': ['error', { allowEmptyCatch: true }],
    // short conditional function call is highly readable
    'no-unused-expressions': ['error', { allowTernary: true }],
    // enable the following use case:
    // function (a, b, ...args) {
    //   _.isEmpty(arguments)
    'prefer-rest-params': 0,
    'import/no-extraneous-dependencies': ['error', {
      devDependencies: true,
    }],
    "import/no-named-as-default-member": 0,
    'import/prefer-default-export': 0,
    // algebra is a must
    'no-mixed-operators': 0,
    'eol-last': ['error', 'never'],
    'operator-linebreak': ['error', 'after'],
    'default-case': 0,
    'object-curly-newline': ["error", { "consistent": true }],
    'arrow-parens': ["error", "as-needed"],
    'no-use-before-define': ['error', { 'functions': false }],
    'radix': ['error', 'as-needed'],
    'multiline-ternary': [
      'error',
      'never'
    ],
    'lines-between-class-members': [
      'error',
      'always',
      {
        'exceptAfterSingleLine': true
      }
    ],
    'import/extensions': ['error', 'never', {
      css: 'always',
      json: 'always'
    }],
    'react/display-name': 0,
    'react/prop-types': [
      'error',
      {
        'skipUndeclared': true
      }
    ],
    'react/no-unescaped-entities': [
      'error',
      {
        'forbid': [
          '>',
          '<'
        ]
      }
    ],
    'import/no-named-as-default': 0,
  },
}
