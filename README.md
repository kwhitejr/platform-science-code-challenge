# Platform Science Code Challenge
Optimize driver-to-destination suitability.

## Usage
Environment requirements:
* node:14.x
* npm:6.x.x

From command line:
```bash
# Install Dependencies
$ npm install && npm test

or

$ npm run rudie-i-got-you-bro

# Run with test inputs
$ npm start -- --destinations-file="../test/shipmentDestinations.txt" --drivers-file="../test/drivers.txt"

# Run with custom inputs
$ npm start -- --destinations-file="PATH_TO_FILE" --drivers-file="PATH_TO_FILE"
```

## Mea Culpa
I was not able to completely resolve the necessary algorithm.

I can correctly resolve the driver scores and therefore their priority vis-a-vis the addresses, and the priority of each address vis-a-vis each driver, but I had trouble traversing these priority queues to correctly determine the optimal assignments without assigning a driver more than once.

I have a feeling that it has something to do with Stable Marriage Problem and the Gale-Shapley algorithm, but I haven't sorted out a Javascript implementation yet.

There is a single breaking test that should pass when the `match` algorithm is correctly implemented.

## Problem Statement
Our sales team has just struck a deal with Acme Inc to become the exclusive provider for routing their product shipments via 3rd party trucking fleets. The catch is that we can only route one shipment to one driver per day.

Each day we get the list of shipment destinations that are available for us to offer to drivers in our network. Fortunately our team of highly trained data scientists have developed a mathematical model for determining which drivers are best suited to deliver each shipment.

With that hard work done, now all we have to do is implement a program that assigns each shipment destination to a given driver while maximizing the total suitability of all shipments to all drivers.

The top-secret algorithm is:
* If the length of the shipment's destination street name is even, the base suitability score (SS) is the number of vowels in the driver’s name multiplied by 1.5.
* If the length of the shipment's destination street name is odd, the base SS is the number of consonants in the driver’s name multiplied by 1.
* If the length of the shipment's destination street name shares any common factors (besides 1) with the length of the driver’s name, the SS is increased by 50% above the base SS.

Write an application in the language of your choice that assigns shipment destinations to drivers in a way that maximizes the total SS over the set of drivers. Each driver can only have one shipment and each shipment can only be offered to one driver. Your program should run on the command line and take as input two newline separated files, the first containing the street addresses of the shipment destinations and the second containing the names of the drivers. The output should be the total SS and a matching between shipment destinations and drivers. You do not need to worry about malformed input, but you should certainly handle both upper and lower case names.