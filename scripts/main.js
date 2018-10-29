/*global console */

(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]',
    CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]',

    App = window.App,
    Truck = App.Truck,
    DataStore = App.DataStore,
    FormHandler = App.FormHandler,
    CheckList = App.CheckList,
    Validation = App.Validation,
    myTruck = new Truck('ncc-1701', new DataStore()),
    checkList = new CheckList(CHECKLIST_SELECTOR),
    formHandler = new FormHandler(FORM_SELECTOR),
    webshim = window.webshim;

  window.myTruck = myTruck;

  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));

  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  formHandler.addInputHandler(Validation.isCompanyEmail);
  window.myTruck = myTruck;
  webshim.polyfill('forms forms-ext');
  webshim.setOptions('forms', {
    addValidators: true,
    lazyCustomMessages: true
  });

}(window));
