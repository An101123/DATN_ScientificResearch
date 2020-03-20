export const passwordConfirmation = (allValues, password_confirmation) =>
  isNaN(password_confirmation) || password_confirmation === allValues.password ? undefined : 'Confirm password not match';