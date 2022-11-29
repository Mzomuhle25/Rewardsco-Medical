import React                      from "react";
import { connect }                from "react-redux";
import { startToggleStatus }      from "../Action/appointmentActions";
import { Link }                   from "react-router-dom";
import Modal                      from "./common/Modal";
import { startDeleteAppointment } from "../Action/appointmentActions";
import EmailProvider              from "../Providers/EmailProvider";

class DropDownMenu extends React.Component {
  state = {
    modalActive: false,
  };
  setModalToggle = (toggle) => {
    
    this.setState({ modalActive: toggle });
  };

  render() {
    return (
      <div>
        <div
          className={`dropdown is-hoverable is-right ${
            this.props.index < this.props.length / 2 ? "is-down" : "is-up"
          }`}
        >
          <div className="dropdown-trigger">
            <img alt="menu" src={require("../Img/more-vertical.svg")} style={{width:'300px'}}></img>
          </div>
          <div className="dropdown-menu" id="dropdown-menu4" role="menu">
            <div className="dropdown-content">
              <Link className="dropdown-item" to={`edit/${this.props._id}`}>
                Reschedule
              </Link>
              <Link
                onClick={async () => {
                  await this.props.dispatch(
                    startToggleStatus(this.props._id, {
                      status: !this.props.status,
                    })
                  );
                  const d = new Date(this.props.date);
                  const data = {
                    service_id: 'service_dt9iy4i',
                    template_id: 'template_96p399d',
                    user_id: '5PArZbKGxsdqul1vh',
                    template_params: {
                        'user_email'      : this.props.email,
                        'to_name'         : this.props.name,
                        'from_name'       : 'Dr.Sirini Singh',
                        'message'         : 'Your appointment has been confirmed',
                        'reference'       : this.props._appId,
                        'status'          : 'Confirmed',
                        'date'            : d.toLocaleDateString(),
                        'time'            : d.toLocaleTimeString(),
                        'note'            : ' Please note your appointment has been scheduled for',
                        'location'        : "Rewardsco",
                        'contact_number'  : "031 571 1704"
                    }
                  };
                  //await EmailProvider.sendConfirmationEmail(data);
                }}
                className="dropdown-item"
              >
                Mark as {!this.props.status ? "Confirmed" : "Not Confirmed"}
              </Link>

              <hr className="dropdown-divider" />
              <p
                onClick={() => {this.setState({ modalActive: true });}}
                className="dropdown-item"
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
        <Modal
          buttonText      = {"Delete"}
          toastType       = {"success"}
          _id             = {this.props._id}
          setModalToggle  = {this.setModalToggle}
          modalActive     = {this.state.modalActive}
          action          = {startDeleteAppointment}
          toastText       = {"Successfully Deleted"}
          text            = {"Do you want to delete the appointment?"}
        />
      </div>
    );
  }
}
export default connect()(DropDownMenu);
