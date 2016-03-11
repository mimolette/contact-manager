function AddPage() {

  EventEmitter.call(this);
  this.title = "Ajouter un contact";
  this.id = "page-add";
  this.url = "#" + this.id;
  this.contact = new Contact();

}

AddPage.prototype = Object.create(EventEmitter.prototype);
AddPage.prototype.constructor = AddPage;

AddPage.prototype.getId = function() {
  return this.id;
};

AddPage.prototype.getTitle = function() {
  return this.title;
};

AddPage.prototype.getUrl = function() {
  return this.url;
};

AddPage.prototype.getContact = function() {
  return this.contact;
};

AddPage.prototype.setContact = function(contact) {
  this.contact = contact;
  this.emit('CONTACT_CHANGE');
  return this;
};