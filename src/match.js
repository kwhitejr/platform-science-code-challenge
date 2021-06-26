/**
 *
 * @param {Array<ShipmentDestination>} shipmentDestinations - An array of ShipmentDestinations
 * @param {Array<Driver>} drivers - An array of Drivers
 *
 * @returns [{Number} totalSuitability, {Object} assignments]
 */
const match = (shipmentDestinations, drivers) => {
  const assignments = {};

  // Generate priority lists for each destination and driver
  shipmentDestinations.forEach((destination) => {
    drivers.forEach((driver) => {
      destination.addDriver(driver);
    });
    // set highest score to each assignment
    assignments[destination.address] = destination.driversBySuitability.values[0]; // eslint-disable-line
  });

  // Need to...
  // 1. determine which top-scoring drivers are duplicates
  // 2. keep duplicate with highest score
  // 3. assign next highest score for other duplicates
  // 4. repeat until no duplicates

  const totalScore = Object.values(assignments).reduce((total, assignment) => total + assignment.priority, 0);
  return [totalScore, assignments];
};

module.exports = {
  match,
};
