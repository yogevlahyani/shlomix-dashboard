import * as React from 'react';
import * as io from 'socket.io-client';
import axios from 'axios';
import { Link } from 'react-router-dom';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import 'moment/locale/he';


class Orders extends React.Component {

  state = {
    orders: []
  };

  componentDidMount(): void {
    const socket = io('http://104.236.92.123:8080');
    const orderAlertSound = new Audio(require('../assets/sounds/order-alert.mp3'));
    socket.on('connect', (): void => {
      console.log('Connected!');
      socket.emit('send msg', 'asd');
    });
    socket.on('orders', (data: any): void => {
      if (data.orders.length > this.state.orders.length && this.state.orders.length > 0)
        orderAlertSound.play();
      // if (JSON.stringify(this.state.orders) !== JSON.stringify(data.orders)) {
        // console.log(data);
        this.setState({
          orders: data.orders.reverse()
        });
        // console.log(this.state.orders);
      // }
    });
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
        });
      }
    })
    .catch(err => console.log(err));

  }

  render() {

    let renderList = this.state.orders.map((order: any, i: number) => {
        let timePassed = moment(order.created).fromNow();
        let timePassedMinutes = moment().diff(order.created, 'minutes');
        if (timePassedMinutes >= 50) {
          var colorByTimePassed = 'bg-danger text-white';
        } else if (timePassedMinutes >= 30) {
          var colorByTimePassed = 'bg-warning text-white';
        } else {
          var colorByTimePassed = 'bg-light';
        }
        return (
          <tr key={i} className={colorByTimePassed}>
            <td>{i}</td>
            <td>
              <Link to={ "/dash/order/" + order._id }>
              <button className="btn btn-white">
              <i className="fa fa-eye" />
              </button>
              </Link>
            </td>
            <td>{order.user.name} {order.user.last}</td>
            <td>
              <ul>
                {
                  order.cart.map((detail: any, i: number) => {
                    return (
                      <li key={i}>
                        {detail.name}: {detail.price} <i className="fa fa-ils" />
                        <br />
                        {
                          detail.additionalSection.length > 0 ? <strong>עם תוספות</strong> : 'ללא תוספות'
                        }
                      </li>
                    );
                  })
                }
              </ul>
            </td>
            <td>{order.rest}</td>
            <td>{order.notes}</td>
            <td>
              {timePassed}
            </td>
            <td>{order.hurry ? <span className="text-danger bg-white p-2">דחוף!</span> : <span className="text-success bg-white p-2">לא דחוף</span>}</td>
            <td>{order.total} <i className="fa fa-ils" /></td>
            <td>
              <button className="btn btn-success" onClick={() => this._archiveOrder(order, 1)}>
                <i className="fa fa-check-circle" />
              </button>
            </td>
            <td>
              <button className="btn btn-primary" onClick={() => this._archiveOrder(order, 2)}>
                <i className="fa fa-ban" />
              </button>
            </td>
            <td>
              <button className="btn btn-dark" onClick={() => this._delOrder(order)}>
                <i className="fa fa-times-circle-o" />
              </button>
            </td>
          </tr>
        );
      });

    return (
      <div className="orders">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>הצג</th>
              <th>שם המזמין</th>
              <th>מה הזמין</th>
              <th>ממסעדה</th>
              <th>הערות</th>
              <th>הוזמן בשעה</th>
              <th>דחיפות</th>
              <th>מחיר כולל</th>
              <th>בוצע</th>
              <th>בטל</th>
              <th>מחק</th>
            </tr>
          </thead>
          <tbody>
            {renderList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Orders;
