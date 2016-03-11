function AppController(contacts) {

  // TODO : remove contacts and use database
  //this.contacts = contacts;

}

AppController.prototype.listenHomePage = function() {
  this.homePageModelView.on('DETAIL_PAGE', this.showDetailAction.bind(this));
};

AppController.prototype.listenAddPage = function() {
  this.addPageModelView.on('CANCEL', this.navigateAction.bind(this));
  this.addPageModelView.on('NEED_VALIDATION', this.validateDataAction.bind(this));
  this.addPageModelView.on('DATA_FIRSTNAME_CHANGE', this.dataChangeAction.bind(this));
  this.addPageModelView.on('DATA_LASTNAME_CHANGE', this.dataChangeAction.bind(this));
  this.addPageModelView.on('DATA_TEL_CHANGE', this.dataChangeAction.bind(this));
  this.addPageModelView.on('DATA_MAIL_CHANGE', this.dataChangeAction.bind(this));
  this.addPageModelView.on('DATA_BIRTHDATE_CHANGE', this.dataChangeAction.bind(this));
};

AppController.prototype.listenDetailPage = function() {
  this.detailPageModelView.on('EDIT_ACTION', this.contactEditAction.bind(this));
  this.detailPageModelView.on('DELETE_ACTION', this.contactDeleteAction.bind(this));
};

AppController.prototype.contactEditAction = function(contact) {
  // update contact to addPageModel
  this.addPageModel.setContact(contact);
  // naviguate to view addPageView
  this.navigateAction(this.addPageModel.getUrl());
};

AppController.prototype.contactDeleteAction = function(contact) {
  // delete contact to homePageModel
  this.homePageModel.removeContact(contact);
  // naviguate to view homePageView
  this.navigateAction(this.homePageModel.getUrl());
};


AppController.prototype.showDetailAction = function(contact) {
  // change the value of the contact to detailPageModel
  this.detailPageModel.setContact(contact);
  // navigate to detailPageModelView
  this.navigateAction(this.detailPageModel.getUrl());
};

AppController.prototype.dataChangeAction = function(data) {
  var method = "set" + data.field;
  if(this.addPageModel.getContact()[method]) {
    this.addPageModel.getContact()[method](data.value);
  }
};

AppController.prototype.navigateAction = function(url) {
  $.mobile.navigate(url);
};

AppController.prototype.validateDataAction = function() {
  // check if the contact to persist is valid
  if(this.addPageModel.getContact().isValid()) {
    // persist the contact to the database
    this.navigateAction(this.homePageModel.getUrl());
    var contact = this.addPageModel.getContact();
    this.homePageModel.addContact(contact);
  } else {

  }
};

AppController.prototype.setHomePage = function(model) {
  this.homePageModel = model;
  this.homePageModelView = new HomePageView(model);
  //this.findAllContactAction();
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
  this.detailPageModelView = new DetailPageView(model);
  this.listenDetailPage();
  return this;
};

AppController.prototype.findAllContactAction = function() {
  this.contacts.forEach(function(contactJSON) {
    var contact = new Contact();
    contact.hydrate(contactJSON);
    this.homePageModel.addContact(contact);
  }, this);
};
