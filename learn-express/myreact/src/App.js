//import Rect from 'react';
import './App.css';
import Nav from './components/Nav';
import HomePage from './components/HomePage';
import MessagesPage from './components/MessagesPage';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';

function App() {
 

  return (
   
    

    <Router>
    <div className="App">
      <Nav />
      <Switch>
      <Route path="/home" component={HomePage} />
      <Route path="/messages" component={MessagesPage} />
      </Switch>
    </div>
    </Router>

    
  );
}

export default App;
