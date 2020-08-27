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
                {(localStorage.nome !== '')?
                <Link to="/dashboard" >Painel</Link>:
                <Link to="/login" >Entrar</Link>}
            </div>
        </header>
    );
}

export default Header;