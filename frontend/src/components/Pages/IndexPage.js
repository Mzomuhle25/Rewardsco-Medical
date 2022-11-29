import React                            from "react";
import Section                          from "../common/Section";
import { Title, Subtitle, Landing }     from "../common/Typography";
import AppointmentForm                  from "../AppointmentForm";
import                                  getSortedAppointments  from "../../Selectors/appointmentSelectors";   
import { connect }                      from "react-redux";

class IndexPage extends React.Component {

  render() {
    return (
      <Landing>
        <Section>
          <div className=" box columns is-centered is-vcentered has-fixed-height">
            <div className=" column is-4 has-text-left ">
              <img
                src={require("../../Img/medicine-wellness.svg")}
                width="128"
                alt="Medicine Logo"
              />
              <Title title="Rewardsco Medical Services always got your back!" />
              <Subtitle subtitle="No Rush Appointments, Minimal Wait Times. " />
            </div>
            <div className="column is-4 py-6">
              <AppointmentForm  appoinment={this.props.appoinment}/>
            </div>
          </div>

        </Section>
      </Landing>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    sortedAppoinment: getSortedAppointments(state.appointments, state.filters),
    appoinment: state.appointments,
    filters: state.filters,
    error: state.error,
  };
};
export default connect(mapStateToProps)(IndexPage);
