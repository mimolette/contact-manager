document.addEventListener('deviceready', function() {

  var contacts = [
    {firstname: "Bob", lastname: "Eric", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {firstname: "Marco", lastname: "Charlo", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {firstname: "Martin", lastname: "Dubois", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {firstname: "Robert", lastname: "Clampin", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {firstname: "Antoine", lastname: "Obder", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
    {firstname: "Paulo", lastname: "Prout", tel:"0678586963", mail:"test@free.fr", dn:"1972-08-12"},
  ];

  // my logic app
  var appControler = new AppController(contacts);

  // page's models
  var homePage = new HomePage();
  var addPage = new AddPage();

  // relation' MVC
  appControler.setHomePage(homePage);
  appControler.setAddPage(addPage);

});
