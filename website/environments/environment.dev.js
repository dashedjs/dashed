// TODO: global scope is not window, but local scope
export function bootstrapFirebase() {
  config = {
    apiKey: 'AIzaSyC2m9b2IwpNUImEn91PP13aryoGGh_SxWU',
    authDomain: 'dashedjs-a9bcf.firebaseapp.com',
    databaseURL: 'https://dashedjs-a9bcf.firebaseio.com',
    projectId: 'dashedjs-a9bcf',
    storageBucket: '',
    messagingSenderId: '876777724800'
  };
  firebase.initializeApp(config);
}
