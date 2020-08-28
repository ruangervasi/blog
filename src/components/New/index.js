import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import firebase from '../../firebase';

class New extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            imagem: null,
            url: '',
            descricao: '',
            alerta: '',
        }
        this.newPost = this.newPost.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    async componentDidMount(){
        if(!firebase.getCurrent()){
            this.props.history.replace('/login');
            return null;
        }
    }

    handleFile = async (e) =>{
        
        if(e.target.files[0]){
            const image = e.target.files[0];
            if(image.type === 'image/png' || image.type === 'image/jpeg'){
                await this.setState({imagem: image});
                this.handleUpload();
            }else{
                alert('Envie uma imagem do tipo PNG ou JPG');
                this.setState({imagem: null});
                return null;
            }
        }    
    }

    handleUpload = async () =>{
        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();

        const uploadTasks = firebase.storage.ref(`ímages/${currentUid}/${imagem.name}`)
        .put(imagem);

        await uploadTasks.on('state_changed',
        (snapshot)=>{
            console.log(snapshot);
        },
        (error)=>{
            console.log(error);
        },
        ()=>{
            firebase.storage.ref(`ímages/${currentUid}`)
            .child(imagem.name).getDownloadURL()
            .then(url => {
                this.setState({url: url});
            })
        })
    }
    

    newPost = async (e) => {
        e.preventDefault();

        if(this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !==''){
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.url,
                descricao: this.state.descricao,
                autor: localStorage.nome,
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
                <form onSubmit={this.newPost}>
                    <span>{this.state.alerta}</span>
                    <label>Titulo:</label>
                    <input type="text" placeholder="Nome do post" value={this.state.titulo} autoFocus autoComplete="off" onChange={(e) => this.setState({titulo: e.target.value})}/>
                    <label>Imagem:</label>
                    <input type="file" onChange={this.handleFile}/><br/>
                    {this.state.url !== '' ?
                    <img src={this.state.url} width="250" height="150" alt="capa do post"/>
                    :
                    <progress value={this.state.progress} max="100"/>
                    }
                    <br/>
                    <label>Texto:</label>
                    <textarea type="text" placeholder="Texto do post" value={this.state.descricao} autoComplete="off" onChange={(e) => this.setState({descricao: e.target.value})}/>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>
        );
    }
}

export default New;