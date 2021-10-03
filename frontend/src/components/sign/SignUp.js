import React from 'react';
import './Sign.css';
import axios from 'axios';

const SignUp = (props) => {
    const setAuthState = props.setAuthState;
    let authState = props.authState;

    let display = '';
    if (authState)
        display = 'none'
    else
        display = 'block'

    return (
        <>
            {/*
            <div id="signUp" style={{ display: display }}>
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
                        </div>
                    </div>
                </form>
            </div>
            */}
        </>
    )
}

export default SignUp;