function HomePage() {

  EventEmitter.call(this);
  this.title = "Contacts";
  this.id = "page-home";
  this.url = "#" + this.id;
  this.contacts = [];

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
  this.contacts.push(contact);
  this.emit('CONTACTS_CHANGE', contact);
};

HomePage.prototype.getContacts = function() {
  return this.contacts;
};