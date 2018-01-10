import * as React from 'react';
import * as swal from 'sweetalert';
import * as moment from 'moment';
import TimePicker from 'material-ui/TimePicker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'moment/locale/he';
import axios from 'axios';

interface StateTypes {
  workingHours: any,
  currentModalItem: any,
  name: string,
  description: string,
  iconURL: string,
  kosher: boolean,
  isVIP: boolean
}

interface PropsTypes {
  currentModalItem: any,
  doneAddItem: any
}

class AddItem extends React.Component<PropsTypes, StateTypes> {

  state = {
    currentModalItem: this.props.currentModalItem,
    workingHours: {
      sunday: {
        open: '',
        close: ''
      },
      monday: {
        open: '',
        close: ''
      },
      tuesday: {
        open: '',
        close: ''
      },
      wednsday: {
        open: '',
        close: ''
      },
      thursday: {
        open: '',
        close: ''
      },
      friday: {
        open: '',
        close: ''
      },
      saturday: {
        open: '',
        close: ''
      }
    },
    name: '',
    description: '',
    iconURL: '',
    kosher: false,
    isVIP: false
  };

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
    const { currentModalItem, name, description, iconURL, kosher, workingHours, isVIP } = this.state;
    if(name !== '') {
      axios.post('https://shlomix-server.herokuapp.com/items/addItem', {
        catID: currentModalItem._id,
        name,
        description,
        iconURL,
        kosher,
        workHours: workingHours,
        isVIP
      })
      .then((res: any): void => {
        console.log(res);
        swal(res.data.feedback, {
          icon: res.data.type,
        });
        this.props.doneAddItem();
      }).catch(err => console.log(err));
    } else {
      swal("שגיאה", "שם המסעדה ריק", "error");
    }
  }

  render() {

    const { currentModalItem, kosher, isVIP } = this.state;

    return (
      <MuiThemeProvider>
        <div className="addItem">
          <h1>
            הוספת מסעדה בקטגוריית
            <img src={
                currentModalItem.iconURL ?
                  currentModalItem.iconURL
                :
                  "https://www.nflfullhd.com/wp-content/themes/watchzaa/images/no-image-landscape.png"
              }
              width="32"
              height="32"
              style={{ marginRight: 10 }}
            />
            {currentModalItem.name}
          </h1>
          <div className="form-group">
            <label>שם המסעדה:</label>
            <input type="rest-name" className="form-control" onChange={(e) => this.setState({ name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>תיאור:</label>
            <input type="text" className="form-control" onChange={(e:any) => this.setState({ description: e.target.value })} />
          </div>
          <div className="form-group">
            <label>אייקון:</label>
            <input type="text" className="form-control" onChange={(e:any) => this.setState({ iconURL: e.target.value })} />
          </div>
          <div className="form-group">
            <h3>שעות עבודה</h3>
            <div className="col-md-6 col-xs-6">
              <label>יום ראשון</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'sunday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'sunday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שני</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'monday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'monday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שלישי</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'tuesday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'tusday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום רביעי</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'wednsday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'wednsday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום חמישי</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'thursday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'thursday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שישי</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'friday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'friday', 1)}
              />
            </div>
            <div className="col-md-6 col-xs-6">
              <label>יום שבת</label>
              <TimePicker
                format="24hr"
                hintText="פתיחה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'saturday', 0)}
              />
              <TimePicker
                format="24hr"
                hintText="סגירה"
                onChange={(e, date) => this.handleChangeTimePicker24(e, date, 'saturday', 1)}
              />
            </div>
          </div>
          <div className="clearfix"></div>
          <div className="checkbox">
            <label><input type="checkbox" checked={kosher} onChange={() => this.setState({ kosher: !kosher })} /> כשר למהדרין</label>
          </div>
          <div className="checkbox">
            <label><input type="checkbox" checked={isVIP} onChange={() => this.setState({ isVIP: !isVIP })} /> VIP</label>
          </div>
          <button className="btn btn-success" onClick={this.submitItem}>הוסף מסעדה</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AddItem;
