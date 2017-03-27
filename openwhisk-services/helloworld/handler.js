'use strict';

function hello(params) {
  const name = params.name || 'World';
  //return { payload: `Hello, ${name}!` };
  return params;
}

exports.hello = hello;
