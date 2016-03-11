function DetailPageView(model) {

  EventEmitter.call(this);
  this.model = model;
  this.listen();
  this.renderHtml();
  this.attachEvent();

}

DetailPageView.prototype = Object.create(EventEmitter.prototype);
DetailPageView.prototype.constructor = DetailPageView;

DetailPageView.prototype.attachEvent = function() {
  this.htmlEltActionEdit.click(function() {
    this.emit('EDIT_ACTION', this.model.getContact());
  }.bind(this));

  this.htmlEltActionDelete.click(function() {
    this.emit('DELETE_ACTION', this.model.getContact());
  }.bind(this));
};

DetailPageView.prototype.listen = function() {
  this.model.on('CONTACT_CHANGE', this.displayAction.bind(this));
};

DetailPageView.prototype.displayAction= function() {
  this.htmlEltTitle.html(this.model.getTitle());
  this.htmlEltContactName.html(this.model.getContact().getFullName());
  this.htmlEltContactTel.html(this.model.getContact().getTel());
  this.htmlEltContactMail.html(this.model.getContact().getMail());
  this.htmlEltContactBirthDate.html(this.model.getContact().getBirthDateFr());
  // picture manage
  this.htmlEltPicture
      .attr('src', this.model.getContact().getPicture())
      .attr('alt', this.model.getContact().getFullName());
};

DetailPageView.prototype.renderHtml = function() {

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
  var eltFooter = this.renderHtmlFooter();
  eltPage.append(eltFooter);

  // add to body
  $('body').append(eltPage);

  // jquery mobile pagification
  eltPage.page();

};

DetailPageView.prototype.renderHtmlPopup = function() {
  var eltPopup = $('<div>')
      .attr('data-role', 'popup')
      .attr('id', 'popup-action');

  var eltListView = $('<div>')
      .attr('data-role', 'listview')
      .appendTo(eltPopup);

  var eltHead = $('<li>')
      .attr('data-role', 'list-divider')
      .html('Action ...')
      .appendTo(eltListView);

  var eltLi1 = $('<li>')
      .attr('data-icon', 'edit')
      .appendTo(eltListView);
  this.htmlEltActionEdit = $('<a>')
      .attr('href', '#')
      .html('Modifier')
      .appendTo(eltLi1);

  var eltLi2 = $('<li>')
      .attr('data-icon', 'delete')
      .appendTo(eltListView);
  this.htmlEltActionDelete = $('<a>')
      .attr('href', '#popupDialog')
      .attr('data-rel', 'popup')
      .attr('data-position-to', 'window')
      .attr('data-transition', 'pop')
      .html('Supprimer')
      .appendTo(eltLi2);

  //eltLi2.append(this.renderHtmlPopupDelete());

  return eltPopup;
};

DetailPageView.prototype.renderHtmlPopupDelete = function() {
  var eltConfirm = $('<div>')
      .attr('data-role', 'popup')
      .attr('id', 'popupDialog')
      .attr('data-overlay-theme', 'b')
      .attr('data-theme', 'b')
      .attr('data-dismissible', 'false');

  var header = $('<div>')
      .attr('data-role', 'header')
      .appendTo(eltConfirm);

  var h1 = $('<h1>')
      .html('Etes vous sûre de vouloir supprimer ce contact ?')
      .appendTo(header);

  var main = $('<div>')
      .attr('role', 'main')
      .addClass('ui-content')
      .appendTo(eltConfirm);

  this.htmlEltBtnNo = $('<a>')
      .attr('href', '#')
      .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline')
      .attr('data-rel', 'back')
      .html('Non')
      .appendTo(main);

  this.htmlEltBtnYes = $('<a>')
      .attr('href', '#')
      .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline')
      .html('Oui')
      .appendTo(main);

  return eltConfirm;
};

DetailPageView.prototype.renderHtmlFooter = function() {
  var eltFooter = $('<div>')
      .addClass('align-right')
      .attr('data-role', 'footer')
      .attr('data-position', 'fixed');

  var btnAction = $('<a>')
      .attr('href', '#popup-action')
      .attr('data-rel', 'popup')
      .attr('data-transition', 'pop')
      .addClass('ui-btn ui-corner-all ui-shadow ui-btn-inline ui-icon-bars ui-btn-icon-left')
      .html('Action...')
      .appendTo(eltFooter);

  eltFooter.append(this.renderHtmlPopup());

  return eltFooter;
};

DetailPageView.prototype.renderHtmlHeader = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'header');

  // title of the page
  this.htmlEltTitle = $('<h1>')
      .html(this.model.getTitle())
      .appendTo(eltMain);

  // button to back to home
  this.htmlEltBackBtn = $('<a>')
      .attr('id', 'page-home')
      .attr('href', '#page-home')
      .attr('data-icon', 'back')
      .addClass('ui-btn-right')
      .html('Annuler')
      .appendTo(eltMain);

  return eltMain;
};

DetailPageView.prototype.renderHtmlContent = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'ui-content');

  var eltBlock = $('<div>')
      .addClass('ui-grid-a')
      .appendTo(eltMain);

  var blockA = $('<div>')
      .addClass('ui-block-a')
      .appendTo(eltBlock);

  this.htmlEltPicture = $('<img>')
      .addClass('picture-detail')
      .attr('src', this.model.getContact().getPicture())
      .attr('alt', this.model.getContact().getFullName())
      .appendTo(blockA);

  var blockB = $('<div>')
      .addClass('ui-block-b')
      .appendTo(eltBlock);

  this.htmlEltContactName = $('<h2>')
      .html(this.model.getContact().getFullName())
      .appendTo(blockB);

  this.htmlEltContactTel = $('<div>')
      .html(this.model.getContact().getTel())
      .appendTo(blockB);

  this.htmlEltContactMail = $('<div>')
      .html(this.model.getContact().getMail())
      .appendTo(blockB);

  this.htmlEltContactBirthDate = $('<div>')
      .html(this.model.getContact().getBirthDate())
      .appendTo(blockB);

  return eltMain;
};