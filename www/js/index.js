document.addEventListener('deviceready', function() {

  var contacts = [
    {picture: "img/contact.jpg", firstname: "Bob", lastname: "Eric", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {picture: "img/contact.jpg", firstname: "Marco", lastname: "Charlo", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {picture: "img/contact.jpg", firstname: "Martin", lastname: "Dubois", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {picture: "img/contact.jpg", firstname: "Robert", lastname: "Clampin", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {picture: "img/contact.jpg", firstname: "Antoine", lastname: "Obder", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {picture: "img/contact.jpg", firstname: "Paulo", lastname: "Prout", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"}
  ];

  // my logic app
  var appControler = new AppController(contacts);

  // page's models
  var homePage = new HomePage();
  var addPage = new AddPage();
  var detailPage = new DetailPage();

  // relation' MVC
  appControler.setHomePage(homePage);
  appControler.setAddPage(addPage);
  appControler.setDetailPage(detailPage);

});
