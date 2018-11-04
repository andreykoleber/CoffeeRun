/*global window, console */
(function (window) {
  'use strict';

  var App = window.App || {};

  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }

  Truck.prototype.createOrder = function (order) {
    return this.db.add(order.emailAddress, order);
  };

  Truck.prototype.deliverOrder = function (customerId) {
    return this.db.remove(customerId);
  };

  Truck.prototype.printOrders = function (printFn) {
    return this.db.getAll()
      .then(function (orders) {
        var customerIdArray = Object.keys(orders);
        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
          console.log(orders[id]);
          if (printFn) {
            printFn(orders[id]);
          }
        }.bind(this));
      }.bind(this));
  };

  App.Truck = Truck;
  window.App = App;

}(window));
