import TodoItem from 'components/Todo/TodoItem';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBJrGkMXNIRPDTV6mwtNuFonE5N3conc58',
  authDomain: 'notes-and-todos-6756c.firebaseapp.com',
  databaseURL: 'https://notes-and-todos-6756c.firebaseio.com',
  projectId: 'notes-and-todos-6756c',
  storageBucket: 'notes-and-todos-6756c.appspot.com',
  messagingSenderId: '432462096709',
  appId: '1:432462096709:web:690e4faec4f036d458f62c',
  measurementId: 'G-LL8BYZF9S7',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const DATABASE_URL = firebaseConfig.databaseURL;