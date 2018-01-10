import * as React from 'react';
import {
  Redirect
} from 'react-router-dom';
// import * as swal from 'sweetalert';
import * as Modal from 'react-modal';
import * as moment from 'moment';
import 'moment/locale/he';
import axios from 'axios';
import Sidebar from './global/Sidebar';
import Header from './global/Header';
import AddItem from './AddItem';
import WorkingHours from './WorkingHours';
import Menu from './Menu';

interface StateTypes {
  isLoggedIn: boolean,
  cats: any,
  items: any,
  currentModalItem: any,
  showAddItemModal: boolean,
  showWHModal: boolean,
  workingHours: any
}

class Rests extends React.Component<StateTypes> {

  state = {
    isLoggedIn: false,
    cats: [],
    items: [],
    currentModalItem: {
      name: '',
      iconURL: '',
      _id: ''
    },
    showAddItemModal: false,
    showWHModal: false,
    showMenuModal: false
  };

  componentWillMount() {
    this.fetchCategories();
    this.fetchItems();
  }

  fetchCategories: any = (): void => {
    axios.get('https://shlomix-server.herokuapp.com/categories').then((cats) => {
      this.setState({
        cats: cats.data
      });
    }).catch(err => console.log(err));
  }

  fetchItems: any = (): void => {
    axios.get('https://shlomix-server.herokuapp.com/items').then((items) => {
      this.setState({
        items: items.data
      });
    }).catch(err => console.log(err));
  }

  openModal: any = (cat: any) => {
    this.setState({
      showAddItemModal: true,
      currentModalItem: cat
    });
  }

  openModalWH: any = (item: any) => {
    this.setState({
      showWHModal: true,
      currentModalItem: item
    });
  }

  openModalMenu: any = (item: any) => {
    this.setState({
      showMenuModal: true,
      currentModalItem: item
    });
  }

  doneAddItem: any = (): void => {
    this.setState({
      showAddItemModal: false,
      showWHModal: false
    });
    this.fetchCategories();
    this.fetchItems();
  }

  _delItem = (item: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת המסעדה תגרום למחיקה לצמיתות ללא אפשרות שחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('https://shlomix-server.herokuapp.com/items/killItem', {
          itemID: item._id
        })
        .then((res: any): void => {
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        });
      }
    })
    .catch(err => console.log(err));
  }

  updateIconURL: any = (item: any): void => {
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
        axios.post('https://shlomix-server.herokuapp.com/items/updateItem', {
          id: item._id,
          iconURL: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateItemName: any = (item: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: item.name,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('https://shlomix-server.herokuapp.com/items/updateItem', {
          id: item._id,
          name: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateItemDesc: any = (item: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: item.description,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('https://shlomix-server.herokuapp.com/items/updateItem', {
          id: item._id,
          description: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateItemVIP: any = (item: any): void => {
    axios.post('https://shlomix-server.herokuapp.com/items/updateItem', {
      id: item._id,
      isVIP: !item.isVIP,
      kosher: item.kosher
    }).then((res: any): void => {
      swal(res.data.feedback, {
        icon: res.data.type,
      });
      this.fetchItems();
    }).catch(err => console.log(err));
  }

  updateItemKosher: any = (item: any): void => {
    axios.post('https://shlomix-server.herokuapp.com/items/updateItem', {
      id: item._id,
      kosher: !item.kosher,
      isVIP: item.isVIP
    }).then((res: any): void => {
      swal(res.data.feedback, {
        icon: res.data.type,
      });
      this.fetchItems();
    }).catch(err => console.log(err));
  }

  render() {

    if (localStorage.getItem('isLoggedIn') !== 'true' ||
        !localStorage.getItem('isLoggedIn_userId') ||
        !localStorage.getItem('isLoggedIn_userFirst') ||
        !localStorage.getItem('isLoggedIn_userLast')) {
      return <Redirect to="/" />;
    }

    const { currentModalItem } = this.state;

    let listItems = (catID: string) => this.state.items.map((item: any, i: number) => {
      if(item.category.includes(catID)) {

        return (
          <tr key={i}>
            <td>
              <img
                src={
                  item.iconURL ? item.iconURL
                  : "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
                }
                width="32" height="32"
                style={{ cursor: 'pointer' }}
                onClick={() => this.updateIconURL(item)}
              />
            </td>
            <td onClick={() => this.updateItemName(item)}>
              {item.name}
            </td>
            <td onClick={() => this.updateItemDesc(item)}>
              {item.description}
            </td>
            <td style={{ cursor: 'pointer' }} onClick={() => this.openModalMenu(item)}>הצג תפריט</td>
            <td style={{ cursor: 'pointer' }} onClick={() => this.openModalWH(item)}>שעות פתיחה</td>
            <td style={{ cursor: 'pointer' }} onClick={() => this.updateItemVIP(item)}>
              {
                item.isVIP ?
                  <i className="fa fa-check text-success" />
                :
                  <i className="fa fa-times text-danger" />
              }
            </td>
            <td style={{ cursor: 'pointer' }} onClick={() => this.updateItemKosher(item)}>
              {
                item.kosher ?
                  <i className="fa fa-check text-success" />
                :
                  <i className="fa fa-times text-danger" />
              }
            </td>
            <td>
              {moment(item.created).format("DD/MM/YY")}
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => this._delItem(item)}>
                <i className="fa fa-times" />
              </button>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });

    let listCategoriesItems = this.state.cats.map((cat: any, i: number) => {
      return (
        <div className="item col-md-12 col-xs-12" key={i}>
          <div className="item-inner">
            <button
              className="btn btn-success pull-left"
              style={{ marginBottom: 20 }}
              onClick={() => this.openModal(cat)}
            >
              <i className="fa fa-plus" />
            </button>
            <h3>
              <img src={
                cat.iconURL ? cat.iconURL : "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
              } width="32" height="32" />
              {cat.name}
            </h3>
            <table className="table">
              <thead>
                <tr>
                  <th>אייקון</th>
                  <th>מסעדה</th>
                  <th>תיאור</th>
                  <th>תפריט</th>
                  <th>שעות פתיחה</th>
                  <th>VIP?</th>
                  <th>כשר למהדרין</th>
                  <th>נוצר בתאריך</th>
                  <th>מחיקה</th>
                </tr>
              </thead>
              <tbody>
                {listItems(cat._id)}
              </tbody>
            </table>
          </div>
        </div>
      );
    });

    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="page-content">
          <div className="rests">
            {listCategoriesItems}
            <Modal
              isOpen={this.state.showAddItemModal}
              onRequestClose={() => this.setState({ showAddItemModal: false })}
              contentLabel="Modal"
            >
              <AddItem currentModalItem={currentModalItem} doneAddItem={this.doneAddItem} />
            </Modal>
            <Modal
              isOpen={this.state.showWHModal}
              onRequestClose={() => this.setState({ showWHModal: false })}
              contentLabel="Modal"
            >
              <WorkingHours item={currentModalItem} doneAddItem={this.doneAddItem} />
            </Modal>
            <Modal
              isOpen={this.state.showMenuModal}
              onRequestClose={() => this.setState({ showMenuModal: false })}
              contentLabel="Modal"
            >
              <Menu item={currentModalItem} />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Rests;
