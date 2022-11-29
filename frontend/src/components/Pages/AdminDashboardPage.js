import React                          from "react";
import Section                        from "../common/Section";
import { Title, Subtitle }            from "../common/Typography";
import getSortedAppointments          from "../../Selectors/appointmentSelectors";
import {
  getTotalAppointment,
  getTotalDays,
  getNewAppointments,
}                                     from "../../Selectors/statsSelectors";
import { connect }                    from "react-redux";
import Options                        from "../Options.js";
import Tables                         from "../Tables";
import { CSVLink }                    from "react-csv";

const data = [];

const headers = [
  {label: 'Name', key: 'Name'},
  {label: 'Age', key: 'Age'},
  {label: 'Phone Number', key: 'phonenumber'},
  {label: 'Employee Number', key: 'employeenumber'},
  {label: 'Description', key: 'Description'},
  {label: 'ID Number', key: 'idnumber'},
  {label: 'Date', key: 'date'},];

const csvReport = {
 filename : 'Report.csv',
 headers  : headers,
 data     : data
};

class AdminDashboardPage extends React.Component {
  render() {
    return (<>{  
                this.props.sortedAppoinment.map((appointment) =>
                data.push({ 
                  Name                : appointment.Name,
                  Age                 : appointment.Age, 
                  Email               : appointment.Email, 
                  phonenumber         : appointment.phonenumber, 
                  employeenumber      : appointment.employeenumber,
                  Description         : appointment.Description, 
                  idnumber            : appointment.idnumber,
                  date                : appointment.date,
                })
              )
            }
      <div>
        <Section>
          <article className="message ">
            <div className="message-body">
              <Title title="Welcome, Doctor"/>
              <Subtitle subtitle="Here are your recent appointments"/>
            </div>
          </article>
          <Options/>
          <div className="columns">
            <div className="column is-6">
              <p className="subtitle is-5">
                Showing {getTotalAppointment(this.props.sortedAppoinment)}{" "}
                {getTotalAppointment(this.props.sortedAppoinment) > 1
                  ? "appointments"
                  : "appointment"}{" "}
                from last {getTotalDays(this.props.filters)}{" "}
                {getTotalDays(this.props.filters) > 1 ? "days." : "day."}
              </p>
            </div>
            <div className="column is-6 has-text-right  has-text-left-touch">
              <p className="tag is-success is-medium  ">
                {getNewAppointments(this.props.appoinment)} New Appointments
                Today.
              </p>
            </div>
          </div>
          
          <div classname="App">
          <CSVLink {...csvReport}><button type="button"><b>Generate a Report</b></button></CSVLink>
          </div>
          <div className="box table-wrapper">
            <Tables
              notFound={getTotalAppointment(this.props.sortedAppoinment) === 0}
            />

            {this.props.error && <p>{this.props.error}</p>}
          </div>
        </Section>
      </div>
    </>);
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
export default connect(mapStateToProps)(AdminDashboardPage);
