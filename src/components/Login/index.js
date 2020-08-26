import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './index.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state ={
            email: '',
            password: '',
        }

        this.entrar = this.entrar.bind(this);
        this.login = this.login.bind(this);
    }

    entrar(e){
        this.login();
        e.preventDefault();
    }
    login = async () => {
        const { email,password } = this.state;

        try{
            await firebase.login(email,password)
        .catch((error) =>{
            if(error.code === 'auth/user-not-found'){
                alert('Usuário inexistente!');
            }
            else{
                alert('Codigo de erro: ' + error.code);
                return null;
            }
        });
        this.props.history.replace('/dashboard');

        }catch(error){
            alert(error.message);
        }
        
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.entrar} id="Login">
                    <label>Email:</label><br/>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                    onChange={(e) => this.setState({email: e.target.value})} placeholder="digite seu e-mail..."/>
                    <label>Senha:</label><br/>
                    <input type="password" autoComplete="off" value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})} placeholder="digite sua senha..."/>

                    <button type="submit">Entrar</button>
                    <Link to="/register">Ainda não possui uma conta?</Link>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);