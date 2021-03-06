import * as React from 'react';
import * as swal from 'sweetalert';
import * as Modal from 'react-modal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import * as moment from 'moment';
import 'moment/locale/he';
import axios from 'axios';

interface StateTypes {
  item: any,
  name: string,
  description: string,
  price: number,
  menuItems: any,
  showModal: boolean,
  toppingsName: string,
  toppingsPrice: number,
  currentAsid: string
}

interface PropsTypes {
  item: any
}

class Menu extends React.Component<PropsTypes, StateTypes> {

  state = {
    item: this.props.item,
    name: '',
    description: '',
    price: 0,
    menuItems: [],
    showModal: false,
    toppingsName: '',
    toppingsPrice: 0,
    currentAsid: ''
  };

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems: any = (): void => {
    axios.get('http://104.236.92.123:8080/menu/byItem/' + this.state.item._id)
      .then((res: any): void => {
        this.setState({
          menuItems: res.data
        });
      }).catch(err => console.log(err));
  }

  submitItem: any = (): void => {
    const { item, name, description, price } = this.state;
    if(name !== '' && description !== '' && price > 0) {
      axios.post('http://104.236.92.123:8080/menu/addMenu', {
        itemId: item._id,
        name,
        description,
        price
      })
      .then((res: any): void => {
        swal(res.data.feedback, {
          icon: res.data.type,
        });
        this.fetchItems();
      }).catch(err => console.log(err));
    } else {
      swal("שגיאה", "חובה למלא את כל השדות", "error");
    }
  }

  _delItem = (menu: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת הפריט תגרום למחיקה לצמיתות ללא אפשרות שחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://104.236.92.123:8080/menu/killItem', {
          menuId: menu._id
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

  updateItemName: any = (menu: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: menu.name,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/menu/updateItem', {
          id: menu._id,
          name: e
        }).then((res: any): void => {
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateItemDesc: any = (menu: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: menu.description,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/menu/updateItem', {
          id: menu._id,
          description: e
        }).then((res: any): void => {
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateItemPrice: any = (menu: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: menu.price,
          type: "number",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/menu/updateItem', {
          id: menu._id,
          price: e
        }).then((res: any): void => {
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  _addToppings = (menu: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: 'לדוגמא: תוספות \ תוספות למגש פיצה חצי 1 \ תוספות למגש חצי 2',
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/menu/additional/section/add', {
          menuId: menu._id,
          name: e
        }).then((res: any): void => {
          this.fetchItems();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  addToppingsItem = async (asId: string) => {
    axios.post('http://104.236.92.123:8080/menu/additional/item/add', {
      asId,
      name: this.state.toppingsName,
      description: '',
      price: this.state.toppingsPrice
    }).then((res: any): void => {
      this.fetchItems();
    }).catch(err => console.log(err));
  }

  delToppingsSection = (sectionId: string): void => {
    axios.post('http://104.236.92.123:8080/menu/addition/section/delete', {
          id: sectionId
        }).then((res: any): void => {
          this.fetchItems();
        }).catch(err => console.log(err));
  }

  delToppingsItem = (itemId: string): void => {
    axios.post('http://104.236.92.123:8080/menu/addition/item/delete', {
          id: itemId
        }).then((res: any): void => {
          this.fetchItems();
        }).catch(err => console.log(err));
  }

  render() {

    const { item, menuItems } = this.state;

    let renderToppingsItems = (additionalItem: any) => additionalItem.map((ai: any, aiIndex: number) => {
      console.log(ai);
      return (
        <div className="row">
          <div className="col">
            {ai.name} - {ai.price}<i className="fa fa-ils" />
          </div>
          <div className="col">
            <button className="btn btn-danger" onClick={() => this.delToppingsItem(ai._id)}>X</button>
          </div>
        </div>
      );
    });

    let renderToppings = (additionSection: any) => additionSection.map((as: any, asIndex: number) => {
      return (
        <div>
          <div className="row">
            <div className="col">
              <h2>{ as.name }</h2>
            </div>
            <div className="col">
              <button className="btn btn-danger" onClick={() => this.delToppingsSection(as._id)}>X</button>
            </div>
          </div>
          { renderToppingsItems(as.additionalItem) }
          <button className="btn btn-success" onClick={() => this.setState({ showModal: true, currentAsid: as._id })}>הוסף עוד תוספות</button>
        </div>
      );
    });

    let listItems = menuItems.map((mItem: any, i: number) => {
      return (
        <tr key={i}>
          <td>{i}</td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => this.updateItemName(mItem)}
          >{mItem.name}</td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => this.updateItemDesc(mItem)}
          >{mItem.description}</td>
          <td
            style={{ cursor: 'pointer' }}
            onClick={() => this.updateItemPrice(mItem)}
          >{mItem.price} <i className="fa fa-ils" /></td>
          <td>{moment(mItem.created).format("DD/MM/YYYY")}</td>
          <td>
            <button className="btn btn-success" onClick={() => this._addToppings(mItem)}>
              <i className="fa fa-plus" />
            </button>
            { renderToppings(mItem.additionalSection) }
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => this._delItem(mItem)}>
              <i className="fa fa-times" />
            </button>
          </td>
        </tr>
      );
    });

    return (
      <MuiThemeProvider>
        <div className="Menu">
          <h1>
            תפריט מסעדת
            <img src={
                item.iconURL ?
                  item.iconURL
                :
                  "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
              }
              width="32"
              height="32"
              style={{ marginRight: 10 }}
            />
            {item.name}
          </h1>
          <div className="form-group menu-add-form">
            <TextField
              hintText="שם הפריט"
              floatingLabelText="שם"
              onChange={(e: any) => this.setState({ name: e.target.value })}
              style={{ marginLeft: 10 }}
            />
            <TextField
              hintText="תיאור הפריט"
              floatingLabelText="תיאור"
              onChange={(e: any) => this.setState({ description: e.target.value })}
              style={{ marginLeft: 10 }}
            />
            <TextField
              hintText="מחיר הפריט"
              floatingLabelText="מחיר"
              type="number"
              onChange={(e: any) => this.setState({ price: e.target.value })}
              style={{ marginLeft: 10, textAlign: 'left' }}
            />
            <i className="fa fa-ils" />
          </div>
          <button className="btn btn-primary" onClick={this.submitItem}>הוסף פריט</button>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>שם הפריט</th>
                <th>תיאור</th>
                <th>מחיר</th>
                <th>נוצר בתאריך</th>
                <th>תוספות</th>
                <th>מחיקה</th>
              </tr>
            </thead>
            <tbody>
              {listItems}
            </tbody>
          </table>

          <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            contentLabel="Modal"
            style={{ content: { width: '400px', height: '200px' } }}
          >
            <input type="text" placeholder="שם התוספת" onChange={(e) => {
                    this.setState({
                      toppingsName: e.target.value
                    });
                  }}  />
            <br />
            <input type="number" placeholder="מחיר" onChange={(e) => {
                    this.setState({
                      toppingsPrice: parseInt(e.target.value)
                    });
                  }} />
            <button className="btn btn-success" onClick={() => {
              this.addToppingsItem(this.state.currentAsid);
              this.setState({ showModal: false });
            }}>הוסף</button>
          </Modal>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Menu;
