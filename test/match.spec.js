const { expect } = require('chai');
const { match } = require('../src/match');
const ShipmentDestination = require('../src/ShipmentDestination');
const Driver = require('../src/Driver');

describe('match.js', () => {
  describe('match()', () => {
    it('should return the total suitability score for a set of ShipmentDestinations and Drivers', () => {
      const shipmentDestinations = [
        new ShipmentDestination({ address: 'court' }),
        new ShipmentDestination({ address: 'street' }),
      ];
      const drivers = [
        new Driver({ name: 'Kevin' }),
        new Driver({ name: 'Rudolph' }),
      ];
      const [totalScore] = match(shipmentDestinations, drivers);
      expect(totalScore).to.equal(0);
    });
  });
});
