/*global window*/

(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]',
    CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]',
    SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders',

    App = window.App,
    Truck = App.Truck,
    RemoteDataStore = App.RemoteDataStore,
    DataStore = App.DataStore,
    FormHandler = App.FormHandler,
    CheckList = App.CheckList,
    Validation = App.Validation,
    webshim = window.webshim,

    remoteDS = new RemoteDataStore(SERVER_URL),
    myTruck = new Truck('ncc-1701', remoteDS),
    checkList = new CheckList(CHECKLIST_SELECTOR),
    formHandler = new FormHandler(FORM_SELECTOR);

  window.myTruck = myTruck;
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () {
        checkList.addRow.call(checkList, data);
      });
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));
  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {
    addValidators: true,
    lazyCustomMessages: true
  });

}(window));
