import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import firebase from '../../firebase';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            autor: '',
            alerta: '',
            key: '',
        }
        this.Editar = this.Editar.bind(this);
    }

    async componentDidMount(){
        let { post } = this.props.location.state;

        this.setState({
            titulo: post.titulo,
            imagem: post.image,
            descricao: post.descricao,
            autor: post.autor,
            key: post.key
        })

        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }

    Editar = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !=='' && this.state.autor !== ''){
            let posts = firebase.app.ref('posts');
            await posts.child(this.state.key).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: this.state.autor,
            })

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
                <form onSubmit={this.Editar}>
                    <span>{this.state.alerta}</span>
                    <label>Titulo:</label>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus autoComplete="off" onChange={(e) => this.setState({titulo: e.target.value})}/>
                    <label>Imagem:</label>
                    <input type="text" placeholder="Imagem do post" value={this.state.imagem} autoComplete="off" onChange={(e) => this.setState({imagem: e.target.value})}/>
                    <label>Texto:</label>
                    <textarea type="text" placeholder="Texto do post" value={this.state.descricao} autoComplete="off" onChange={(e) => this.setState({descricao: e.target.value})}/>
                    <button type="submit">Salvar</button>
                </form>
            </div>
        );
    }
}

export default Edit;