import React, {Component} from 'react';
import './App.css';
import { BrowserRouter,Route, Switch } from "react-router-dom";
import SignIn from "./Components/SignIn";


class App extends Component {
  render()
  {
      return (
          <BrowserRouter>

              <Header/>

              <Switch>
                  <Route path="/" component={SignIn} exact />
                  {/* <Route path="/" component={}/>
                  <Route path="/" component={}/>
                  <Route path="//" component={}/>
                  <Route path="//" component={}/> */}
              </Switch>

          </BrowserRouter>


      );
  }
}

export default App;
