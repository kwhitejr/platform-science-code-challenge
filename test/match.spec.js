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
      expect(totalScore).to.equal(8);
    });

    it('should return the assignments that result in the highest total score', () => {
      const shipmentDestinations = [
        new ShipmentDestination({ address: 'court' }),
        new ShipmentDestination({ address: 'streets' }),
        new ShipmentDestination({ address: 'avenue' }),
      ];
      const drivers = [
        new Driver({ name: 'Kevin' }),
        new Driver({ name: 'Amanda' }),
        new Driver({ name: 'Keihanaikukauakahihuliheekahaunaele' }),
      ];

      const [totalScore, assignments] = match(shipmentDestinations, drivers);

      expect(totalScore).to.equal(39); // 31.5 + 4.5 + 3
      expect(assignments).to.deep.equal({
        court: 'kevin',
        streets: 'amanda',
        avenue: 'keihanaikukauakahihuliheekahaunaele',
      });
    });
  });
});
