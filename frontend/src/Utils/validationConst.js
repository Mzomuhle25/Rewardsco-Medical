import * as Yup from "yup";

export const initials = {
  Name            : "",
  Age             : "",
  Email           : "",
  phonenumber     : "",
  date            : "",
  idnumber        : "",
  employeenumber  : "",
  Description     : "",
  condition       : "acute",
};

export const yupValidators = {
  Name: Yup.string()
    .trim()
    .min(3, "Must be 3 characters or more")
    .required("Required Name"),
  Age: Yup.number()
    .positive("Age should be positive")
    .lessThan(100, "Must be below the age of 100 ")
    .integer("Age cannot be a decimal")
    .required("Required Age"),
  Email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required Email"),
  phonenumber: Yup.string()
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Must be a valid Indian phone number"
    )
    .required("Required Phone Number"),
  idnumber: Yup.string()
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Must be a valid ID Number"
    )
    .required("ID Number"),
  employeenumber: Yup.string()
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Must be a valid Employee Number"
    )
    .required("Employee Number"),
  Description: Yup.string()
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Must be a Description"
    )
    .required("Description"),
  condition: Yup.string()
    .trim()
    .required("condition"),
  date: Yup.date().required("Required Date"),
};

export const yupLoginValidators = {

  Email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Required Email"),
  Password:Yup.string().required("Password Required").trim()
};

export const loginInitials = {
 Email: "",
 Password:""
};