/* eslint-disable */
const number                        = new RegExp(/^[0-9]*$/);
const alphaAndNumeric               = new RegExp(/[a-zA-Z-\s]+\d*$/);
const alphaAndNumericWithSpaces     = new RegExp(/^[\.a-zA-Z0-9,!? ]*$/);
const mobile                        = new RegExp(/^((0)[6-8][0-9]{8}) *$/);
const phone                         = new RegExp(/^((0)[1-8][0-9]{8}) *$/);
const alpha                         = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*) *$/);
const alphaWithSpaces               = new RegExp(/^[a-zA-Z\s]+(([',. -][a-zA-Z ])?[a-zA-Z]*) *$/);
const currency                      = new RegExp(/^(\$?\d{1,3}(?:,?\d{3})*(?:\.\d{2})?|\.\d{2})?$/);
const email                         = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9-_\.\+]+@([a-zA-Z]|[a-zA-Z0-9]?[a-zA-Z0-9-]+[a-zA-Z0-9])\.[a-zA-Z0-9]{2,10}(?:\.[a-zA-Z]{2,10})?$/)

export {
    email,
    alpha,
    phone,
    mobile,
    number,
    currency,
    alphaWithSpaces,
    alphaAndNumeric,
    alphaAndNumericWithSpaces
};
