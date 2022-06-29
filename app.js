// I started from https://developer.mapquest.com/documentation/mapquest-js/v1.3/examples/directions-with-multiple-waypoints/

//The following data will be used everywhere
var binList = [] //List of all bins
var binWaypoints = [] //List of only those bins that comply with a certain garbage requirement
var initialScreenLatitude = -23.206344
var initialScreenLongitude = -45.874893
var initialScreenZoom = 15

var dctaEntranceGateLatitude = -23.206368
var dctaEntranceGateLongitude = -45.881676
var dctaExitGateLatitude = -23.206224
var dctaExitGateLongitude = -45.881520

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

    var preDefinedBinList = [
      [-23.204641, -45.876315, 70, true], //HTO
      [-23.201778, -45.875185, 50, false], //H8
      [-23.200801, -45.874142, 30, true], //H23A
      [-23.200152, -45.873808, 20, true], //H22A
      [-23.199641, -45.872967, 20, false], //H17C
      [-23.199037, -45.872250, 10, true], //H17B
      [-23.196622, -45.872856, 50, false], //H25B
      [-23.196040, -45.871817, 100, false], //H25D
      [-23.195601, -45.868031, 15, false], //H9C
      [-23.196066, -45.867493, 30, false], //H9B
      [-23.196540, -45.867002, 10, true], //H9A
      [-23.200596, -45.865869, 80, true], //H30D
      [-23.204550, -45.864042, 50, true], //H12B
      [-23.204089, -45.865135, 49, true], //H11A
      [-23.202635, -45.869942, 90, false], //H21A
      [-23.202888, -45.871385, 30, false], //H18B
      [-23.200083, -45.869979, 15, false] //H27A
    ];

    preDefinedBinList.forEach(bin => {
      var binLatitude = bin[0]
      var binLongitude = bin[1]
      var binFillRate = bin[2]
      var isOrganicBin = bin[3]
      drawMarkerAt(binLatitude,binLongitude,binFillRate,isOrganicBin)
      binList.push(bin)
      checkIfABinCompliesWithGarbageRequirementAndEventuallyAddItAsAWaypoint(binLatitude,binLongitude,binFillRate,isOrganicBin)
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

    L.mapquest.directions().route({
      start: ''.concat(dctaEntranceGateLatitude,',',dctaEntranceGateLongitude),
      end: ''.concat(dctaExitGateLatitude,',',dctaExitGateLongitude),
      waypoints: binWaypoints,
      optimizeWaypoints: true
    },directionsCallback)

    function directionsCallback(error, response) {
    
      var directionsLayer = L.mapquest.directionsLayer({
        directionsResponse: response
      }).addTo(mapLeafLet);
      console.log(`The distance is ${response.route.distance} miles`)
      console.log(`The route time is ${response.route.time}s`)
      alert(`The distance is ${response.route.distance}`)
      alert(`The route time is ${response.route.time}`)
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
    
    // run directions function
    drawMarkerAt(binLatitude, binLongitude,binFillRate,isOrganicBin);
    checkIfABinCompliesWithGarbageRequirementAndEventuallyAddItAsAWaypoint(binLatitude,binLongitude,binFillRate,isOrganicBin)
    alert(`Added new point! You may enter ${23-binWaypoints.length} more points!`)

    // reset form
    document.getElementById("insertBinFormId").reset();
}

function drawMarkerAt(latitude,longitude,fillRate,isOrganicBin){
    var marker = L.marker([latitude,longitude]).addTo(mapLeafLet)
    //COLOCAR AQUI ALGUM CÓDIGO PARA IMPRIMIR O PREENCHIMENTO E A INFORMAÇÃO SE É ORGÂNICO OU NÃO
}

  // asign the form to form variable
var insertBinButton = document.getElementById('insertBinButtonId');
var findRouteButton = document.getElementById('findRouteButtonId');

// call the submitForm() function when submitting the form
insertBinButton.addEventListener('click', insertBin);
findRouteButton.addEventListener('click', findRouteForWaypoints);
