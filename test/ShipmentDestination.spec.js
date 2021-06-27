const { expect } = require('chai');
const ShipmentDestination = require('../src/ShipmentDestination');
const Driver = require('../src/Driver');

describe('ShipmentDestination', () => {
  describe('constructor', () => {
    it('should initialize with given and calculated properties', () => {
      const address = '123 Sesame Street';
      const shipmentDestination = new ShipmentDestination({ address });
      expect(shipmentDestination.address).to.equal(address);
      expect(shipmentDestination.addressLength).to.equal(address.length); // length == 17
      expect(shipmentDestination.isAddressLengthEven).to.equal(false); // length == 17
      expect(shipmentDestination.driversBySuitability.values).to.deep.equal([]);
    });
  });

  describe('calcDriverSuitabilityScore() method', () => {
    it('should return the correct score when the length of the destination street is even', () => {
      const name = 'kevin';
      const driver = new Driver({ name });

      const address = 'lane'; // even
      const shipmentDestination = new ShipmentDestination({ address });
      const score = shipmentDestination.calcDriverSuitabilityScore(driver);
      expect(score).to.equal(3);
    });

    it('should return the correct score when the length of the destination street is odd', () => {
      const name = 'kevin';
      const driver = new Driver({ name });

      const address = 'ave'; // even
      const shipmentDestination = new ShipmentDestination({ address });
      const score = shipmentDestination.calcDriverSuitabilityScore(driver);
      expect(score).to.equal(3);
    });

    it('should return the correct score with a 1.5 multiplier when the length of the destination and driver name are equal (even)', () => {
      const name = 'rudiee'; // even, length 6, vowels 4
      const driver = new Driver({ name });

      const address = 'street'; // even, length 6
      const shipmentDestination = new ShipmentDestination({ address });
      const score = shipmentDestination.calcDriverSuitabilityScore(driver);
      expect(score).to.equal(9); // 4 * 1.5 * 1.5
    });

    it('should return the correct score with a 1.5 multiplier when the length of the destination and driver name are equal (odd)', () => {
      const name = 'kevin'; // odd, length 5, 3 consonants
      const driver = new Driver({ name });

      const address = 'court'; // odd, length 5
      const shipmentDestination = new ShipmentDestination({ address });
      const score = shipmentDestination.calcDriverSuitabilityScore(driver);
      expect(score).to.equal(4.5); // 3 * 1 * 1.5
    });
  });

  describe('calcEvenScore() method', () => {
    it('should return the correct score for the even algorithm', () => {
      const name = 'Kevin'; // 2 vowels
      const address = 'lane'; // even
      const shipmentDestination = new ShipmentDestination({ address });
      const suitabilityScore = shipmentDestination.calcEvenScore(name);
      expect(suitabilityScore).to.equal(3); // 2 vowels * 1.5
    });

    it('should handle Hawaiian names', () => {
      const name = 'Keihanaikukauakahihuliheekahaunaele';
      const address = 'lane'; // even
      const shipmentDestination = new ShipmentDestination({ address });
      const suitabilityScore = shipmentDestination.calcEvenScore(name);
      expect(suitabilityScore).to.equal(31.5);
    });
  });

  describe('calcOddScore() method', () => {
    it('should return the correct score for the odd algorithm', () => {
      const name = 'Joseph'; // 4 consonants
      const address = 'court'; // odd
      const shipmentDestination = new ShipmentDestination({ address });
      const suitabilityScore = shipmentDestination.calcOddScore(name);
      expect(suitabilityScore).to.equal(4);
    });
  });

  describe('addDriver() method', () => {
    it('should enqueue drivers by suitability score', () => {
      const address = '123 Sesame Street'; // odd length
      const driver1 = new Driver({ name: 'Freddie' }); // 4 consonants
      const driver2 = new Driver({ name: 'Steve' }); // 3 consonants
      const shipmentDestination = new ShipmentDestination({ address });
      shipmentDestination.addDriver(driver1);
      shipmentDestination.addDriver(driver2);
      expect(shipmentDestination.driversBySuitability.values).to.deep.equal([
        { value: 'freddie', priority: 4 },
        { value: 'steve', priority: 3 },
      ]);
    });

    it('should enqueue drivers by suitability score', () => {
      const address = '123 Sesame Street'; // odd length
      const driver = new Driver({ name: 'Freddie' }); // 4 consonants
      const shipmentDestination = new ShipmentDestination({ address });
      shipmentDestination.addDriver(driver);
      expect(driver.addressToSuitabilityMap[address]).to.equal(4);
    });
  });
});
