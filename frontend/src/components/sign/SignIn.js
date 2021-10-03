import React from 'react';
import ReactDOM from 'react-dom';
import './Sign.css';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const SignIn = (props) => {
    const setAuthState = props.setAuthState;
    let authState = props.authState;

    let display = '';
    if(authState)
        display = 'none'
    else
        display = 'block'

    let msgA = 'Please enter all fields';
    let msgB = 'User does not exist';
    let msgC = 'Invalid credentials';
    let errMsg = null;
    let email = '';
    let password = '';

    const handleChange = (e) => {
        switch(e.target.id) {
            case 'siEmail':
                email = e.target.value;
                break;
            case 'siPassword':
                password = e.target.value;
                break;
            default: 
            break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/auth', {email,password})
        .then(res => {
            // set user in the state
            setAuthState(res.data.token);
        })
        .catch(err => {
            let type = err.response.data.msg;
            console.log(type)
                switch(type) {
                    case msgA:
                        errMsg = React.createElement('small', {className: "warning"}, msgA);
                        break;
                    case msgB:
                        errMsg = React.createElement('small', {className: "warning"}, msgB);
                        break;
                    case msgC:
                        errMsg = React.createElement('small', {className: "warning"}, msgC);
                        break;
                    default:
                        console.log(type);
                        break;
                }
            ReactDOM.render(
                errMsg,
                document.querySelector('#sIwarning')
            );
        })
    }

    return (
        <div id="signIn" style={{display: display}}>
            <form className="signIn" onSubmit={handleSubmit}>
                <h3 className="pt-2 title fs">{'SignIn' || <Skeleton amount={10} />}</h3>
                <div className="pt-2 body fs">
                    <div className="siEmail">
                        <label htmlFor="siEmail">email</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="email" placeholder="enter email..." id="siEmail" 
                        required />
                    </div>
                    <div className="siPassword">
                        <label htmlFor="siPassword">password</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="password" placeholder="enter password..." 
                        id="siPassword" required />
                    </div>
                    <div className="info myRow">
                        <span>Not a Gamer ? </span>
                        <a href="#signUp">Join now</a>
                    </div>
                    <div className="siSubmit pt-1">
                        <input className="u-full-width" type="submit" id="siSubmit" />
                    </div>
                    <div className="warnings myRow title" id="sIwarning">
                        {/* <p></p> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignIn;