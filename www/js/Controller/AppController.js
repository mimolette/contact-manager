function AppController(contacts) {

  // TODO : remove contacts and use database
  this.contacts = contacts;

}

AppController.prototype.listenHomePage = function() {

};

AppController.prototype.listenAddPage = function() {
  this.addPageModelView.on('CANCEL', this.navigateAction.bind(this));
  this.addPageModelView.on('NEED_VALIDATION', this.validateDataAction.bind(this));
  this.addPageModelView.on('DATA_FIRSTNAME_CHANGE', this.dataChangeAction.bind(this));
};

AppController.prototype.dataChangeAction = function(data) {

  var method = "set" + data.field.substr(0, 1).toUpperCase() + data.field.substr(1);
  this.addPageModel.getContact()[method](data.value);
};

AppController.prototype.navigateAction = function(url) {
  $.mobile.navigate(url);
};

AppController.prototype.validateDataAction = function() {
  console.log('ICI');
};

AppController.prototype.setHomePage = function(model) {
  this.homePageModel = model;
  this.homePageModelView = new HomePageView(model);
  this.findAllContactAction();
  this.listenHomePage();
  this.navigateAction(this.homePageModel.getUrl());
  return this;
};

AppController.prototype.setAddPage = function(model) {
  this.addPageModel = model;
  this.addPageModelView = new AddPageView(model);
  this.listenAddPage();
  return this;
};

AppController.prototype.setDetailPage = function(model) {
  this.detailPageModel = model;
  //this.detailPageModelView = new detailPageView(model);
  return this;
};

AppController.prototype.findAllContactAction = function() {
  this.contacts.forEach(function(contactJSON) {
    var contact = new Contact();
    contact.hydrate(contactJSON);
    this.homePageModel.addContact(contact);
  }, this);
};
