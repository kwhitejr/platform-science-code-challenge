/* eslint-disable no-param-reassign */

/**
 *
 * @param {Array<ShipmentDestination>} shipmentDestinations - An array of ShipmentDestinations
 * @param {Array<Driver>} drivers - An array of Drivers
 *
 * @returns [{Number} totalScore, {Object} assignments]
 */
const match = (shipmentDestinations, drivers) => {
  // Generate priority lists for each destination and driver
  shipmentDestinations.forEach((destination) => {
    drivers.forEach((driver) => {
      destination.addDriver(driver);
    });
  });

  // Plain arrays of addresses and driver names for utility
  const addresses = shipmentDestinations.map((destination) => destination.address);
  const driverNames = drivers.map((driver) => driver.name);

  // Maps of priority lists
  const addressToDriversMap = shipmentDestinations.reduce((obj, destination) => {
    const { address, driversBySuitability } = destination;
    return {
      ...obj,
      [address]: driversBySuitability.values.map(({ value }) => value),
    };
  }, {});
  const driverToAddressesMap = drivers.reduce((obj, driver) => {
    const { name, addressToSuitabilityMap } = driver;
    return {
      ...obj,
      [name]: addressToSuitabilityMap,
    };
  }, {});

  // Stable Matching Algorithm
  let iterator = 0;
  const loop = (initialState) => {
    let preferences;
    while (iterator < addresses.length) {
      preferences = addresses.reduce((obj, address) => {
        if (obj[address]) {
          return obj;
        }
        const preferredDriver = addressToDriversMap[address][0];
        if (!obj[preferredDriver]) {
          obj[address] = preferredDriver;
          obj[preferredDriver] = address;
        } else {
          const currentAssignedAddress = obj[preferredDriver];
          const preferredAddressScore = driverToAddressesMap[preferredDriver][address];
          const currentAddressScore = driverToAddressesMap[preferredDriver][currentAssignedAddress];
          if (preferredAddressScore > currentAddressScore) {
            obj[currentAssignedAddress] = undefined;
            obj[address] = preferredDriver;
            obj[preferredDriver] = address;
          }
        }
        addressToDriversMap[address].shift();
        return obj;
      }, initialState);
      iterator += 1;
      loop(preferences);
    }
    return preferences;
  };
  const assignments = loop({});

  // Get total score from assignments
  const totalScore = Object.entries(assignments).reduce((total, assignment) => {
    const [key, value] = assignment;
    const score = driverToAddressesMap[key] ? driverToAddressesMap[key][value] : 0;
    total += score;
    return total;
  }, 0);

  // Clean up assignments (only keep shipment:driver entries)
  driverNames.forEach((name) => delete assignments[name]);
  return [totalScore, assignments];
};

module.exports = {
  match,
};
