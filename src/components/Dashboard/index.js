import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import firebase from '../../firebase';
import './index.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            nome: localStorage.nome,
            email: localStorage.email,
        };

        this.logout = this.logout.bind(this);
    }

    async componentDidMount(){

        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info)=>{
            localStorage.nome = info.val().nome;
            localStorage.email = info.val().mail;
            this.setState({nome: localStorage.nome, email: localStorage.email});
        })
    }

    logout = async () =>{
        await firebase.logout()
        .catch((error) => {
            alert(error);
        });
        localStorage.removeItem("nome");
        localStorage.removeItem("email");
        this.props.history.push('/');
    }
    
    render() {

        return (
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome}!</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                    <p>Logado com: {firebase.getCurrent()} </p>
                    <button onClick={(e) => this.logout()}>Sair</button>
            </div>
        );
    }
}

export default Dashboard;