import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
import './index.css';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state={
            nome: localStorage.nome,
            email: localStorage.email,
            posts: []
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

        firebase.app.ref('posts').on('value', (snapshot) => {
            let state = this.state;
            state.posts = [];
            snapshot.forEach((childItem) => {
                state.posts.push({
                    key: childItem.key,
                    titulo: childItem.val().titulo,
                    image: childItem.val().image,
                    descricao: childItem.val().descricao,
                    autor: childItem.val().autor,
                })
            });
            this.setState(state);
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
                <div className="topo">
                    <div className="userinfo">
                        <h3>Olá {this.state.nome}!</h3>
                        <p>Logado com: {firebase.getCurrent()} </p>
                        <button onClick={(e) => this.logout()}>Sair</button>
                    </div>
                </div>
                <div className="newpost">
                    <Link id="newpostlink" to="/dashboard/new">Novo Post</Link>
                    <div className="posts">
                        <h2>Posts</h2><br/>
                    {this.state.posts.map((post) => {
                    return(
                        <article key={post.key}>
                                <div className="title">
                                    <strong>
                                        <Link id="tituloPosts" to={{
                                        pathname: '/dashboard/edit',
                                        state: {
                                            post:post
                                        }}}>
                                        {post.titulo}</Link>
                                    </strong>
                                </div>
                                <p>{post.descricao.substr(0,50)}</p>
                                <hr/>
                        </article>
                    )
                })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;