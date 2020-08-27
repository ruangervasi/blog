import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase';
import './index.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            nome: ''
        }
        this.register = this.register.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    register(e){
        this.onRegister();
        e.preventDefault();
    }

    onRegister = async () => {
        const { email,password,nome } = this.state;

        try{
            await firebase.register(email,password,nome)
        .catch((error) =>{
                alert('Codigo de erro: ' + error.code);
                return null;
            }
        );
        this.props.history.replace('/dashboard');

        }catch(error){
            alert(error.message);
        }
    }
    
    render() {
        return (
            <div>

                <form onSubmit={this.register} id="Register">
                <h1>Novo Usuário</h1>
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} autoFocus autoComplete="off" onChange={(e)=> this.setState({nome: e.target.value})} placeholder="Digite seu nome..."/>
                    <label>Email: </label>
                    <input type="email" value={this.state.email} autoComplete="off" onChange={(e)=> this.setState({email: e.target.value})} placeholder="Digite seu e-mail..."/>
                    <label>Senha: </label>
                    <input type="password" value={this.state.password} autoComplete="off" onChange={(e)=> this.setState({password: e.target.value})} placeholder="Digite sua senha..."/>
                    <button type="submit">
                        Cadastrar
                    </button>
                    <Link to="/login">Já possui conta? Faça o Login</Link>
                </form>
            </div>
        );
    }
}

export default Register;