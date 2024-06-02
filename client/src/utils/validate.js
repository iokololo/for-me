class Validator {
  email(email) {
    if (email.length === 0) {
      return false;
    }
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  password(password) {
    if (password.length === 0) {
      return false;
    }
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  }
  confirmPassword(password, confirmPassword) {
    if (confirmPassword.length === 0) {
      return false;
    }
    return password === confirmPassword;
  }
  phone(phone) {
    if (phone.length === 0) {
      return false;
    }
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }
  numberOfDocument(numberOfDocument) {
    if (numberOfDocument.length === 0) {
      return false;
    }
    const re = /^[0-9]{9}$/;
    return re.test(numberOfDocument);
  }

  iin(iin) {
    if (iin.length === 0) {
      return false;
    }
    const re = /^[0-9]{12}$/;
    return re.test(iin);
  }

  area(area) {
    if (area === "") {
      return true;
    }
    const re = /^[0-9]{1,4}$/;
    return re.test(area);
  }

  price(price) {
    if (price === "") {
      return true;
    }
    const re = /^[0-9]{1,6}$/;
    return re.test(price);
  }

  name(name) {
    if (name.length === 0) {
      return false;
    }
    const re = /^[a-zA-Zа-яА-Я]+$/;
    return re.test(name);
  }

  comment(comment) {
    return !(comment.length > 1000);
  }
}

export default new Validator();
