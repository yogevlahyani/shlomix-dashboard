import * as React from 'react';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'moment/locale/he';
import axios from 'axios';

interface StateTypes {
  item: any,
  workingHours: any
}

interface PropsTypes {
  item: any,
  doneAddItem: any
}

class WorkingHours extends React.Component<PropsTypes, StateTypes> {

  state = {
    item: this.props.item,
    workingHours: this.props.item.workHours
  };

  componentDidMount() {
    console.log(this.props.item);
    console.log(this.state.workingHours);
  }

  handleChangeTimePicker24: any = (event: any, date: any, day: string, type: number): void => {
    switch(day) {
      case 'sunday':
        if(type <= 0) {
          this.state.workingHours.sunday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.sunday.close = moment(date).format('HH:mm');
        }
      break;
      case 'monday':
        if(type <= 0) {
          this.state.workingHours.monday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.monday.close = moment(date).format('HH:mm');
        }
      break;
      case 'tuesday':
        if(type <= 0) {
          this.state.workingHours.tuesday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.tuesday.close = moment(date).format('HH:mm');
        }
      break;
      case 'wednsday':
        if(type <= 0) {
          this.state.workingHours.wednsday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.wednsday.close = moment(date).format('HH:mm');
        }
      break;
      case 'thursday':
        if(type <= 0) {
          this.state.workingHours.thursday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.thursday.close = moment(date).format('HH:mm');
        }
      break;
      case 'friday':
        if(type <= 0) {
          this.state.workingHours.friday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.friday.close = moment(date).format('HH:mm');
        }
      break;
      case 'saturday':
        if(type <= 0) {
          this.state.workingHours.saturday.open = moment(date).format('HH:mm');
        } else {
          this.state.workingHours.saturday.close = moment(date).format('HH:mm');
        }
      break;
      default:
        console.log(this.state.workingHours);
      break;
    }
    console.log(this.state.workingHours);
  };

  submitItem: any = (): void => {
    axios.post('http://104.236.92.123/items/updateItem', {
      id: this.state.item._id,
      workHours: this.state.workingHours
    })
    .then((res: any): void => {
      console.log(res);
      swal(res.data.feedback, {
        icon: res.data.type,
      });
      this.props.doneAddItem();
    }).catch(err => console.log(err));
  }

  render() {

    const { item } = this.state;
    console.log(item);

    return (
      <MuiThemeProvider>
        <div className="addItem">
          <h1>
            שעות עבודה
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
          <div className="form-group">
            <h3>שעות עבודה</h3>
            <div className="col-md-6 col-xs-6">
              <label>יום ראשון</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.sunday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'sunday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.sunday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'sunday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שני</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.monday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'monday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.monday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'monday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שלישי</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.tuesday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'tuesday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.tuesday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'tusday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום רביעי</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.wednsday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'wednsday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.wednsday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'wednsday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום חמישי</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.thursday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'thursday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.thursday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'thursday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שישי</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.friday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'friday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.friday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'friday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שבת</label>
              <TimePicker
                format="24hr"
                hintText={ item.workHours.saturday.open || "פתיחה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'saturday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText={ item.workHours.saturday.close || "סגירה" }
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'saturday', 1)}
              />
            </div>
          </div>
          <div className="clearfix"></div>
          <button className="btn btn-success" onClick={this.submitItem}>עדכן</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default WorkingHours;
