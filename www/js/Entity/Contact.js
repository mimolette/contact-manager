function Contact() {
  EventEmitter.call(this);
  this.test = 444;
}

Contact.prototype = Object.create(EventEmitter.prototype);
Contact.prototype.constructor = Contact;

Contact.prototype.hydrate = function(ContactJSON) {
  this.setFirstname(ContactJSON.firstname);
  this.setLastname(ContactJSON.lastname);
  this.setTel(ContactJSON.tel);
  this.setMail(ContactJSON.mail);
  this.setBirthDate(ContactJSON.dn);
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
  this.birthDate = dn;
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