const Driver = require('./Driver');
const ShipmentDestination = require('./ShipmentDestination');

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
    assignments[destination.address] = destination.driversBySuitability.values[0];
  });

  // set each assignment to highest scored driver
  Object.entries(assignments).filter((address) => {

  });
  shipmentDestinations.forEach((destination) => {
    assignments[destination.address] = destination.driversBySuitability.values[0];
  });
  console.log(assignments);

  // if a driver is repeated, retain the highest score, dequeue others

  // console.log(assignments);
  // console.log(driverMegaList);

  // drivers.forEach((driver, index) => {
  //   console.log(driver.name);
  //   console.log(driver.addressesByHighestScore);
  //   assignments;
  // });

  const totalScore = 0;
  return [totalScore, assignments];
};

module.exports = {
  match,
};
