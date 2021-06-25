const PriorityQueue = require('./PriorityQueue');

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
    this.addressesByHighestScore = new PriorityQueue();
  }

  /**
   * Adds new address-to-suitability score pair
   * @param {Object} addressToSuitability - e.g. { 'sesame street': 8.5 }
   */
  setSuitability(addressToSuitability) {
    this.addressToSuitabilityMap = { ...this.addressToSuitabilityMap, ...addressToSuitability };
  }
}

module.exports = Driver;
