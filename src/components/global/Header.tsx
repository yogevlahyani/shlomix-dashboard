import * as React from 'react';
import { Redirect } from 'react-router-dom';
import * as swal from 'sweetalert';

class Header extends React.Component {

  state = {
    user: {
      id: localStorage.getItem('isLoggedIn_userId'),
      name: {
        first: localStorage.getItem('isLoggedIn_userFirst'),
        last: localStorage.getItem('isLoggedIn_userLast')
      }
    },
    isLoggedIn: localStorage.getItem('isLoggedIn') || false
  };

  logout: any = (): void => {
    swal(this.state.user.name.first + ' ' + this.state.user.name.last, 'התנתקת בהצלחה!', 'success');
    localStorage.clear();
    this.setState({
      isLoggedIn: false
    });
  }

  render() {

    if (!this.state.isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">ניהול אפליקציית שלומיקס</a>

        <div className="navbar-left">
          <ul className="navbar-nav mr-auto pull-left">
            <li className="nav-item active">
              <span>שלום, {this.state.user.name.first} {this.state.user.name.last}</span>
              <button className="btn btn-danger logoutBtn" onClick={this.logout}>התנתק</button>
            </li>
          </ul>
        </div>
        </nav>
    );
  }
}

export default Header;
