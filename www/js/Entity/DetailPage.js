function DetailPage() {

  EventEmitter.call(this);
  this.title = '';
  this.id = "page-detail";
  this.url = "#" + this.id;
  this.contact = new Contact();

}

DetailPage.prototype = Object.create(EventEmitter.prototype);
DetailPage.prototype.constructor = DetailPage;

DetailPage.prototype.getId = function() {
  return this.id;
};

DetailPage.prototype.getTitle = function() {
  return this.contact.getFullName();
};

DetailPage.prototype.getUrl = function() {
  return this.url;
};

DetailPage.prototype.getContact = function() {
  return this.contact;
};

DetailPage.prototype.setContact = function(contact) {
  this.contact = contact;
  // emit event that contact change
  this.emit('CONTACT_CHANGE');
  return this;
};