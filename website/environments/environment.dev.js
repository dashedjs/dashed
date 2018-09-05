import { firebase } from '../node_modules/@firebase/app/dist/index.esm.js';

const config = {
  apiKey: 'AIzaSyD4x3FiKdcnxrVa79jDtuypLb1dPHjQu-Q',
  authDomain: 'dashedjs-dev.firebaseapp.com',
  databaseURL: 'https://dashedjs-dev.firebaseio.com',
  projectId: 'dashedjs-dev',
  storageBucket: 'dashedjs-dev.appspot.com',
  messagingSenderId: '79270390608'
};
firebase.initializeApp(config);
