console.log('Hello World');
import React from 'react';
import ReactDOM from 'react-dom';
import question from './question';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(question),
    document.getElementById('mount')
  );
});
