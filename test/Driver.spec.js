const { expect } = require('chai');
const Driver = require('../src/Driver');

describe('Driver', () => {
  describe('constructor', () => {
    it('should initialize with given and calculated properties', () => {
      const name = 'KEVin';
      const driver = new Driver({ name });
      expect(driver.name).to.equal('kevin'); // lowercased
      expect(driver.addressToSuitabilityMap).to.deep.equal({});
      expect(driver.addressesByHighestScore.values).to.deep.equal([]);
    });
  });

  describe('setSuitability() method', () => {
    it('should set address to suitability score on the addressToSuitabilityMap property', () => {
      const name = 'KEVin';
      const driver = new Driver({ name });
      driver.setSuitability({ 'some-address': 5 });
      expect(driver.addressToSuitabilityMap['some-address']).to.equal(5);
    });
  });
});
