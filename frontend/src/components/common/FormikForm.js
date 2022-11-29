import React, { useEffect, useState }                          from "react";
import { FormField, Button }                                   from "./Typography";
import { Formik, Field, Form, ErrorMessage }                   from "formik";
import DateTimeCalender                                        from "../DatePicker";
import Select                                                  from 'react-select';
import * as Yup                                                from 'yup';
import "react-datepicker/dist/react-datepicker.css";

const phoneRegExp = new RegExp(/^((0)[1-8][0-9]{8}) *$/);
const errorMessages = {
  name: {
    required: 'Please enter your name (No numbers, only letters)',
    invalid: 'The Name specified is invalid (No numbers, only letters)',
  },
  surname: {
    required: 'Please enter your surname (No numbers, only letters)',
    invalid: 'The Surname specified is invalid (No numbers, only letters)',
  },
  Description: {
    required: 'Please enter description',
    invalid: 'The Description is invalid',
  },
  employeenumber: {
    required: 'Please enter a valid Employee Number (Only enter numbers)',
    invalid: 'The Employee Number should be greater or equal to one digit. Eg. 20 or 2080',
  },
  Age: {
    required: 'Please enter a age (Only enter numbers)',
    invalid: 'The age should be greater than one digit and less than 3 digit. Eg. 20 or 99',
  },
  date: {
    required: 'Please enter a valid Date and Time',
    invalid: 'The Date and Time Entered is invalid. eg 18/11/2022 , 10:45 00',
  },
  idnumber: {
    required: 'Please enter your correct 13-digit SA ID Number',
    invalid: 'Please enter a valid 13-digit SA ID Number',
  },
  phonenumber: {
    required: 'Please enter a valid Phone Number (Only enter numbers)',
    invalid: 'The Phone Number should be 10 characters long. Eg. 0120000000',
  },
  Email: {
    required: 'Please enter a valid Email Address',
    invalid: 'Please enter a valid Email Address',
  },
};

export default function FormikForm(props) {
    function validateName(value) {
      let error;
      if (!value) {
        error = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Please enter a valid name';
      }
      return error;
    }

    const options = [
      { value: 'acute', label: 'Acute Condition' }, 
      { value: 'Other', label: 'Other Condition' },
      ]
      const [selectedState,setSelectedState]                   = useState('acute');
      const [minTime,setMinTime]                               = useState(8);
      const [maxTime,setMaxTime]                               = useState(16);
    return (
      <Formik
        initialValues={props.initials}
        onSubmit={props.onSubmitHandler}
        /*validationSchema={Yup.object().shape({
          phonenumber: Yup.string()
            .required(errorMessages.phonenumber.required)
            .matches(phoneRegExp, errorMessages.phonenumber.invalid),
            Email: Yup.string()
            .required(errorMessages.Email.required)
            .email(errorMessages.Email.invalid),
            
        })}*/
      >
          {({ errors, touched, validateField, validateForm , isSubmitting }) => (
          <Form>
            {props.fieldTypes &&
              props.fieldTypes.map((name, index) => {
                return (
                  <FormField key={index} label={name}>
                    <Field
                      name        = {name}
                      className   = "input is-rounded"
                      type        = {name === "Password" ? "password":"text"}
                      placeholder = {`Enter Your ${name} Here`}
                    />
                     {errors.name && <div className="help is-danger">{errors.name}</div>}
                    <ErrorMessage
                      name        = {name}
                      render      = {(error) => (
                        <div style={{color:'red'}}>{error}</div>
                      )}
                    />
                  </FormField>
                );
              })}
            {props.phone && (
              <FormField label={"Phone Number"}>
                <Field
                  name        = "phonenumber"
                  className   = "input is-rounded"
                  type        = "string"
                  placeholder = "Enter Your Phone Number Here"
                />
                <ErrorMessage
                  name="phonenumber"
                  render={(error) => (
                    <div className="help is-danger">{error}</div>
                  )}
                />
              </FormField>
            )}
             {props.id && (
              <FormField label={"ID Number"}>
                <Field
                  name        = "idnumber"
                  className   = "input is-rounded"
                  type        = "string"
                  placeholder = "Enter Your ID Number Here"
                />
                <ErrorMessage
                  name="idnumber"
                  render={(error) => (
                    <div className="help is-danger">{error}</div>
                  )}
                />
              </FormField>
            )}
            {props.Employee && (
              <FormField label={"Employee Number"}>
                <Field
                  name="employeenumber"
                  className="input is-rounded"
                  type="string"
                  placeholder="Enter Your Employee Number Here"
                />
                <ErrorMessage
                  name="employeenumber"
                  render={(error) => (
                    <div className="help is-danger">{error}</div>
                  )}
                />
              </FormField>   
               )}
              {props.Description && (
              <FormField label={"Description"}>
                <Field
                  name="Description"
                  className="input is-rounded"
                  type="string"
                  placeholder="explain briefly what is wrong"
                />
                <ErrorMessage
                  name="Description"
                  render={(error) => (
                    <div className="help is-danger">{error}</div>
                  )}
                />
              </FormField>    
            )}
              {props.condition && (<>
                <p style={{color:"black"}}><b>Select Condition</b></p>
                <div>
                  <Select
                      value             = {options.value}
                      options           = {options}
                      defaultValue      = {{ value: 'acute' , label: 'Acute Condition' }}
                      onChange={(e) => {
                        if(e.value!='acute'){setMinTime(12);setSelectedState("Other");}
                        else if(e.value=='acute'){setMinTime(8);setSelectedState("Acute");}
                      }}
                    />
                </div>
              </>  
              )}
             {props.date && (
              <FormField label={"Date"} style={{ width: '100%'}}> 
                <DateTimeCalender name="date" minTime={minTime} maxTime={maxTime} />
                <ErrorMessage
                  name                  = "date"
                  render                = {(error) => (
                    <div className      ="help is-danger">{error}</div>
                  )}
                />
              </FormField>
            )}
            <Button
              text                      = {"Submit"}
              rounded                   = {true}
              bgColor                   = {"danger"}
              txtColor                  = {"white"}
              isSemiBold                = {true}
              isLoading                 = {isSubmitting}
            />
          </Form>
        )}
      </Formik>
    );
  }



