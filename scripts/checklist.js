(function (window) {
  'use strict';

  var App = window.App || {},
    $ = window.jQuery;

  function Row(coffeeOrder) {
    var $div = $('<div></div>', {
        'data-coffee-order': 'checkbox',
        'class': 'checkbox'
      }),

      $label = $('<label></label>'),

      $checkbox = $('<input></input>', {
        type: 'checkbox',
        value: coffeeOrder.emailAddress
      }),

      description = coffeeOrder.size + ' ';

    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]';

    $label.append($checkbox);
    $label.append(description);
    $div.append($label);
    this.$element = $div;
  }

  function CheckList(selector) {
    if (!selector) {
      throw new Error('No selector provided');
    }

    this.$element = $(selector);
    if (this.$element.length === 0) {
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  CheckList.prototype.addRow = function (coffeeOrder) {
    //Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);
    var rowElement = new Row(coffeeOrder);
    //Add the new row instamce's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    console.log("hell");
    this.$element
      .find('[value="' + email + '"]')
      .closest('[data-coffee-order="checkbox"]').remove();
  };

  CheckList.prototype.addClickHandler = function (fn) {
    this.$element.on('click', 'input', function (event) {
      var email = event.target.value;
      this.removeRow(email);
      fn(email);
    }.bind(this));
  }

  App.CheckList = CheckList;
  window.App = App;
}(window));
