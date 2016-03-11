function Contact() {
  EventEmitter.call(this);
  this.picture = 'img/contact.jpg';
  this.regexFirstname = new RegExp(/^[a-zàâçéèêëîïôûùüÿñ .-]{3,}$/, 'i');
  this.regexLastname = new RegExp(/^[a-zàâçéèêëîïôûùüÿñ .-]{3,}$/, 'i');
  this.regexTel = new RegExp(/^([0-9]{2}[ -/]?){5}$/);
  this.regexMail = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/, 'i');
  this.birthDate = moment('1970-01-01');
}

Contact.prototype = Object.create(EventEmitter.prototype);
Contact.prototype.constructor = Contact;

Contact.prototype.hydrate = function(ContactJSON) {
  this.setFirstname(ContactJSON.firstname);
  this.setLastname(ContactJSON.lastname);
  this.setTel(ContactJSON.tel);
  this.setMail(ContactJSON.mail);
  this.setBirthDate(ContactJSON.dn);
  this.setPicture(ContactJSON.picture);
};

Contact.prototype.isValid = function() {

  if(!this.regexFirstname.test(this.firstname)) return false;
  if(!this.regexLastname.test(this.lastname)) return false;
  if(!this.regexTel.test(this.tel)) return false;
  if(!this.regexMail.test(this.mail)) return false;

  return true;
};

Contact.prototype.setFirstname = function(fn) {
  this.firstname = fn;
  return this;
};

Contact.prototype.setLastname = function(ln) {
  this.lastname = ln;
  return this;
};

Contact.prototype.setTel = function(tel) {
  this.tel = tel;
  return this;
};

Contact.prototype.setMail = function(mail) {
  this.mail = mail;
  return this;
};

Contact.prototype.setBirthDate = function(dn) {
  this.birthDate = moment(dn);
  return this;
};

Contact.prototype.setPicture = function(img) {
  this.picture = img;
  return this;
};

Contact.prototype.getFirstname = function() {
  return this.firstname;
};

Contact.prototype.getLastname = function() {
  return this.lastname;
};

Contact.prototype.getTel = function() {
  return this.tel;
};

Contact.prototype.getMail = function() {
  return this.mail;
};

Contact.prototype.getBirthDate = function() {
  return this.birthDate;
};

Contact.prototype.getPicture = function() {
  return this.picture;
};

Contact.prototype.getBirthDateFr = function() {
  if(this.birthDate.format) {
    return this.birthDate.format('DD-MM-YYYY');
  } else {
    return null;
  }
};

Contact.prototype.getBirthDateUS = function() {
  if(this.birthDate.format) {
    return this.birthDate.format('YYYY-MM-DD');
  } else {
    return null;
  }
};

Contact.prototype.getFullName = function() {
  return this.lastname + ' ' + this.firstname;
};