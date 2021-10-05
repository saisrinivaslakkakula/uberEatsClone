import Header from "./components/Header";
import Footer from "./components/Footer";
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom'
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import AdminHome from "./screens/adminHome";
import Profile from "./screens/Profile";
import BusinessSignUp from "./screens/BusinessSignUp";
import ManageRestaurant from "./screens/manageRestaurant";
import AdminLogin from "./screens/adminLogin";
import AddBusiness from "./screens/AddBusiness";
import ManageMenu from "./screens/ManageMenu";
import AddMenuItem from "./screens/AddMenuItem";
import EditMenuItem from "./screens/EditMenuItem";
function App() {
  return (
    <div className="App">
      <Router>
      <Header/>
       <div className="container-fluid">
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/business-signup' component={BusinessSignUp}/>
          <Route path='/business-login' component={AdminLogin}/>
          <Route path='/addBusiness' component={AddBusiness}/>
          <Route path='/adminHome' component={AdminHome}/>
          <Route path='/manageRestaurant' component={ManageRestaurant}/>
          <Route path='/signup' component={SignUpScreen}/>
          <Route path='/profile' component={Profile}/>
          <Route path='/manageMenu' component={ManageMenu}/>
          <Route path='/addMenuItem' component={AddMenuItem}/>
          <Route path='/editMenuItem/:id' component={EditMenuItem}/>
          
       </div> 
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
