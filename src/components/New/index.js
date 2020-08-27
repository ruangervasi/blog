import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import firebase from '../../firebase';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alerta: '',
        }
        this.newPost = this.newPost.bind(this);
    }

    async componentDidMount(){

        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }

    newPost = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !==''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome,
            });

            this.props.history.push('/dashboard');
        }else{
            this.setState({alerta: "Preencha todos os campos!!!"})
        }

    }
    
    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.newPost}>
                    <span>{this.state.alerta}</span>
                    <label>Titulo:</label>
                    <input type="text" placeholder="Nome do post" value={this.setState.titulo} autoFocus autoComplete="off" onChange={(e) => this.setState({titulo: e.target.value})}/>
                    <label>Imagem:</label>
                    <input type="text" placeholder="Imagem do post" value={this.setState.imagem} autoComplete="off" onChange={(e) => this.setState({imagem: e.target.value})}/>
                    <label>Texto:</label>
                    <textarea type="text" placeholder="Texto do post" value={this.setState.texto} autoComplete="off" onChange={(e) => this.setState({titulo: e.target.texto})}/>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default New;