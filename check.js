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

function checkConnected(locationData, firstId, secondId){
    //get first location object by ID if exists
    var firstLocation = locationData.locations.filter(function(location){ return location.Id == firstId });
    // get connected locations
    var firstLocationIds = firstLocation.length ? firstLocation[0]['ConnectedLocationIds'] : [];
    
    // check one way
    var checkOne = firstLocationIds.includes(secondId);
    
    if(checkOne){
      return true;
    }
    
    // check two ways
    var checkTwo = locationData.locations.filter(function(location){
        // where ConnectedLocationIds includes second location
        return location.ConnectedLocationIds.includes(secondId);  
    }).filter(function(location){
        return firstLocation[0]['ConnectedLocationIds'].includes(location.Id);
    });
    
    return checkTwo.length ? true : false;
}

console.log(checkConnected(data,3,5));




