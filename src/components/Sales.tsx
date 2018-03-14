import * as React from 'react';
// import {
//   Redirect
// } from 'react-router-dom';
// import * as swal from 'sweetalert';
import * as moment from 'moment';
import 'moment/locale/he';
import * as Modal from 'react-modal';
import axios from 'axios';
import Sidebar from './global/Sidebar';
import Header from './global/Header';

interface StateTypes {
  deals: any,
  showModal: boolean,
  items: any,
  item: string,
  active: boolean,
  logoUrl: string,
  title: string,
  content: string,
  price: number,
  discount: number
}

class Sales extends React.Component<StateTypes> {

    state = {
      deals: [],
      showModal: false,
      items: [],
      item: '',
      active: true,
      logoUrl: '',
      title: '',
      content: '',
      price: 0,
      discount: 0
    };

  componentWillMount() {
    this.fetchDeals();
    this.fetchItems();
  }

  fetchDeals: any = (): void => {
    axios.get('http://104.236.92.123:8080/deals').then((deals) => {
      console.log(deals);
      this.setState({
        deals: deals.data
      });
    }).catch(err => console.log(err));
  }

  fetchItems: any = (): void => {
    axios.get('http://104.236.92.123:8080/items').then((items) => {
      this.setState({
        items: items.data
      });
    }).catch(err => console.log(err));
  }

  openModal: any = () : void => {
    this.setState({
      showModal: true
    });
  }

  delDeal = (deal: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת מבצע לא ניתנת לשחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://104.236.92.123:8080/deals/killDeal', {
          dealId: deal._id
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    })
    .catch(err => console.log(err));
  }

  openChangeLogo: any = (deal: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          placeholder: "כתובת לתמונה",
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/deals/updateDeal', {
          id: deal._id,
          logoUrl: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangeTitle: any = (deal: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: deal.title,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/deals/updateDeal', {
          id: deal._id,
          title: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangeContent: any = (deal: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: deal.content,
          type: "text",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/deals/updateDeal', {
          id: deal._id,
          content: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangePrice: any = (deal: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: deal.price,
          type: "number",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/deals/updateDeal', {
          id: deal._id,
          price: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  openChangeDiscount: any = (deal: any): void => {
    swal({
      content: {
        element: "input",
        attributes: {
          value: deal.discount,
          type: "number",
        }
      }
    }).then((e) => {
      if(e != null && e != '') {
        axios.post('http://104.236.92.123:8080/deals/updateDeal', {
          id: deal._id,
          discount: e
        }).then((res: any): void => {
          console.log(res);
          swal(res.data.feedback, {
            icon: res.data.type,
          });
          this.fetchDeals();
        }).catch(err => console.log(err));
      }
    }).catch(err => console.log('err: ' + err));
  }

  updateDealActive: any = (deal: any): void => {
    axios.post('http://104.236.92.123:8080/deals/updateDeal', {
      id: deal._id,
      active: !deal.active
    }).then((res: any): void => {
      swal(res.data.feedback, {
        icon: res.data.type,
      });
      this.fetchItems();
    }).catch(err => console.log(err));
  }

  renderList: any = () => {
    return this.state.deals.map((deal: any, i: number) => (
          <tr key={i}>
            <td>{i}</td>
            <td onClick={() => this.openChangeLogo(deal)}>
              <img src={
                  deal.logoUrl ?
                    deal.logoUrl
                  :
                    "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
                }
                width="32"
                height="32"
                style={{ marginRight: 10 }}
              />
            </td>
            <td onClick={() => this.openChangeTitle(deal)}>
              { deal.title }
            </td>
            <td onClick={() => this.openChangeContent(deal)}>
              { deal.content }
            </td>
            <td onClick={() => this.openChangePrice(deal)}>
              { deal.price }
            </td>
            <td onClick={() => this.openChangeDiscount(deal)}>
              { deal.discount }%
            </td>
            <td>
              { moment(deal.created).format("DD/MM/YY") }
            </td>
            <td onClick={() => this.updateDealActive(deal)}>
              {
                deal.active ?
                <i className="fa fa-check text-success" />
              :
                <i className="fa fa-times text-danger" />
              }
            </td>
            <td>
              { deal.item.name }
            </td>
            <td>
            <button className="btn btn-danger" onClick={() => this.delDeal(deal)}>
              <i className="fa fa-times-circle-o" />
            </button>
            </td>
          </tr>
        ));
  }

  renderItemsSelection: any = (items: any) => {
    return items.map((item: any) => (
      <option key={item._id} value={item._id}>{item.name}</option>
    ));
  }

  addDeal: any = (): void => {
    const { logoUrl, title, content, price, discount, item, active } = this.state;
    if(title !== '' && content !== '' && item !== '') {
      axios.post('http://104.236.92.123:8080/deals/addDeal', {
        item,
        logoUrl,
        title,
        content,
        price,
        discount,
        active
      })
      .then((res: any): void => {
        console.log(res);
        swal(res.data.feedback, {
          icon: res.data.type,
        });
        this.fetchDeals();
      }).catch(err => console.log(err));
    } else {
      swal("שגיאה", "אנא מלא את הפרטים הנחוצים (כותרת, תוכן, מחיר ומסעדה)", "error");
    }
  }

  render() {

    return (
      <div className="App">
        <Header />
        <Sidebar />
        <div className="page-content">
          <div className="deals">
          <button
            className="btn btn-success pull-left"
            style={{ marginBottom: 20 }}
            onClick={this.openModal}>
            <i className="fa fa-plus" />
          </button>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>תמונה</th>
                <th>כותרת</th>
                <th>תוכן</th>
                <th>מחיר</th>
                <th>הנחה באחוזים</th>
                <th>נוצר בתאריך</th>
                <th>פעיל ?</th>
                <th>מסעדה</th>
                <th>מחק</th>
              </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>


          <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            contentLabel="Modal"
          >
            <h1>הוספת מבצע</h1>
            <div className="form-group">
              <label>קישור לתמונה</label>
              <input type="text" className="form-control" onChange={(e) => this.setState({ logoUrl: e.target.value })} />
            </div>
            <div className="form-group">
              <label>כותרת</label>
              <input type="text" className="form-control" onChange={(e) => this.setState({ title: e.target.value })} />
            </div>
            <div className="form-group">
              <label>תוכן</label>
              <input type="text" className="form-control" onChange={(e) => this.setState({ content: e.target.value })} />
            </div>
            <div className="form-group">
              <label>מחיר</label>
              <input type="number" className="form-control" onChange={(e) => this.setState({ price: e.target.value })} />
            </div>
            <div className="form-group">
              <label>הנחה באחוזים</label>
              <input type="number" className="form-control" onChange={(e) => this.setState({ discount: e.target.value })} />
            </div>
            <div className="form-group">
              <label>מסעדה</label>
              <select onChange={(e) => this.setState({ item: e.target.value })}>
                { this.renderItemsSelection(this.state.items) }
              </select>
            </div>
            <button
              className="btn btn-success pull-left"
              style={{ marginBottom: 20 }}
              onClick={this.addDeal}>
              <i className="fa fa-check" />
            </button>
          </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Sales;
