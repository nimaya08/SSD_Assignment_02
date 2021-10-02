import React from 'react';
import ReactDOM from 'react-dom';
import './Sign.css';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const SignUp = (props) => {
    const setAuthState = props.setAuthState;
    let authState = props.authState;

    let display = '';
    if(authState)
        display = 'none'
    else
        display = 'block'

    let msgA = 'Please enter all fields';
    let msgB = 'User already exists';
    let msgC = 'Passwords do not match';
    let errMsg = null;
    let name = '';
    let fname = '';
    let lname = '';
    let email = '';
    let password = '';
    let repeat = '';

    const handleChange = (e) => {
        switch(e.target.id) {
            case 'suFname':
                fname = e.target.value;
                break;
            case 'suLname':
                lname = e.target.value;
                break;
            case 'suEmail':
                email = e.target.value;
                break;
            case 'suPassword':
                password = e.target.value;
                break;
            case 'suRepeat':
                repeat = e.target.value;
                break;
            default: 
            break;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        name = fname+" "+lname;
        if(password === repeat) {
            axios.post('/api/user', {name,email,password})
            .then(res => {
                // set user in the state
                setAuthState(res.data.token);
            })
            .catch(err => {
                let type = err.response.data.msg;
                switch(type) {
                    case msgA:
                    errMsg = React.createElement('small', {className: "warning"}, msgA);
                    break;
                    case msgB:
                    errMsg = React.createElement('small', {className: "warning"}, msgB);
                    break;
                    default:
                    console.log(type);
                    break;
                }
                ReactDOM.render(
                errMsg,
                document.querySelector('#sUwarning')
                );
            })
        }
        else {
            errMsg = React.createElement('small', {className: "warning"}, msgC);
            ReactDOM.render(
            errMsg, 
            document.querySelector('#sUwarning')
            );
        }
    }

    return (
        <div id="signUp" style={{display: display}}>
            <form className="signUp" onSubmit={handleSubmit}>
                <h3 className="pt-2 title fs">{'SignUp' || <Skeleton amount={10} />}</h3>
                <div className="pt-2 body fs">
                    <div className="suFname">
                        <label htmlFor="suFname">first name</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="text" placeholder="John" id="suFname" required />
                    </div>
                    <div className="suLname">
                        <label htmlFor="suLname">last name</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="text" placeholder="Doe" id="suLname" required />
                    </div>
                    <div className="suEmail">
                        <label htmlFor="suEmail">email</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="email" placeholder="enter email..." id="suEmail" 
                        required />
                    </div>
                    <div className="suPassword">
                        <label htmlFor="suPassword">enter password</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="password" placeholder="enter password..." 
                        id="suPassword" required />
                    </div>
                    <div className="suRepeat">
                        <label htmlFor="suRepeat">repeat password</label>
                        <input onChange={(e) => handleChange(e)} className="u-full-width" type="password" placeholder="repeat password..." 
                        id="suRepeat" required />
                    </div>
                    <div className="info myRow">
                        <span>Already a Gamer ? </span>
                        <a href="#signIn">SignIn</a>
                    </div>
                    <div className="suSubmit pt-1">
                        <input className="u-full-width" type="submit" id="suSubmit" />
                    </div>
                    <div className="warnings myRow title" id="sUwarning">
                        {/* <p></p> */}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SignUp;