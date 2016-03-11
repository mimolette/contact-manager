function HomePageView(model) {

  EventEmitter.call(this);
  this.model = model;
  this.listen();
  this.renderHtml();

}

HomePageView.prototype = Object.create(EventEmitter.prototype);
HomePageView.prototype.constructor = HomePageView;

HomePageView.prototype.listen = function() {

  this.model.on('CONTACTS_CHANGE', this.displayContactAction.bind(this));

};

HomePageView.prototype.displayContactAction = function(contact) {
  // if it's the first contact added
  if(!this.htmlEltListContacts) {
    this.htmlEltListContacts = $('<ul>')
        .attr('data-role', 'listview')
        .attr('data-insert', 'true')
        .appendTo(this.htmlEltContent)
        .listview();

    // remove the <p>
    this.htmlEltNoContact.css('display', 'none');
  }

  //console.log(contact.getFirstname());
  var elt = $('<li>');
  var eltA = $('<a>')
      .appendTo(elt)
      .html(contact.getFirstname())
      .attr('href', '#');

  this.htmlEltListContacts.append(elt);
  this.htmlEltListContacts.listview( "refresh" );
};

HomePageView.prototype.renderHtml = function() {

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

HomePageView.prototype.renderHtmlHeader = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'header');

  // title of the page
  this.htmlEltTitle = $('<h1>')
      .html(this.model.getTitle())
      .appendTo(eltMain);

  // button to add Contact
  this.htmlEltAddBtn = $('<a>')
      .attr('id', 'page-add')
      .attr('href', '#page-add')
      .attr('data-icon', 'plus')
      .addClass('ui-btn-right')
      .html('Ajouter')
      .appendTo(eltMain);

  return eltMain;
};

HomePageView.prototype.renderHtmlContent = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'ui-content');


  var contacts = this.model.getContacts();

  if (contacts.length) {
    this.htmlEltListContacts = $('<ul>')
        .attr('data-role', 'listview')
        .attr('data-insert', 'true')
        .appendTo(eltMain);

    contacts.forEach(function(contact) {
      var elt = $('<li>');
      var eltA = $('<a>')
          .appendTo(elt)
          .html(contact.getFirstname())
          .attr('href', '#');
      elt.appendTo(this.htmlEltListContacts);
    }, this);
  } else {
    this.htmlEltNoContact = $('<p>')
        .html('Aucun contact ...')
        .appendTo(eltMain);
  }

  return eltMain;
};