import React                       from "react";
import { connect }                 from "react-redux";
import Section                     from "../common/Section";
import ErrorSection                from "../common/Error";
import { Subtitle, Title }         from "../common/Typography";
import FormikForm                  from "../common/FormikForm";
import { startEditAppointment }    from "../../Action/appointmentActions";
import EmailProvider               from "../../Providers/EmailProvider";
import Modal                       from "../common/Modal";

class EditPage extends React.Component {
  state = {
    modalActive: false,
    values: [],
  };
  setModalToggle = (toggle) => {
    this.setState({ modalActive: toggle });
  };

  render() {
    if (typeof this.props.oneAppoinment === "undefined") {
      return <ErrorSection error={true} />;
    }
    const { Name, Age, Email, date, phonenumber, createdAt,idnumber,_appId  } = this.props.oneAppoinment;
    return (
      <Section>
        <div className="columns is-centered">
          {
            <div className="column is-half">
              <Title title={`You are editing ${Name}'s appointment`} />
              <Subtitle subtitle={`Appointment Booked on ${new Date(createdAt).toLocaleDateString("en-GB")} at ${new Date(createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}/>
              <FormikForm
                date        = {true}
                phone       = {true}
                id          = {true}
                fieldTypes  = {["Name", "Age", "Email",]}
                initials={{
                  Name,
                  Age,
                  Email,
                  phonenumber,
                  date: new Date(date),
                  idnumber,
                }}
                //yupValidators={Yup.object(yupValidators)}
                onSubmitHandler={async (values, { setSubmitting }) => {
                   try {
                    this.setState({ modalActive: true, values: values });
                    const d = new Date(values.date);
                    const data = {
                      service_id: 'service_dt9iy4i',
                      template_id: 'template_96p399d',
                      user_id: '5PArZbKGxsdqul1vh',
                      template_params: {
                          'user_email'      : values.Email,
                          'to_name'         : values.Name,
                          'from_name'       : 'Dr.Sirini Singh',
                          'message'         : 'Your appointment has been reschedule',
                          'reference'       : _appId,
                          'status'          : 'Reschedule',
                          'date'            : d.toLocaleDateString(),
                          'time'            : d.toLocaleTimeString(),
                          'note'            : 'Please note your appointment has been rescheduled for',
                          'location'        : "Rewardsco",
                          'contact_number'  : "031 571 1704"
                      }
                    };
                    //await EmailProvider.sendConfirmationEmail(data);
                  setSubmitting(false);
                  } catch (error) {}
                }}
              />
            </div>
          }
        </div>
        <Modal
          redirect            = {true}
          toastType           = {"success"}
          buttonText          = {"Confirm"}
          redirectURL         = {"/dashboard"}
          value               = {this.state.values}
          setModalToggle      = {this.setModalToggle}
          action              = {startEditAppointment}
          toastText           = {"Successfully Edited"}
          modalActive         = {this.state.modalActive}
          _id                 = {this.props.oneAppoinment._id}
          text                = {"Do you want to edit the appointment?"}
        />
      </Section>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    oneAppoinment: state.appointments.find((appoinment) => {
      return appoinment._id === props.match.params.id;
    }),
  };
};
export default connect(mapStateToProps)(EditPage);
