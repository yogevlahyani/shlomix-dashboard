import * as React from 'react';
import {
  Redirect
} from 'react-router-dom';
import Sidebar from './global/Sidebar';
import Header from './global/Header';
import Orders from './Orders';

import '../assets/css/bootstrap.min.css';
import '../assets/css/bootstrap-rtl.min.css';
import '../assets/css/style.css';

class App extends React.Component {

  state = {
    isLoggedIn: false
  };

  render() {

    if (localStorage.getItem('isLoggedIn') !== 'true' ||
        !localStorage.getItem('isLoggedIn_userId') ||
        !localStorage.getItem('isLoggedIn_userFirst') ||
        !localStorage.getItem('isLoggedIn_userLast')) {
      return <Redirect to="/" />;
    }

    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="page-content">
          <Orders />
        </div>
      </div>
    );
  }
}

export default App;
