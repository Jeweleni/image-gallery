import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAM-F4pciMf_WxjxVbgJQhio_OUPJNp4E0",
    authDomain: "imagesite-91298.firebaseapp.com",
    projectId: "imagesite-91298",
    storageBucket: "imagesite-91298.appspot.com",
    messagingSenderId: "32062178803",
    appId: "1:32062178803:web:fc2d4fc32c4d76de537e86"
};

const app = initializeApp(firebaseConfig);

export default app;