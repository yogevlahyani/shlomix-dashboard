import * as React from 'react';
import {
  Redirect
} from 'react-router-dom';
// import * as swal from 'sweetalert';
import * as Modal from 'react-modal';
//import * as moment from 'moment';
import 'moment/locale/he';
import axios from 'axios';
import Sidebar from './global/Sidebar';
import Header from './global/Header';
import AddItem from './AddItem';

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
    sales: [],
    currentModalItem: {
      name: '',
      iconURL: '',
      _id: ''
    },
    showAddSaleModal: false
  };

  componentWillMount() {
    this.fetchSales();
  }

  fetchSales: any = (): void => {
    axios.get('http://104.236.92.123:8080/sales').then((sales) => {
      this.setState({
        sales: sales.data
      });
    }).catch(err => console.log(err));
  }

  openModal: any = (cat: any) => {
    this.setState({
      showAddSaleModal: true,
      currentModalItem: cat
    });
  }

  doneAddItem: any = (): void => {
    this.setState({
      showAddSaleModal: false
    });
    this.fetchSales();
  }

  _delItem = (sale: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת המבצע תגרום למחיקה לצמיתות ללא אפשרות שחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://104.236.92.123:8080/sales/killItem', {
          saleID: sale._id
        })
        .then((res: any): void => {
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchSales();
        });
      }
    })
    .catch(err => console.log(err));
  }

  // updateItemName: any = (item: any): void => {
  //   swal({
  //     content: {
  //       element: "input",
  //       attributes: {
  //         value: item.name,
  //         type: "text",
  //       }
  //     }
  //   }).then((e) => {
  //     if(e != null && e != '') {
  //       axios.post('http://104.236.92.123:8080/items/updateItem', {
  //         id: item._id,
  //         name: e
  //       }).then((res: any): void => {
  //         console.log(res);
  //         swal(res.data.feedback, {
  //           icon: res.data.type,
  //         });
  //         this.fetchItems();
  //       }).catch(err => console.log(err));
  //     }
  //   }).catch(err => console.log('err: ' + err));
  // }

  // updateItemDesc: any = (item: any): void => {
  //   swal({
  //     content: {
  //       element: "input",
  //       attributes: {
  //         value: item.description,
  //         type: "text",
  //       }
  //     }
  //   }).then((e) => {
  //     if(e != null && e != '') {
  //       axios.post('http://104.236.92.123:8080/items/updateItem', {
  //         id: item._id,
  //         description: e
  //       }).then((res: any): void => {
  //         console.log(res);
  //         swal(res.data.feedback, {
  //           icon: res.data.type,
  //         });
  //         this.fetchItems();
  //       }).catch(err => console.log(err));
  //     }
  //   }).catch(err => console.log('err: ' + err));
  // }

  // updateItemKosher: any = (item: any): void => {
  //   axios.post('http://104.236.92.123:8080/items/updateItem', {
  //     id: item._id,
  //     kosher: !item.kosher,
  //     isVIP: item.isVIP
  //   }).then((res: any): void => {
  //     swal(res.data.feedback, {
  //       icon: res.data.type,
  //     });
  //     this.fetchItems();
  //   }).catch(err => console.log(err));
  // }

  render() {

    if (localStorage.getItem('isLoggedIn') !== 'true' ||
        !localStorage.getItem('isLoggedIn_userId') ||
        !localStorage.getItem('isLoggedIn_userFirst') ||
        !localStorage.getItem('isLoggedIn_userLast')) {
      return <Redirect to="/" />;
    }

    const { currentModalItem } = this.state;

    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="page-content">
          <div className="rests">
            <Modal
              isOpen={this.state.showAddSaleModal}
              onRequestClose={() => this.setState({ showAddSaleModal: false })}
              contentLabel="Modal"
            >
              <AddItem currentModalItem={currentModalItem} doneAddItem={this.doneAddItem} />
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Rests;
