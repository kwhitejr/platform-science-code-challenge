const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

const ShipmentDestination = require('./ShipmentDestination');
const Driver = require('./Driver');
const { match } = require('./match');

const destinationsFilePath = argv['destinations-file'];
const driversFilePath = argv['drivers-file'];

const shipmentDestinationStrings = fs.readFileSync(path.join(__dirname, destinationsFilePath), 'utf8').split('\n');
const driverStrings = fs.readFileSync(path.join(__dirname, driversFilePath), 'utf8').split('\n');

const shipmentDestinations = shipmentDestinationStrings.map((address) => new ShipmentDestination({ address }));
const drivers = driverStrings.map((name) => new Driver({ name }));

const [totalScore, assignments] = match(shipmentDestinations, drivers);
console.log(`TOTAL SCORE: ${totalScore}`);
console.log('Assignments: ', assignments);
