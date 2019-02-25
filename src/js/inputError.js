import validation from './validation';

class InputError {
  constructor(objectErrors = {}) {
    this.errors = objectErrors;
  }
  errorEmail(email) {
    const [error1, error2, error3, error4] = this.errors.email;
    let errorText = '';
      if (!email) {
        errorText = error1;
      } else if (!validation.emailAt(email)) {
        errorText = error2;
      } else if (!validation.emailDomain(email)) {
        errorText = error3;
      } else if (!validation.email(email)) {
        errorText = error4;
      } else {
        errorText = '';
      }
      return errorText;
  }
  errorName(name) {
    const [error1, error2] = this.errors.name;
    let errorText = '';
      if (!name) {
        errorText = error2;
      } else if (name && !validation.name(name)) {
        errorText = error1;
      } else {
        errorText = '';
      }
      return errorText;
  }
  errorPhone(phone) {
    const [error1, error2, error3] = this.errors.phone
    let errorText = '';
      if (phone && !validation.onlyPhone(phone)) {
        errorText = error1;
      } else if (phone && validation.phoneCount(phone)) {
        errorText = error2;
      } else if (phone && !validation.phone(phone)) {
        errorText = error3;
      } else {
        errorText = '';
      }
      return errorText;
  }
  errorAge(age) {
    const [error1, error2] = this.errors.age;
    let errorText = '';
      if (age && !validation.onlyDigit(age)) {
        errorText = error1;
      } else if ((age || age === 0)
        && (Number(age) < 16 || Number(age) > 160)) {
        errorText = error2;
      } else {
        errorText = '';
      }
      return errorText;
  }
}

export default InputError;