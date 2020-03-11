export const required = value => (value ? undefined : "Required");
export const minValue = min => value =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
export const maxValue = max => value =>
  isNaN(value) || value <= max ? undefined : `Should be greater than ${max}`;
export const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined);
export const passwordConfirmation = (allValues, password_confirmation) =>
  isNaN(password_confirmation) || password_confirmation === allValues.password ? undefined : 'Confirm password not match';
export const email = value => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (isNaN(value) || re.test(String(value).toLowerCase())) {
    return undefined
  } 
  else {
    return 'Invalid email'
  }
}