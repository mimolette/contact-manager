function HomePage() {

  EventEmitter.call(this);
  this.title = "Contacts";
  this.id = "page-home";
  this.url = "#" + this.id;
  this.contactDAO = new ContactDAO();
  //this.contacts = [];

}

HomePage.prototype = Object.create(EventEmitter.prototype);
HomePage.prototype.constructor = HomePage;

HomePage.prototype.getId = function() {
  return this.id;
};

HomePage.prototype.getTitle = function() {
  return this.title;
};

HomePage.prototype.getUrl = function() {
  return this.url;
};

HomePage.prototype.addContact = function(contact) {
  if(this.contactDAO.addContact(contact)) {
    this.emit('CONTACTS_REFRESH');
  } else {
    this.emit('CONTACTS_NEW', contact);
  }
};

HomePage.prototype.removeContact = function(contact) {
  if(this.contactDAO.removeContact(contact)) {
    this.emit('CONTACTS_REFRESH');
  }
};

HomePage.prototype.sortAction = function(reverse) {
  if(this.contactDAO.sortByLastname(reverse)) {
    this.emit('CONTACTS_REFRESH');
  }
};

HomePage.prototype.getContactDAO = function() {
  return this.contactDAO;
};