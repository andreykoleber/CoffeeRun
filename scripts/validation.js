/*global window*/
(function (window) {
  'use strict';
  var App = window.App || {},
    Validation = {
      isCompanyEmail: function (email) {
        return (/.+@upnest\.com$/).test(email);
      }
    };

  App.Validation = Validation;
  window.App = App;
}(window));
