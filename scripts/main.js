(function (window) {
  'use strict';
  var App = window.App,
    Truck = App.Truck,
    DataStore = App.DataStore,
    myTruck = new Truck('ncc-1701', new DataStore());

  window.myTruck = myTruck;
}(window));
