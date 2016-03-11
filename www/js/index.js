document.addEventListener('deviceready', function() {

  // my logic app
  var appControler = new AppController();

  // page's models
  var homePage = new HomePage();
  var addPage = new AddPage();
  var detailPage = new DetailPage();

  // relation' MVC
  appControler.setHomePage(homePage);
  appControler.setAddPage(addPage);
  appControler.setDetailPage(detailPage);

});
