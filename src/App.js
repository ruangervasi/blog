import React, { Component } from 'react';
import './global.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import firebase from './firebase';

import Home from './components/Home';
import Header from './components/Header';

class App extends Component {

  state ={
    firebaseInitialized: false
  }

  componentDidMount(){
    firebase.isInitialized().then(result =>
      {
        this.setState({firebaseInitialized: result})
      });
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    ) : (
      <h1>
        Carregando...
      </h1>
    );
  }
}

export default App;