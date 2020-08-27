import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyDbn75W_mNmjAXYWuMvQR3903tmJQ9JFLI",
    authDomain: "blog-7deb6.firebaseapp.com",
    databaseURL: "https://blog-7deb6.firebaseio.com",
    projectId: "blog-7deb6",
    storageBucket: "blog-7deb6.appspot.com",
    messagingSenderId: "1031964490496",
    appId: "1:1031964490496:web:e6358bb4e0963b760d51e5",
    measurementId: "G-VF7F6EQC9S"};

class Firebase{
    constructor() {
        app.initializeApp(firebaseConfig);

        this.app = app.database();   
    }

    login(email,password){
        return app.auth().signInWithEmailAndPassword(email,password)
    }

    logout(){
        return app.auth().signOut();
    }
    
    async register(email,password, nome){
        await app.auth().createUserWithEmailAndPassword(email,password);

        const uid = app.auth().currentUser.uid;

        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    isInitialized(){
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve);
        })
    }

    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email;
    }

    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback);
    }
}

export default new Firebase();