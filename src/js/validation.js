const validation = {
  password: (password) => {
    // eslint-disable-next-line
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\:\.\+\-\~\$%\^&\*])(?=.{8,})/;
    return re.test(password);
  },
  lowerCase: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[a-z])/;
    return re.test(value);
  },
  upperCase: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[A-Z])/;
    return re.test(value);
  },
  specialChars: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[!@#\:\.\+\-\~\$%\^&\*])/;
    return re.test(value);
  },
  oneNumber: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.*[0-9])/;
    return re.test(value);
  },
  eightChars: (value) => {
    // eslint-disable-next-line
    const re = /^(?=.{8,})/;
    return re.test(value);
  },
  digit: (value) => {
    const re = /\d+/g;
    return re.test(value);
  },
  age: (value) => {
    const re = /^(([1-9]\d?)|(1([0-6]\d)?))$/g;
    return re.test(value);
  },
  onlyDigit: (value) => {
    const re = /^([0-9]+)$/g;
    return re.test(value);
  },
  onlyPhone: (value) => {
    // eslint-disable-next-line
    const re = /^([0-9\s\-\+\(\)]+)$/g;
    return re.test(value);
  },
  phone(phone) {
    // eslint-disable-next-line
    const re = /^(((\(\+\d{2}([0-9])\)\s?)|(\+?\d{2}[0-9]\s?)|(\d?[0-9]))(\d{2}\s?\-?(\d){3}\-?\s?(\d{2})\-?\s?(\d{2})))$/;
    return re.test(phone);
  },
  phoneCount(phone) {
    const re = /([0-9])/g;
    return ((phone || '').match(re) || []).length !== 12;
  },
  email: (email) => {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
    return re.test(email);
  },
  emailAt: (value) => {
    // eslint-disable-next-line
    const re = /\@/g;
    return re.test(value);
  },
  emailDomain: (value) => {
    // eslint-disable-next-line
    const re = /\@\w+\.\w{2,}/g;
    return re.test(value);
  },
  name: (value) => {
    // eslint-disable-next-line
    const re = /\d+/g;
    const re2 = /^\S+\S/g;
    return !re.test(value) && re2.test(value);
  },
  month: value => value > 0 && value < 13,
  year: (value) => {
    const date = Number(new Date().toLocaleString('en-US', { year: '2-digit' }));
    return value >= date && value < 99;
  },
  index: (value) => {
    const re = /^([0-9]){5}$/g;
    return re.test(value);
  },
  cardNumber: (value) => {
    // eslint-disable-next-line
    const re1 = /^([1-9]{16})$/g,
      // eslint-disable-next-line
      re2 = /^(([1-9]{4}(\s|\-)){3}[1-9]{4})$/g;
    return re1.test(value) || re2.test(value);
  },
};

export default validation;
