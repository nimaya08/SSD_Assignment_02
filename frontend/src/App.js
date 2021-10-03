import "dotenv-defaults/config";
import React from 'react';
import './App.css';
import axios from 'axios';
import GoogleLogin from 'react-google-login'

// components import
import Navigation from './components/navigation/Navigation';
import NewsList from './components/newslist/NewsList';
import Article from './components/article/Article';
import Editor from './components/editor/Editor';
import Search from './components/search/Search';

import { CLIENT_ID } from "./components/configs/keys";

class App extends React.Component {
  state = {
    title: 'GameNEWS',
    newslist: [],
    loadNews: false,
    loadEditor: false,
    currentNews: '',
    authState: '',
    imgs: [],
    paras: [],
    cats: [],
    plats: []
  }

  componentDidMount = () => {
    // load some
    axios.get('/api/news/10')
      .then(res => {
        this.setState({
          newslist: res.data
        })
      })

    // load authState
    this.checkAuthState()
  }

  getNews = async (id) => {
    await axios.get('/api/news/getNews/' + id)
      .then(res => {
        this.setState({
          currentNews: res.data
        })
      })
  }

  newsLoad = async (ofState, id) => {
    await this.getNews(id)
    this.setState({
      loadNews: ofState
    })
  }

  editorLoad = async (ofState, id) => {
    this.setState({
      loadNews: ofState,
      loadEditor: !ofState
    })
    await this.getNews(id)
  }

  addArrays = (context, content) => {
    switch (context) {
      case 'paras':
        this.setState({
          paras: [...this.state.paras, content]
        })
        break;
      case 'imgs':
        this.setState({
          imgs: [...this.state.imgs, content]
        })
        break;
      case 'cats':
        this.setState({
          cats: [...this.state.cats, content]
        })
        break;
      case 'plats':
        this.setState({
          plats: [...this.state.plats, content]
        })
        break;
      default:
        break;
    }
  }

  setAuthState = (gnu) => {
    localStorage.setItem('GameNEWS_user', JSON.stringify(gnu));
    this.checkAuthState();
  }

  checkAuthState = async () => {
    const user = localStorage.getItem('GameNEWS_user');
    if (user) {
      try {
        this.setState({
          authState: JSON.parse(user)
        })
      } catch (error) {
        console.log(error);
      }
      console.log(this.state.authState);
    }
  }

  clearAuthState = () => {
    localStorage.removeItem('GameNEWS_user');
    this.setState({
      newslist: [],
      loadNews: false,
      loadEditor: false,
      currentNews: '',
      authState: '',
      imgs: [],
      paras: [],
      cats: [],
      plats: []
    })
  }

  refreshNewsList = async () => {
    await axios.get('/api/news/get')
      .then(res => {
        this.setState({
          newslist: res.data
        })
      })
  }

  removeNews = async (id) => {
    await axios.delete('/api/news/' + id)
      .then(res => {
        if (res.data.success)
          this.refreshNewsList();
      })
  }

  searchNews = async (keyword) => {
    await axios.post('/api/news/search', { keyword })
      .then(news => {
        this.setState({
          newslist: news.data
        })
      })
  }

  handleSignInSuccess = (response) => {
    console.log(response);
    axios.post("/api/googlesignin", { tokenId: response.tokenId })
      .then(response => {
        const { name, picture, email, accessToken } = response.data;
        this.setState({
          authState: { name, picture, email, _id: email, at: accessToken }
        })
        this.setAuthState({ name, picture, email, _id: email, at: accessToken })
      })
  }

  handleSignInError = (response) => {
    console.log(response);
  }

  render() {
    return (
      <div className="container">
        <Navigation
          title={this.state.title}
          authState={this.state.authState}
          clearAuthState={this.clearAuthState} />
        <NewsList
          newslist={this.state.newslist}
          loadNews={!this.state.loadNews}
          newsLoad={this.newsLoad}
          loadEditor={this.state.loadEditor} />
        <Article loadNews={this.state.loadNews}
          currentNews={this.state.currentNews}
          newsLoad={this.newsLoad}
          editorLoad={this.editorLoad}
          authState={this.state.authState}
          removeNews={this.removeNews} />
        <Editor
          loadEditor={this.state.loadEditor}
          addArrays={this.addArrays}
          paras={this.state.paras}
          imgs={this.state.imgs}
          cats={this.state.cats}
          plats={this.state.plats}
          authState={this.state.authState}
          refreshNewsList={this.refreshNewsList} />
        <Search searchNews={this.searchNews} />
        <div className="signedInUser">
          <img className="imgHead mr-2" src={(this.state.authState && this.state.authState !== '')
            ? `${this.state.authState.picture}` : "./images/gn_1.jpg"} alt="dp" />
          <div className="myCol_">
            <h3>{(this.state.authState && this.state.authState !== '')
              ? `${this.state.authState.name}` : "Ellie"}</h3>
            <h5>{(this.state.authState && this.state.authState !== '')
              ? `${this.state.authState.email}` : "Last of Us"}</h5>
          </div>
        </div>
        <div id="signUp">
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={this.handleSignInSuccess}
            onFailure={this.handleSignInError}
            cookiePolicy={'single_host_origin'} />
        </div>
      </div>
    );
  }
}

export default App;
