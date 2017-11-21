var data = {
    locations: [{
            Id: 1,
            Name: 'Tbilisi',
            ConnectedLocationIds: [2]
        },
        {
            Id: 2,
            Name: 'Rustavi',
            ConnectedLocationIds: [1]
        },
        {
            Id: 3,
            Name: 'Batumi',
            ConnectedLocationIds: [4, 5]
        },
        {
            Id: 4,
            Name: 'Kobuleti',
            ConnectedLocationIds: [3, 6]
        },
        {
            Id: 5,
            Name: 'Poti',
            ConnectedLocationIds: [3]
        },
        {
            Id: 6,
            Name: 'Ureki',
            ConnectedLocationIds: [4]
        },
    ]
}

/**
 * @param  {Object} locationData
 * @param  {Integer} firstId
 * @param  {Integer} secondId
 */
function checkConnected(locationData, firstId, secondId) {

    //get first location object by ID if exists
    var firstLocation = locationData.locations.filter(function (location) {
        return location.Id == firstId
    });
    // get connected locations
    var firstLocationIds = firstLocation.length ? firstLocation[0]['ConnectedLocationIds'] : [];

    var passedCities = [firstId];
    var result = false;

    var check = function (firstId, lastId) {

        var connectedLocations = locationData.locations.filter(function (loc) {
            return loc.Id == firstId;
        });

        var connectedLocationIds = connectedLocations.length ? connectedLocations[0]['ConnectedLocationIds'] : []; // get connected locations 

        connectedLocationIds.forEach(function (childId) {

            if (!passedCities.includes(childId) && !result) { // if is not passed & if target was not found

                passedCities.push(childId); // make city passed

                if (childId != lastId) { // if is not target location
                    check(childId, lastId); // try again
                } else {
                    result = true; // done
                }
            }

        });
    }

    check(firstId, secondId); // run

    console.log('Route: ', passedCities.join(' => ')) // log passed cities

    return result;

}

console.log('Result: ', checkConnected(data, 5, 6)) // log result
