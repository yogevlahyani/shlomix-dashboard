import * as React from 'react';
import axios from 'axios';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import { Redirect } from 'react-router';
import 'moment/locale/he';
import Sidebar from './global/Sidebar';
import Header from './global/Header';

interface StateType {
  redirect: boolean;
  order: any;
}

interface PropsType {
  match?: any;
}

class OrderDetails extends React.Component<PropsType, StateType>  {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      redirect: false,
      order: {
        user: { name: '', last: '', phone: '' },
        address: { street: '', apartment: null, city: '', enterance: null, floor: null },
        cart: [ { name: '', price: null } ],
        rest: ''
      }
    }
  }

  componentWillMount(): void {
    console.log(this.props);
    const { id } = this.props.match.params;
    axios.get('http://104.236.92.123:8080/orders/order/' + id).then(res => {
      console.log(res);
      this.setState({
        order: res.data[0]
      });
    }).catch(err => console.log(err));
  }

  _archiveOrder = (order: any, status: number): void => {
    if (status === 1) {
      var confirmMsg = {
        title: "האם אתה בטוח?",
        text: "סימון ההזמנה כבוצעה תעבור לארכיון",
        icon: "warning"
      };
    } else {
      var confirmMsg = {
        title: "האם אתה בטוח?",
        text: "סימון ההזמנה כבוטלה תעבור לארכיון",
        icon: "warning"
      };
    }
    swal(confirmMsg)
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://104.236.92.123:8080/orders/archiveThatOrder', {
          orderID: order._id,
          status: 1
        })
        .then((res: any): void => {
          console.log(res);
          swal("ההזמנה נכנסה לארכיון בהצלחה!", {
            icon: "success",
          });
          this.setState({
            redirect: true
          });
        });
      }
    })
    .catch(err => console.log(err));

  }

  _delOrder = (order: any): void => {
    swal({
      title: "האם אתה בטוח?",
      text: "מחיקת ההזמנה תגרום למחיקה לצמיתות ללא אפשרות שחזור",
      icon: "warning"
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.post('http://104.236.92.123:8080/orders/killOrder', {
          orderID: order._id
        })
        .then((res: any): void => {
          swal("ההזמנה נמחקה", {
            icon: "success",
          });
          this.setState({
            redirect: true
          });
        });
      }
    })
    .catch(err => console.log(err));

  }

  renderToppings = (item: any) => {
    // return item.additionalSection.map((as: any, i: number) => (
    //   <div>
    //     <h2>{ as.sectionName }</h2>
    //     { as.name }
    //   </div>
    // ));
  }

  render() {
    let timePassed = moment(this.state.order.created).fromNow();
    let orderCreated = moment(this.state.order.created).format("DD/MM/YY");
    let orderCreatedTime = moment(this.state.order.created).format("HH:mm");
    const { user, address, cart, rest, total, hurry } = this.state.order;
    let listCart = cart.map((item: any, i: number) => {
      return (
        <tr key={i}>
          <td>{rest}</td>
          <td>{item.name}</td>
          <td>
            {this.renderToppings(item)}
          </td>
          <td className="text-center">{item.price} <i className="fa fa-ils" /></td>
        </tr>
      );
    });
    return (
      <div className="order-details">
        <Header />
        <Sidebar />
        {this.state.redirect ? <Redirect to="/dash" /> : null}
        <div className="page-content">
          <div className="row">
            <div className="col-xs-12">
              <div className="invoice-title">
                <h3 className="pull-right">הזמנה <strong className="text-primary">{timePassed}</strong></h3>
              </div>
              <br />
              <hr />
              <div className="row">
                <div className="col-xs-6">
                  <address>
                    <h4>פרטי משלוח</h4>
                    הוזמן בתאריך: <strong>{orderCreated}</strong><br />
                    הוזמן בשעה: <strong>{orderCreatedTime}</strong><br />
                    הוזמן ממסעדה: <strong>{rest}</strong><br />
                    דחוף?: {hurry ? <span className="text-danger">דחוף</span> : <span className="text-success">לא דחוף</span>}
                  </address>
                </div>
                <div className="col-xs-6 text-right">
                  <address>
                    <h4>כתובת למשלוח</h4>
                    <strong>{user.name} {user.last}</strong><br />
                    פלאפון: <strong>{user.phone}</strong><br />
                    כתובת: <strong>{address.street}</strong><br />
                    כניסה: <strong>{address.enterance}</strong><br />
                    קומה: <strong>{address.floor}</strong><br />
                    דירה: <strong>{address.apartment}</strong><br />
                    <strong>{address. city}</strong>
                  </address>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title"><strong>סיכום הזמנה</strong></h3>
                </div>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-condensed">
                      <thead>
                        <tr>
                          <td><strong>מסעדה</strong></td>
                          <td><strong>מוצר</strong></td>
                          <td><strong>תוספות</strong></td>
                          <td className="text-center"><strong>מחיר</strong></td>
                        </tr>
                      </thead>
                      <tbody>
                        {listCart}
                        <tr>
          								<td className="text-right"><strong>סה"כ</strong></td>
                          <td className="no-line" />
          								<td className="text-center">{total} <i className="fa fa-ils" /></td>
          							</tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-center">
                    <button className="btn btn-success" onClick={() => this._archiveOrder(this.state.order, 1)}>
                      הזמנה בוצעה
                    </button>
                  </div>
                  <div className="col-md-4 text-center">
                    <button className="btn btn-primary" onClick={() => this._archiveOrder(this.state.order, 2)}>
                      הזמנה בוטלה
                    </button>
                  </div>
                  <div className="col-md-4 text-center" onClick={() => this._delOrder(this.state.order)}>
                    <button className="btn btn-dark">
                      מחק הזמנה
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderDetails;
