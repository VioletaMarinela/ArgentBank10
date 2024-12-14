import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importez le Provider  
import store from './Redux/store'; // Importez votre store  
import './Assets/css/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Enveloppez votre application avec le Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);