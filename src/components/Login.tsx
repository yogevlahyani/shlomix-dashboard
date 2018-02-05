import * as React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import * as swal from 'sweetalert';

import '../assets/css/login.css';

class Login extends React.Component {
  state = {
    isLoggedIn: false,
    usernameInput: '',
    passwordInput: ''
  };

  componentDidMount(): void {
    if (localStorage.getItem('isLoggedIn') === 'true' &&
        localStorage.getItem('isLoggedIn_userId') &&
        localStorage.getItem('isLoggedIn_userFirst') &&
        localStorage.getItem('isLoggedIn_userLast')) {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  _handleKeyPress = (e: any): void => {
    if (e.key === 'Enter') {
      this.login();
    }
  }

  login = () => {
    const { usernameInput, passwordInput } = this.state;
    let that = this;
    axios.post('http://104.236.92.123:8080/admins/login', {
      username: usernameInput,
      password: passwordInput
    })
    .then((res: any): void => {
      if (res.data.login) {
        swal(res.data.user.name.first + ' ' + res.data.user.name.last, 'התחברת בהצלחה!', 'success');
        setTimeout(
          () =>  {
            this.setState({
              usernameInput: '',
              passwordInput: '',
              isLoggedIn: true
            });
          }, 1000);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isLoggedIn_userId', res.data.user.id);
        localStorage.setItem('isLoggedIn_userFirst', res.data.user.name.first);
        localStorage.setItem('isLoggedIn_userLast', res.data.user.name.last);
      } else {
        swal('שגיאה!', 'פרטי התחברות לא נכונים', 'error').then(() => {
          that.setState({
            usernameInput: '',
            passwordInput: ''
          });
        });
      }
    })
    .catch((err: any): void => {
      swal('שגיאה', err, 'error').then(() => {
        that.setState({
          usernameInput: '',
          passwordInput: ''
        });
      });
    });
  }

  render() {
    const { isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <Redirect to="/dash"/>
      );
    }

    return (
      <div className="container login">
        <div className="card card-container">
            <img id="profile-img" className="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <div className="form-signin">
                <input
                  type="text"
                  id="inputUser"
                  className="form-control"
                  placeholder="שם משתמש"
                  onChange={(e) => {
                    this.setState({
                      usernameInput: e.target.value
                    });
                  }}
                  onKeyPress={this._handleKeyPress}
                  required={true}
                />
                <input
                  type="password"
                  id="inputPassword"
                  className="form-control"
                  placeholder="סיסמא"
                  onChange={(e) => {
                    this.setState({
                      passwordInput: e.target.value
                    });
                  }}
                  onKeyPress={this._handleKeyPress}
                  required={true}
                />
                <button
                  className="btn btn-lg btn-primary btn-block btn-signin"
                  onClick={this.login}
                >
                  התחבר
                </button>
            </div>
        </div>
    </div>
    );
  }
}

export default Login;
