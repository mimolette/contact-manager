function ContactDAO() {
  this.contacts = this.getAllContacts();
}

ContactDAO.prototype.getAllContacts = function() {
  if(localStorage.contacts) {
    var tab = [];
    var data = JSON.parse(localStorage.getItem('contacts'));
    data.forEach(function(contact) {
      var c = new Contact();
      c.hydrate(contact);
      tab.push(c);
    });
    return tab;
  } else {
    return [];
  }
};

ContactDAO.prototype.getContacts = function() {
  return this.contacts;
};

ContactDAO.prototype.addContact = function(contact) {
  var update = true;
  // check if contact already in contacts
  var index = this.contacts.indexOf(contact);
  if(!~index) {
    // it's a new contact
    this.contacts.push(contact);
    update = false;
  }
  this.persistContacts();
  return update;
};

ContactDAO.prototype.removeContact = function(contact) {
  var remove = false;
  var index = this.contacts.indexOf(contact);
  if(~index) {
    this.contacts.splice(index, 1);
    remove = true;
  }
  this.persistContacts();
  return remove;
};

ContactDAO.prototype.persistContacts = function() {
  var data = JSON.stringify(this.contacts);
  localStorage.setItem('contacts', data);
};