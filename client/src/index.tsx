import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import store from './store/store';
import { SpeechProvider } from "@speechly/react-client";

const SPEECHLY_API = process.env.REACT_APP_SPEECHLY_API || '';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SpeechProvider appId={SPEECHLY_API}>
      <Provider store={store}>
        <App />
      </Provider>
    </SpeechProvider>  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
