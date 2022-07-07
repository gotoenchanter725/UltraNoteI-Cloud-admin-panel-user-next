function isAmount(data) {
  const re = /^[0-9]*\.?[0-9]*$/;
  let istrue = false;

  if (data === '' || re.test(data)) {
    istrue = true;
    return istrue;
  }
  return istrue;
}

function valueIsNumber(data) {
  const re = /^[0-9]*$/;
  let istrue = false;

  if (data === '' || re.test(data)) {
    istrue = true;
    return istrue;
  }
  return istrue;
}

function skipSpace(data) {
  const value = data.replace(/\s/g, '');
  return value;
}

function isValueText(data) {
  const re = /^[a-zA-Z ]*$/;
  let istrue = false;
  if (data === '' || re.test(data)) {
    istrue = true;
    return istrue;
  }
  return istrue;
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export { isAmount, valueIsNumber, skipSpace, isValueText, validateEmail };
