const format = {
  phone(value) {
    const phone = value;
    const lenPhone = phone.length;
    const arr = phone.split('');
    if (lenPhone === 10) {
      arr.splice(0, '', '(+38');
      arr.splice(2, '', ') ');
      arr.splice(5, '', ' ');
      arr.splice(9, '', '-');
      arr.splice(12, '', '-');
    } else if (lenPhone === 11) {
      arr.splice(0, '', '(+3');
      arr.splice(3, '', ') ');
      arr.splice(6, '', ' ');
      arr.splice(10, '', '-');
      arr.splice(13, '', '-');
    } else if (lenPhone === 12) {
      arr.splice(0, '', '(+');
      arr.splice(4, '', ') ');
      arr.splice(7, '', ' ');
      arr.splice(11, '', '-');
      arr.splice(14, '', '-');
    } else if (lenPhone === 13) {
      arr.splice(0, '', '(');
      arr.splice(5, '', ') ');
      arr.splice(8, '', ' ');
      arr.splice(12, '', '-');
      arr.splice(15, '', '-');
    }
    return arr.join('');
  },
};

export default format;
