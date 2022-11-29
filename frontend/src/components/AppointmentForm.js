import React                                                from "react";
import { connect }                                          from "react-redux";
import { startAddAppointment }                              from "../Action/appointmentActions";
import { initials }                                         from "../Utils/validationConst";
import FormikForm                                           from "./common/FormikForm";
import EmailProvider                                        from "../Providers/EmailProvider";     
import "react-datepicker/dist/react-datepicker.css";

import FormSubmissionSucessfully, {
FormSubmissionUnsucessfully,
} from "./FormSubmission";

class AppointmentForm extends React.Component {
 
  fieldTypes = ["Name", "Age", "Email","idnumber"];
  state = {
    renderView: 0,
    _id: "",
  };
  changeView = (props, _id) => {
    this.setState({
      renderView: props,
      _id,
    });
  };
  render() {
    switch (this.state.renderView) {
      case 0:
        return (<>
          <FormikForm
            Employee     = {true}
            date         = {true}
            phone        = {true}
            id           = {true}
            condition    = {true}
            fieldTypes   = {["Name","Age","Email","Description"]}
            initials     = {initials}
            onSubmitHandler={async (values, { setSubmitting }) => {
              try {
                const _id = await this.props.dispatch(startAddAppointment(values));
                this.changeView(1, _id);
                const d = new Date(values.date);
                const data = {
                  service_id            : 'service_dt9iy4i',
                  template_id           : 'template_v9mk53g',
                  user_id               : '5PArZbKGxsdqul1vh',
                  template_params: {
                      'user_email'      : values.Email,
                      'to_name'         : values.Name,
                      'from_name'       : 'Dr.Sirini Singh',
                      'message'         : 'Your appointment has been received',
                      'reference'       : _id,
                      'status'          : 'Received',
                      'date'            : d.toLocaleDateString(),
                      'time'            : d.toLocaleTimeString(),
                      'note'            : 'Please note your appointment has been received by the doctor.',
                      'location'        : "Rewardsco",
                      'contact_number'  : "031 571 1704"
                  }
                };
                //await EmailProvider.sendConfirmationEmail(data);
                setSubmitting(false);
              } catch (error) {
                this.changeView(2);
              }
            }}
          />
        </>);
      case 1:
        return <FormSubmissionSucessfully _id={this.state._id} />;
      case 2:
        return <FormSubmissionUnsucessfully />;
      default:
        return;
    }
  }
}

export default connect(undefined, undefined)(AppointmentForm);


