import React from 'react';
import ReactDOM from 'react-dom';
import WebApp from './components/WebApp';
import { StyleProvider } from './context/StyleContext';
import './styles/web.css';

ReactDOM.render(
  <StyleProvider>
    <WebApp />
  </StyleProvider>,
  document.getElementById('web-app')
); 