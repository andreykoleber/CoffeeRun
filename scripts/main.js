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
    myTruck = new Truck('ncc-1701', new DataStore()),
    checkList = new CheckList(CHECKLIST_SELECTOR),
    formHandler = new FormHandler(FORM_SELECTOR);

  window.myTruck = myTruck;
  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  });

  window.myTruck = myTruck;
}(window));
