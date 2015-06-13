'use strict';

var t = require('chai').assert;
var iff = require('./');

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
});
