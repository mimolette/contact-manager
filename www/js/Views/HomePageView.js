function HomePageView(model) {

  EventEmitter.call(this);
  this.model = model;
  this.listen();
  this.renderHtml();
  this.attachEvent();

}

HomePageView.prototype = Object.create(EventEmitter.prototype);
HomePageView.prototype.constructor = HomePageView;

HomePageView.prototype.listen = function() {

  this.model.on('CONTACTS_NEW', this.displayContactAction.bind(this));
  this.model.on('CONTACTS_REFRESH', this.displayRefreshAction.bind(this));

};

HomePageView.prototype.attachEvent = function() {
  this.htmlEltAddBtn.click(this.emit.bind(this, 'ADD_PAGE'));
  this.htmlEltSortBtnAsc.click(this.emit.bind(this, 'SORT_ASC'));
  this.htmlEltSortBtnDesc.click(this.emit.bind(this, 'SORT_DESC'));
};

HomePageView.prototype.renderContact = function(data) {
  var elt = $('<li>');
  var eltA = $('<a>')
      .appendTo(elt)
      .attr('href', '#');

  var picture = $('<img>')
      .attr('src', data.getPicture())
      .attr('alt', data.getFullName())
      .appendTo(eltA);

  var name = $('<h2>')
      .html(data.getFullName())
      .appendTo(eltA);

  var mail = $('<p>')
      .html(data.getMail())
      .appendTo(eltA);

  // attach event on click, emit to controller
  eltA.click(this.emit.bind(this, 'DETAIL_PAGE', data));

  return elt;
};

HomePageView.prototype.displayRefreshAction = function() {
  if(!this.htmlEltListContacts) {
    this.htmlEltListContacts = $('<ul>')
        .attr('data-role', 'listview')
        .attr('data-insert', 'true')
        .appendTo(this.htmlEltContent)
        .listview();

    // remove the <p>
    this.htmlEltNoContact.css('display', 'none');
  } else {
    this.htmlEltListContacts.html('');
  }

  var contacts = this.model.getContactDAO().getContacts();

  if (contacts.length) {
    contacts.forEach(function (contact) {
      this.htmlEltListContacts.append(this.renderContact(contact));
    }, this);
    this.htmlEltListContacts.listview( "refresh" );
  } else {
    this.htmlEltNoContact.css('display', 'block');
  }
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

  this.htmlEltListContacts.append(this.renderContact(contact));
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
      .attr('data-position', 'fixed');
  eltPage.append(eltFooter);

  var eltNavBar = $('<div>')
      .attr('data-role', 'navbar')
      .appendTo(eltFooter);

  var eltUl = $('<ul>')
      .appendTo(eltNavBar);

  var eltLi1 = $('<li>')
      .appendTo(eltUl);
  this.htmlEltSortBtnAsc = $('<a>')
      .attr('href', '#')
      .html('A..Z')
      .appendTo(eltLi1);

  var eltLi2 = $('<li>')
      .appendTo(eltUl);
  this.htmlEltSortBtnDesc = $('<a>')
      .attr('href', '#')
      .html('Z..A')
      .appendTo(eltLi2);

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
      .attr('href', '#')
      .attr('data-icon', 'plus')
      .addClass('ui-btn-right')
      .html('Ajouter')
      .appendTo(eltMain);

  return eltMain;
};

HomePageView.prototype.renderHtmlContent = function() {
  var eltMain = $('<div>')
      .attr('data-role', 'ui-content');


  var contacts = this.model.getContactDAO().getContacts();

  if (contacts.length) {
    this.htmlEltListContacts = $('<ul>')
        .attr('data-role', 'listview')
        .attr('data-insert', 'true')
        .appendTo(eltMain);

    contacts.forEach(function(contact) {
      this.htmlEltListContacts.append(this.renderContact(contact));
    }, this);
  } else {
    this.htmlEltNoContact = $('<p>')
        .html('Aucun contact ...')
        .appendTo(eltMain);
  }

  return eltMain;
};