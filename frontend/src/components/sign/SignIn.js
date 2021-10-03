import React from 'react';
import ReactDOM from 'react-dom';
import './Sign.css';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

import GoogleLogin from 'react-google-login'

const SignIn = (props) => {

    const setAuthState = props.setAuthState;
    let authState = props.authState;
   
    let display = '';
    if(authState)
        display = 'none'
    else
        display = 'block'
    
    const handleSignInSuccess = (response) => {
        console.log(response);
        axios.post("/api/googlesignin", {tokenId: response.tokenId})
        // axios({
        //     method: "POST",
        //     url: "/api/googlesignin",
        //     data: {tokenId: response.tokenId}
        // }).then(response => {
        .then(response => {
            console.log(response);
        })
    }
    
    const handleSignInError = (response) => {
        
    }

    // let msgA = 'Please enter all fields';
    // let msgB = 'User does not exist';
    // let msgC = 'Invalid credentials';
    // let errMsg = null;
    // let email = '';
    // let password = '';

    // const handleChange = (e) => {
    //     switch(e.target.id) {
    //         case 'siEmail':
    //             email = e.target.value;
    //             break;
    //         case 'siPassword':
    //             password = e.target.value;
    //             break;
    //         default: 
    //         break;
    //     }
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     await axios.post('/api/auth', {email,password})
    //     .then(res => {
    //         // set user in the state
    //         setAuthState(res.data.token);
    //     })
    //     .catch(err => {
    //         let type = err.response.data.msg;
    //         console.log(type)
    //             switch(type) {
    //                 case msgA:
    //                     errMsg = React.createElement('small', {className: "warning"}, msgA);
    //                     break;
    //                 case msgB:
    //                     errMsg = React.createElement('small', {className: "warning"}, msgB);
    //                     break;
    //                 case msgC:
    //                     errMsg = React.createElement('small', {className: "warning"}, msgC);
    //                     break;
    //                 default:
    //                     console.log(type);
    //                     break;
    //             }
    //         ReactDOM.render(
    //             errMsg,
    //             document.querySelector('#sIwarning')
    //         );
    //     })
    // }

    return (
        <div id="signIn" style={{display: display}}>
                <h3 className="pt-2 title fs">{'SignIn' || <Skeleton amount={10} />}</h3>
                <div className="pt-2 body fs">
                
                   
                    <div className="siSubmit pt-1">
                    <GoogleLogin
    clientId="181267109282-67mtbok008de2sbpgt9dpotdjkik5usp.apps.googleusercontent.com"
    buttonText="Sign in with Google"
    onSuccess={handleSignInSuccess}
    onFailure={handleSignInError}
    cookiePolicy={'single_host_origin'}/>
                    </div>
                    {/* <div className="warnings myRow title" id="sIwarning">
                        <p></p>
                    </div> */}
                    
                </div>
        </div>
    )
}

export default SignIn;