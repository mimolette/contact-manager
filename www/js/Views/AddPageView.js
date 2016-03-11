function AddPageView(model) {

  EventEmitter.call(this);
  this.model = model;
  this.listen();
  this.renderHtml();
  this.attachEvent();

}

AddPageView.prototype = Object.create(EventEmitter.prototype);
AddPageView.prototype.constructor = AddPageView;

AddPageView.prototype.attachEvent = function() {
  this.htmlEltBtnCancel.click(function(e) {
    e.preventDefault();
    // emit event that the user want to cancel the contact add action
    this.emit('CANCEL', '#page-home');
  }.bind(this));

  this.htmlEltBtnValidate.click(function(e) {
    e.preventDefault();
    // emit event that want to add a contact
    this.emit('NEED_VALIDATION');
  }.bind(this));

  var fields = ['Firstname', 'Lastname', 'Tel', 'Mail', 'BirthDate'];

  this.htmlEltInputFirstname.change(function(e) {
    // emit event an input change
    this.emit('DATA_FIRSTNAME_CHANGE', { field : "firstname", value : $(e.target).val()});
  }.bind(this));
};

AddPageView.prototype.listen = function() {

};

AddPageView.prototype.renderHtml = function() {

  // elt page
  var eltPage = $('<div>')
      .attr('id', this.model.getId())
      .attr('data-role', 'page');

  // elt header
  var eltHeader = this.renderHtmlHeader();
  eltPage.append(eltHeader);

  // elt content
  this.htmlEltContent = this.renderHtmlContent();
  eltPage.append(this.htmlEltContent);

  // elt footer
  var eltFooter = $('<div>')
      .attr('data-role', 'footer')
      .attr('data-position', 'fixed')
      .html('footer content');
  eltPage.append(eltFooter);

  // add to body
  $('body').append(eltPage);

  // jquery mobile pagification
  eltPage.page();

};

AddPageView.prototype.renderHtmlHeader = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'header');

  // title of the page
  this.htmlEltTitle = $('<h1>')
      .html(this.model.getTitle())
      .appendTo(eltMain);

  // button to add Contact
  this.htmlEltBackBtn = $('<a>')
      .attr('id', 'page-home')
      .attr('href', '#page-home')
      .attr('data-icon', 'back')
      .addClass('ui-btn-right')
      .html('Annuler')
      .appendTo(eltMain);

  return eltMain;
};

AddPageView.prototype.renderHtmlContent = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'ui-content');

  var eltForm = $('<form>')
      .appendTo(eltMain);
  var eltListView = $('<ul>')
      .attr('data-role', 'listview')
      .appendTo(eltForm);

  // field firstname
  var eltLi1 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltLabelFirstname = $('<label>')
      .attr('for', 'contactFirstname')
      .html('Prénom :')
      .appendTo(eltLi1);
  this.htmlEltInputFirstname = $('<input type="text" name="contactFirstname">')
      .attr('id', 'contactFirstname')
      .attr('data-clear-btn', 'true')
      .val(this.model.getContact().getFirstname())
      .appendTo(eltLi1);

  // field lastname
  var eltLi2 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltLabelLastname = $('<label>')
      .attr('for', 'contactLastname')
      .html('Nom :')
      .appendTo(eltLi2);
  this.htmlEltInputLastname = $('<input type="text" name="contactLastname">')
      .attr('id', 'contactLastname')
      .attr('data-clear-btn', 'true')
      .val(this.model.getContact().getLastname())
      .appendTo(eltLi2);

  // field tel
  var eltLi3 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltLabelTel = $('<label>')
      .attr('for', 'contactTel')
      .html('Téléphone :')
      .appendTo(eltLi3);
  this.htmlEltInputTel = $('<input type="tel" name="contactTel">')
      .attr('id', 'contactTel')
      .attr('data-clear-btn', 'true')
      .val(this.model.getContact().getTel())
      .appendTo(eltLi3);

  // field mail
  var eltLi4 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltLabelMail = $('<label>')
      .attr('for', 'contactMail')
      .html('Mail :')
      .appendTo(eltLi4);
  this.htmlEltInputMail = $('<input type="email" name="contactMail">')
      .attr('id', 'contactMail')
      .attr('data-clear-btn', 'true')
      .val(this.model.getContact().getMail())
      .appendTo(eltLi4);

  // field birthDate
  var eltLi5 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltLabelBirthDate = $('<label>')
      .attr('for', 'contactBirthDate')
      .html('Date de naissance :')
      .appendTo(eltLi5);
  this.htmlEltInputBirthDate = $('<input type="date" name="contactBirthDate">')
      .attr('id', 'contactBirthDate')
      .attr('data-clear-btn', 'true')
      .val(this.model.getContact().getBirthDate())
      .appendTo(eltLi5);

  // Buttons
  var eltLi6 = $('<li>')
      .addClass('ui-field-contain')
      .appendTo(eltListView);
  var eltFieldset = $('<fieldset>')
      .addClass('ui-grid-a')
      .appendTo(eltLi6);
  this.htmlEltBtnCancel = $('<input type="submit">')
      .val('Annuler')
      .addClass('ui-block-a ui-btn ui-corner-all ui-btn-a')
      .appendTo(eltFieldset);
  this.htmlEltBtnValidate = $('<input type="submit">')
      .val('Ajouter')
      .addClass('ui-block-b ui-btn ui-corner-all ui-btn-a')
      .appendTo(eltFieldset);

  return eltMain;
};