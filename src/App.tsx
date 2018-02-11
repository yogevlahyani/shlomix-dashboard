import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import OrderDetails from './components/OrderDetails';
import Categories from './components/Categories';
import Rests from './components/Rests';
import OrdersView from './components/OrdersView';
import Sales from './components/Sales';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact={true} path="/" component={Login}/>
            <Route exact={true} path="/dash" component={Dashboard}/>
            <Route path="/dash/order/:id" component={OrderDetails}/>
            <Route exact={true} path="/dash/categories" component={Categories}/>
            <Route exact={true} path="/dash/rests" component={Rests}/>
            <Route exact={true} path="/dash/orders" component={OrdersView}/>
            <Route exact={true} path="/dash/sales" component={Sales}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
