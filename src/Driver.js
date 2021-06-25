/**
 * @param {String} name - The name of the driver.
 * @param {Object} addressToSuitabilityMap - A key:value hashmap where key is the address {String} and value is the suitability score {Number}
 *
 * @returns {Driver}
 */
class Driver {
  constructor({ name }) {
    this.name = name.toLowerCase();
    this.addressToSuitabilityMap = {};
  }
}

module.exports = Driver;
