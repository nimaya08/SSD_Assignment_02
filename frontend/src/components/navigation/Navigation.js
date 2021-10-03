import React from 'react';
import './Navigation.css';

const Navigation = (props) => {
    const authState = props.authState;
    const clearAuthState = props.clearAuthState;

    let name = '';
    if (authState)
        name = authState.name;

    const handleClick = (e) => {
        if (e.target.id === 'signoutlink')
            clearAuthState();
    }

    return (
        <div className="row navigation">
            <div className="four columns navigationL">
                <h4 className="fs">{props.title}</h4>
            </div>
            <div className="eight columns navigationR">
                <a href="/" className="link"><h5 className="fp navItem">NEWS</h5></a>
                <a href="#search" className="link"><h5 className="fp navItem">SEARCH</h5></a>
                <h5 className="fp navItem">|</h5>
                {(!authState) ?
                    <a href="#signUp" className="link">
                        <h5 onClick={(e) => handleClick(e)} id="signuplink" className="fp navItem">SIGN IN</h5>
                    </a>
                    :
                    <a href="#signIn" className="link">
                        <h5 onClick={(e) => handleClick(e)} id="signoutlink" className="fp navItem">
                            SIGN OUT <small className="fp">{name}</small>
                        </h5>
                    </a>
                }
            </div>
        </div>
    )
}

export default Navigation;