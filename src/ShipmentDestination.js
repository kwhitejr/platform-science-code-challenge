const PriorityQueue = require('./PriorityQueue');

class ShipmentDestination {
  constructor({ address }) {
    this.address = address;
    this.driversBySuitability = new PriorityQueue();

    this.addressLength = this.address.length;
    this.isAddressLengthEven = this.addressLength % 2 === 0;
  }

  addDriver(driver) {
    // Calculate suitability score
    const suitabilityScore = this.calcDriverSuitabilityScore(driver);

    // Update Driver hashmap and add Driver to ShipmentDestination's priority queue
    driver.setSuitability({ [this.address]: suitabilityScore });
    driver.addressesByHighestScore.enqueue(this.address, suitabilityScore);
    this.driversBySuitability.enqueue(driver.name, driver.addressToSuitabilityMap[this.address]);
  }

  calcDriverSuitabilityScore(driver) {
    const { name } = driver;
    let score;
    if (this.isAddressLengthEven) {
      score = this.calcEvenScore(name);
    } else {
      score = this.calcOddScore(name);
    }

    if (this.addressLength === name.length) score *= 1.5;
    return score;
  }

  calcEvenScore(name) {
    const vowelsInName = name.split('')
      .filter((letter) => ['a', 'e', 'i', 'o', 'u'].includes(letter))
      .length;
    return vowelsInName * 1.5;
  }

  calcOddScore(name) {
    const consonantsInName = name.split('')
      .filter((letter) => !['a', 'e', 'i', 'o', 'u'].includes(letter))
      .length;
    return consonantsInName;
  }
}

module.exports = ShipmentDestination;
