import * as React from 'react';
import {
  Redirect
} from 'react-router-dom';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import 'moment/locale/he';
import axios from 'axios';
import Sidebar from './global/Sidebar';
import Header from './global/Header';

interface StateTypes {
  cats: any
}

class Categories extends React.Component<StateTypes> {

  state = {
    isLoggedIn: false,
    cats: []
  };

  componentWillMount() {
    this.fetchCategories();
  }

  fetchCategories: any = (): void => {
    axios.get('https://shlomix-server.herokuapp.com/categories').then((cats) => {
      this.setState({
        cats: cats.data
      });
    }).catch(err => console.log(err));
  }

  openAddCategory: any = (): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "שם הקטגוריה",
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('https://shlomix-server.herokuapp.com/categories/addCategory', {
          name: e
        })
        .then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchCategories();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangeIcon: any = (cat: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "כתובת לאייקון",
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('https://shlomix-server.herokuapp.com/categories/updateCategory', {
          id: cat._id,
          iconURL: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchCategories();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangeName: any = (cat: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: cat.name,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('https://shlomix-server.herokuapp.com/categories/updateCategory', {
          id: cat._id,
          name: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchCategories();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  _delCategory = (cat: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת קטגוריה לא ניתנת לשחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('https://shlomix-server.herokuapp.com/categories/deleteCategory', {
          id: cat._id
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchCategories();
        }).catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));

  }

  render() {

    if (localStorage.getItem('isLoggedIn') !== 'true' ||
        !localStorage.getItem('isLoggedIn_userId') ||
        !localStorage.getItem('isLoggedIn_userFirst') ||
        !localStorage.getItem('isLoggedIn_userLast')) {
      return <Redirect to="/" />;
    }

    let listCategories = this.state.cats.map((cat: any, i: number) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td>
            <img
              src={
                cat.iconURL ? cat.iconURL
                : "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
              }
              width="32"
              height="32"
              style={{ cursor: 'pointer' }}
              onClick={() => this.openChangeIcon(cat)}
            />
          </td>
          <td onClick={() => this.openChangeName(cat)} style={{ cursor: 'pointer' }}>
            {cat.name}
          </td>
          <td>{moment(cat.created).format("DD/MM/YY")}</td>
          <td>
            <button className="btn btn-danger" onClick={() => this._delCategory(cat)}>
              <i className="fa fa-times-circle-o" />
            </button>
          </td>
        </tr>
      );
    });

    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="page-content">
          <div className="categories">
            <button className="btn btn-success pull-left" style={{ marginBottom: 20 }} onClick={this.openAddCategory}>
              <i className="fa fa-plus" style={{ marginLeft: 10 }} />
              קטגוריה חדשה
            </button>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>אייקון</th>
                  <th>שם הקטגוריה</th>
                  <th>נוצרה בתאריך</th>
                  <th>מחק</th>
                </tr>
              </thead>
              <tbody>
                {listCategories}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
