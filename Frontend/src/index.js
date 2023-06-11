import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../src/views/home/app/store';
import App from './App';
import axios from 'axios';
//import { create } from '@mui/material/styles/createTransitions';

axios.defaults.withCredentials = true;

const conten = document.getElementById('root')
const root = createRoot(conten) 

root.render(
  <React.StrictMode>
    <Provider store={store}>
       <App />
    </Provider>
  </React.StrictMode>
);

