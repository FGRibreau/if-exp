'use strict';

var t = require('chai').assert;
var iff = require('../');

describe('iff', function () {
  var isNewCustomer,
    hasCustomerUpsell,
    hasCustomerDowngraded,
    email = 'email@domain.tld',
    NEW_CUSTOMER = 'You\'ve got a new customer!',
    UPSELL = '{email} upgraded its subscription!',
    DOWNGRADE = 'Oops, {email} downgraded its subscription',
    DEFAULT = 'You\'ve just received a new payment';

  beforeEach(function () {
    isNewCustomer = false;
    hasCustomerUpsell = false;
    hasCustomerDowngraded = false;
  });

  function test(result) {
    t.strictEqual(iff(isNewCustomer)
      .then(NEW_CUSTOMER)
      .elseIff(hasCustomerUpsell)
      .then(UPSELL)
      .elseIff(hasCustomerDowngraded)
      .then(DOWNGRADE)
      .otherwise(DEFAULT), result);
  }

  it('should yield DEFAULT', function () {
    t.strictEqual(iff(false).then(NEW_CUSTOMER).otherwise(DEFAULT), DEFAULT);
  });


  it('should yield DEFAULT', function () {
    test(DEFAULT);
  });

  it('should yield NEW_CUSTOMER', function () {
    t.strictEqual(iff(true).then(NEW_CUSTOMER).otherwise(DEFAULT), NEW_CUSTOMER);
  });

  it('should yield NEW_CUSTOMER', function () {
    isNewCustomer = true;
    test(NEW_CUSTOMER);
  });

  it('should yield UPSELL', function () {
    hasCustomerUpsell = true;
    test(UPSELL);
  });

  it('should yield DOWNGRADE', function () {
    hasCustomerDowngraded = true;
    test(DOWNGRADE);
  });

  describe('lazy condition evaluation', function() {
    function SHOULD_NOT_BE_CALLED(){throw new Error('SHOULD NOT BE CALLED');}
    function FALSE(){return false;}
    function TRUE(){return true;}

    it('should support function as conditional predicate', function(){
      t.strictEqual(iff(FALSE).then(1).otherwise(2), 2);
      t.strictEqual(iff(TRUE).then(1).otherwise(2), 1);
    });

    it('should not call the next conditional predicates if a conditional was true', function(){
      t.strictEqual(iff(TRUE).then(1).elseIff(SHOULD_NOT_BE_CALLED).then(2).otherwise(3), 1);
      t.strictEqual(iff(FALSE).then(1).elseIff(TRUE).then(2).elseIff(SHOULD_NOT_BE_CALLED).then(3).otherwise(4), 2);
    });
  });
});
