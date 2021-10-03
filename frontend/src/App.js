import React from 'react';
import './App.css';
import axios from 'axios';

// components import
import Navigation from './components/navigation/Navigation';
import NewsList from './components/newslist/NewsList';
import Article from './components/article/Article';
import Editor from './components/editor/Editor';
import SignIn from './components/sign/SignIn';
import SignUp from './components/sign/SignUp';
import Search from './components/search/Search';

class App extends React.Component {
  state = {
    title: 'GameNEWS',
    newslist: [],
    loadNews: false,
    loadEditor: false,
    currentNews: null,
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
    // console.log(context+ " "+content)
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
    localStorage.setItem('GameNEWS_user', gnu);
    this.checkAuthState();
  }

  checkAuthState = async () => {
    const user = localStorage.getItem('GameNEWS_user');
    if (user) {
      await axios.get('/api/auth/user', { headers: { 'x-auth-token': user } })
        .then(res => {
          this.setState({
            authState: res.data
          })
        })

      // console.log(this.state.authState);
    }
  }

  clearAuthState = () => {
    localStorage.removeItem('GameNEWS_user');
    this.setState({
      authState: null
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

  render() {
    return (
      <div className="container">
        <Navigation title={this.state.title} authState={this.state.authState} clearAuthState={this.clearAuthState} />
        <NewsList newslist={this.state.newslist} loadNews={!this.state.loadNews} newsLoad={this.newsLoad} loadEditor={this.state.loadEditor} />
        {/* <Article loadNews={this.state.loadNews} currentNews={this.state.currentNews} newsLoad={this.newsLoad} editorLoad={this.editorLoad} authState={this.state.authState} removeNews={this.removeNews} /> */}
        <Editor loadEditor={this.state.loadEditor} addArrays={this.addArrays} paras={this.state.paras} imgs={this.state.imgs} cats={this.state.cats} plats={this.state.plats} authState={this.state.authState} refreshNewsList={this.refreshNewsList} />
        <SignIn setAuthState={this.setAuthState} authState={this.state.authState} />
        <SignUp setAuthState={this.setAuthState} authState={this.state.authState} />
        <Search searchNews={this.searchNews} />
      </div>
    );
  }
}

export default App;
