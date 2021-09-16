import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import Profile from "./screens/Profile";
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
       <div className="container">
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/signup' component={SignUpScreen}/>
          <Route path='/profile' component={Profile}/>
       </div> 
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
