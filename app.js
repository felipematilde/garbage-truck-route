// I started from https://developer.mapquest.com/documentation/mapquest-js/v1.3/examples/directions-with-multiple-waypoints/

//The following data will be used everywhere
var binList = [] //List of all bins
var binWaypoints = [] //List of only those bins that comply with a certain garbage requirement
var initialScreenLatitude = -23.201186
var initialScreenLongitude = -45.869375
var initialScreenZoom = 15

var dctaEntranceGateLatitude = -23.206368
var dctaEntranceGateLongitude = -45.881676
var dctaExitGateLatitude = -23.206224
var dctaExitGateLongitude = -45.881520

/*
var preDefinedBinList = [
  [-23.204641, -45.876315, 10, true,'HTO'], //1-HTO
  [-23.201778, -45.875185, 20, false,'H8'], //2-H8
  [-23.200801, -45.874142, 15, true,'H23A'], //3-H23A
  [-23.200152, -45.873808, 80, true,'H22A'], //4-H22A
  [-23.199641, -45.872967, 90, false,'H17C'], //5-H17C
  [-23.199037, -45.872250, 75, true,'H17B'], //6-H17B
  [-23.196622, -45.872856, 75, false,'H25B'], //7-H25B
  [-23.196040, -45.871817, 30, false,'H25D'], //8-H25D
  [-23.200711, -45.869289, 40, false,'H27A'], //9-H27A
  [-23.200864, -45.872524, 60, false,'H19B'], //10-H19B
  [-23.196540, -45.867002, 60, true,'H9A'], //11-H9A
  [-23.200596, -45.865869, 70, true,'H30D'], //12-H30D
  [-23.204550, -45.864042, 90, true,'H12B'], //13-H12B
  [-23.204089, -45.865135, 80, true,'H11A'], //14-H11A
  [-23.202635, -45.869942, 10, false,'H21A'], //15-H21A
  [-23.202888, -45.871385, 20, false,'H18B'], //16-H18B
  [-23.200083, -45.869979, 25, false,'H27A'], //17-H27A
  [-23.203455, -45.870205, 30, true,'H18A'], //18-H18A
  [-23.205159, -45.868896, 100, true,'H10E'], //19-H10E
  [-23.203641, -45.868346, 100, true,'H30D'], //20-H30D
  [-23.199024, -45.870427, 78, true,'H27C'], //21-H27C
  [-23.197164, -45.868747, 60, false,'H25B'] //22-H25B
];*/

var preDefinedBinList = [
  [-23.204641, -45.876315, 100, true,'HTO'], //1-HTO
  [-23.201778, -45.875185, 100, false,'H8'], //2-H8
  [-23.200801, -45.874142, 100, true,'H23A'], //3-H23A
  [-23.200152, -45.873808, 100, true,'H22A'], //4-H22A
  [-23.199641, -45.872967, 100, false,'H17C'], //5-H17C
  [-23.199037, -45.872250, 100, true,'H17B'], //6-H17B
  [-23.196622, -45.872856, 100, false,'H25B'], //7-H25B
  [-23.196040, -45.871817, 100, false,'H25D'], //8-H25D
  [-23.200711, -45.869289, 100, false,'H27A'], //9-H27A
  [-23.200864, -45.872524, 100, false,'H19B'], //10-H19B
  [-23.196540, -45.867002, 100, true,'H9A'], //11-H9A
  [-23.200596, -45.865869, 100, true,'H30D'], //12-H30D
  [-23.204550, -45.864042, 100, true,'H12B'], //13-H12B
  [-23.204089, -45.865135, 100, true,'H11A'], //14-H11A
  [-23.202635, -45.869942, 100, false,'H21A'], //15-H21A
  [-23.202888, -45.871385, 100, false,'H18B'], //16-H18B
  [-23.200083, -45.869979, 100, false,'H27A'], //17-H27A
  [-23.203455, -45.870205, 100, true,'H18A'], //18-H18A
  [-23.205159, -45.868896, 100, true,'H10E'], //19-H10E
  [-23.203641, -45.868346, 100, true,'H30D'], //20-H30D
  [-23.199024, -45.870427, 100, true,'H27C'], //21-H27C
  [-23.197164, -45.868747, 100, false,'H25B'] //22-H25B
];

var mapLeafLet

window.onload = function() {
    L.mapquest.key = config.MY_API_TOKEN;

    ///*
    mapLeafLet = L.mapquest.map('mapId', {
        center: [initialScreenLatitude, initialScreenLongitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: initialScreenZoom
    });
    //*/

    preDefinedBinList.forEach(bin => {
      var binLatitude = bin[0]
      var binLongitude = bin[1]
      var binFillRate = bin[2]
      var isOrganicBin = bin[3]
      var binIdentification = bin[4]
      drawMarkerAt(binLatitude,binLongitude,binFillRate,isOrganicBin,binIdentification)
      binList.push(bin)
    })
}

function checkIfABinCompliesWithGarbageRequirementAndEventuallyAddItAsAWaypoint(binLatitude,binLongitude,binFillRate,isOrganicBin){
  if((isOrganicBin && binFillRate>20) || (!isOrganicBin && binFillRate>40)){
    binLatitudeAndLongitude = "".concat(binLatitude,",",binLongitude)
    binWaypoints.push(binLatitudeAndLongitude)
  }
}

function findRouteForWaypoints(event){
    event.preventDefault();
    L.mapquest.key = config.MY_API_TOKEN;

    binList.forEach(bin => {
      var binLatitude = bin[0]
      var binLongitude = bin[1]
      var binFillRate = bin[2]
      var isOrganicBin = bin[3]
      checkIfABinCompliesWithGarbageRequirementAndEventuallyAddItAsAWaypoint(binLatitude,binLongitude,binFillRate,isOrganicBin)
    })

    L.mapquest.directions().route({
      start: ''.concat(dctaEntranceGateLatitude,',',dctaEntranceGateLongitude),
      end: ''.concat(dctaExitGateLatitude,',',dctaExitGateLongitude),
      waypoints: binWaypoints,
      optimizeWaypoints: true,
      unit: 'k'
    },findRouteDistanceAndTimeCallbackFunction)

    function findRouteDistanceAndTimeCallbackFunction(error, response) {
      let STOP_TIME_s = 20;
    
      var directionsLayer = L.mapquest.directionsLayer({
        directionsResponse: response
      }).addTo(mapLeafLet);
      alert(`The distance is ${1000*response.route.distance}m`)
      alert(`The non-stop route time is ${response.route.time}s`)
      alert(`The stop time is ${STOP_TIME_s*binWaypoints.length}s`)
      alert(`The route total time is ${response.route.time + STOP_TIME_s*binWaypoints.length}s`)
      return mapLeafLet;
    }
}

function insertBin(event){
    event.preventDefault();

    // getting form data
    var binLatitude = parseFloat(document.getElementById("binLatitudeId").value);
    var binLongitude = parseFloat(document.getElementById("binLongitudeId").value);
    var binFillRate = parseFloat(document.getElementById("binFillRateId").value);
    var isOrganicBin = document.getElementById("isOrganicBinId").checked
    var binIdentification = document.getElementsByTagName("binIdentificationId").value;
    
    // run directions function
    drawMarkerAt(binLatitude, binLongitude,binFillRate,isOrganicBin,binIdentification);
    var bin = [binLatitude,binLongitude,binFillRate,isOrganicBin,binIdentification];
    binList.push(bin)
    alert(`Added new point!`)

    // reset form
    document.getElementById("insertBinFormId").reset();
}

function drawMarkerAt(latitude,longitude,fillRate,isOrganicBin,binIdentification){
    var marker = L.marker([latitude,longitude]).addTo(mapLeafLet)
}

  // asign the form to form variable
var insertBinButton = document.getElementById('insertBinButtonId');
var findRouteButton = document.getElementById('findRouteButtonId');
var removePredefinedNumberOfBinsButton = document.getElementById('removePredefinedNumberOfBinsButtonId');

// call the submitForm() function when submitting the form
insertBinButton.addEventListener('click', insertBin);
findRouteButton.addEventListener('click', findRouteForWaypoints);
removePredefinedNumberOfBinsButton.addEventListener('click',removePredefinedNumberOfBinsRandomlyAndFindTheRoute);

function removePredefinedNumberOfBinsRandomlyAndFindTheRoute(event){
  event.preventDefault();
  var nOfBinsToBeRemoved = parseInt(document.getElementById("nOfBinsToBeRemovedId").value);

  removePredefinedNumberOfBinsRandomlyFromBinList(nOfBinsToBeRemoved);
  binList.forEach(bin=>bin.fillRate = 100)
  findRouteForWaypoints(event);

  // reset form
  document.getElementById("removePredefinedNumberOfBinsFormId").reset();
}

function removePredefinedNumberOfBinsRandomlyFromBinList(nOfBinsToBeRemoved){
  var binListOriginalSize = binList.length;
  if(nOfBinsToBeRemoved>binListOriginalSize){
    alert("The number of bins to be removed is greater than original list!");
    return
  }
  
  var listOfRemovedBins = [];

  while(listOfRemovedBins.length <nOfBinsToBeRemoved){
    var idxToBeRemoved = Math.floor(Math.random()*binListOriginalSize);
    if(!listOfRemovedBins.includes(binList[idxToBeRemoved])){
      listOfRemovedBins.push(binList[idxToBeRemoved]);
    }
  }

  binList = binList.filter(function(value, index, arr){
    if(listOfRemovedBins.includes(value)) return false
    return true
  })

  var removedBinsIdentificationString = '';
  listOfRemovedBins.forEach(bin=>{
    var binIdentification = bin[4];
    removedBinsIdentificationString = removedBinsIdentificationString.concat(binIdentification.concat(','))
  })
  alert(`Removed bins: ${removedBinsIdentificationString}`)
}

