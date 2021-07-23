import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route exact path='' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
