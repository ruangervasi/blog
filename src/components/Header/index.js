import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Header(){
    return(
        <header id="main-header"> 
            <div className="header-content">
                <Link to="/">
                    Blog Ruan ReactJS
                </Link>
                <Link to="/login">
                    {(localStorage.nome !== '')? "      " : "Entrar"}       
                </Link>
            </div>
        </header>
    );
}

export default Header;