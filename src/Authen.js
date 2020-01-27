import React, { Component } from 'react'
var firebase = require('firebase');
var firebaseConfig = {
    apiKey: "AIzaSyCJeOrYut94Jx0AZzN4CHe_Xf7Kb2QXJaU",
    authDomain: "firelogger-6c340.firebaseapp.com",
    databaseURL: "https://firelogger-6c340.firebaseio.com",
    projectId: "firelogger-6c340",
    storageBucket: "firelogger-6c340.appspot.com",
    messagingSenderId: "650524705027",
    appId: "1:650524705027:web:b9340ec5406d91ea102936",
    measurementId: "G-7PD3GQ5HK9"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export class Authen extends Component {
    constructor(props){
        super(props);
        this.state ={
            err : ''
        }
    }
    login = (e) => {
        e.preventDefault();        
        const email = this.refs.email.value;  
        const password = this.refs.password.value;  
        // console.log(email,password);
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email,password);
        promise.then(response =>{
            var user = response.user;
            var lout = document.getElementById('logout');
            lout.classList.remove('hide');
            document.getElementById('loggers').classList.add('hide');
            document.getElementById('aDl').classList.add('hide');
            var err = 'Welcome '+user.email;
            this.setState({err :err });
            
        });
        promise.catch((e) => {
            var err = e.message;
            console.log(err);
            this.setState({err : err});
        });
        
    }
    signUp = (e) =>{
        e.preventDefault();
        const email = this.refs.email.value;  
        const password = this.refs.password.value;
        console.log(email,password);
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email,password);
        promise
        .then((user)=>{
            console.log(user.user);
            var err = user.user.email+', Your Reg was succesful. Please Login';
            firebase.database().ref('/users/'+user.user.uid).set({
                email : user.user.email                   
            })
            this.setState({err:err});
        })
        .catch(e => {
            console.log(e);
            var err = e.message  ;
            this.setState({err:err});
        })       

    }
    logout = () => {
        firebase.auth().signOut();
        var lout = document.getElementById('logout');
        lout.classList.add('hide');
        document.getElementById('loggers').classList.remove('hide');
        document.getElementById('aDl').classList.remove('hide');
        var err = 'You have been logged out'  ;
        this.setState({err:err});
    }

    signInwithGoogle = () =>{
        // console.log('in goole method');
        var provider = new firebase.auth.GoogleAuthProvider();
        var promise = firebase.auth().signInWithPopup(provider);
        promise.then(result =>{
            console.log(result);            
            var user = result.user;
            document.getElementById('loggers').classList.add('hide');
            document.getElementById('aDl').classList.add('hide');
            var lout = document.getElementById('logout');
            lout.classList.remove('hide');
            firebase.database().ref('/users/'+user.uid).set({
                email : user.email,
                name : user.displayName                  
            });
            var err = 'Welcome ' +user.email;
            this.setState({err:err});
        }).catch(e => {
            var err = e.message;
            this.setState({err : err});
            this.setState({err:err});
        });              
    }
    render() { 
        return (
            <div>
                <form>
                    <p>{this.state.err}</p>
                    <div id="aDl">
                        <input id="email" required autoComplete="off" ref="email" type="email" placeholder="Enter your email"/><br/>
                        <input id="email" ref="password" type="password" placeholder="Enter your Password"/><br/>
                    </div>
                    <div id="loggers">
                        <button onClick={this.login}>Log In</button>
                        <button onClick={this.signUp}>Sign Up </button>
                    </div>
                    <button id="logout" className="hide" onClick={this.logout}>LogOut</button>
                    <button id="logout" className="google" onClick={this.signInwithGoogle}>Sign In with Google</button>

                </form>
            </div>
        )
    }
}

export default Authen
