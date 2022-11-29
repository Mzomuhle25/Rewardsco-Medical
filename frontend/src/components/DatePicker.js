import React, { useEffect, useState }       from 'react';
import { connect }                          from "react-redux";
import { useField, useFormikContext }       from "formik";
import DatePicker                           from "react-datepicker";
import                                      "react-datepicker/dist/react-datepicker.css";

const Exp = ({ value, onClick }) => (
  <div className="button" onClick={onClick}>
    {value ? value : "Select Date"}
  </div>
);

const DatePickerField = ({ ...props }) => {
  const { setFieldValue }                   = useFormikContext();
  const [field]                             = useField(props);
  var date                                  = new Date();
 
  const filterPassedTime                    = (time) => {
    const currentDate                       = new Date();
    const selectedDate                      = new Date(time);
    return currentDate.getTime()            < selectedDate.getTime();
  };
  let d                                     = new Date();
  let selectedDate                          = new Date();
  let bookedTimeSlots                       = [];
  const loadBookedSlots = (val)             => {
    props.appoinment.map((item)             => (
      ( 
        d                                   = new Date(item.date),
        selectedDate                        = new Date(val),
        d.getMonth()+ "/"+d.getDay()+ "/"+d.getFullYear() == selectedDate.getMonth()+ "/"+selectedDate.getDay()+ "/"+selectedDate.getFullYear() && item.status ? 
        (bookedTimeSlots.push(d.setHours(+d.getHours())),bookedTimeSlots.push(d.setMinutes(d.getMinutes()))):''
      )
    ))
  };
  loadBookedSlots(date);
  return (
    <DatePicker
      showTimeSelect
      timeIntervals                         = "15"
      minDate                               = {date}
      customInput                           = {<Exp />}
      filterTime                            = {filterPassedTime}
      selected                              = {field.value || null}
      dateFormat                            = "dd/MM/yyyy , h:mm ss"
      minTime                               = {date.setHours(props.minTime)}
      maxTime                               = {date.setHours(props.maxTime)}
      onChange                              = {(val) => {
                                            setFieldValue(field.name, val);
                                            loadBookedSlots(val);}}
      excludeTimes                          = {bookedTimeSlots}
      filterDate                            = {(date) => date.getDay(date) !== 6 && date.getDay(date) !== 0}
    />
  );
};
const mapStateToProps = (state) => {
  return {
    appoinment: state.appointments,
  };
};

export default connect(mapStateToProps)(DatePickerField);