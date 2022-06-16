// O bizu é https://developer.mapquest.com/documentation/mapquest-js/v1.3/examples/directions-with-multiple-waypoints/

var lixeirasWaypoints = []
var initialScreenLatitude = -23.206344
var initialScreenLongitude = -45.874893
var initialScreenZoom = 15

var entradaPortariaLatitude = -23.206368
var entradaPortariaLongitude = -45.881676
var saidaPortariaLatitude = -23.206224
var saidaPortariaLongitude = -45.881520

var mapLeafLet

window.onload = function() {
    L.mapquest.key = config.MY_API_TOKEN;

    mapLeafLet = L.mapquest.map('mapId', {
        center: [initialScreenLatitude, initialScreenLongitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: initialScreenZoom
    });

    var preDefinedLixeiraWaypoints = [
      "-23.204641, -45.876315", //HTO
      "-23.201778, -45.875185", //H8
      "-23.200801, -45.874142", //H23A
      "-23.200152, -45.873808", //H22A
      "-23.199641, -45.872967", //H17C
      "-23.199037, -45.872250", //H17B
      "-23.196622, -45.872856", //H25B
      "-23.196040, -45.871817", //H25D
      "-23.195601, -45.868031", //H9C
      "-23.196066, -45.867493", //H9B
      "-23.196540, -45.867002", //H9A
      "-23.200596, -45.865869", //H30D
      "-23.204550, -45.864042", //H12B
      "-23.204089, -45.865135", //H11A
      "-23.202635, -45.869942", //H21A
      "-23.202888, -45.871385", //H18B
      "-23.200083, -45.869979" //H27A
    ];

    preDefinedLixeiraWaypoints.forEach((lixeira) => {
      var latitudeLix = parseFloat(lixeira.split(",")[0])
      var longitudeLix = parseFloat(lixeira.split(",")[1])
      drawMarkerAt(latitudeLix,longitudeLix)
    })
    preDefinedLixeiraWaypoints.forEach(lixeira=>lixeirasWaypoints.push(lixeira))
}

function submitEncontrar(event){
    event.preventDefault();
    L.mapquest.key = config.MY_API_TOKEN;

    L.mapquest.directions().route({
      start: ''.concat(entradaPortariaLatitude,',',entradaPortariaLongitude),
      end: ''.concat(saidaPortariaLatitude,',',saidaPortariaLongitude),
      waypoints: lixeirasWaypoints,
      optimizeWaypoints: true
    });
}

function submitInserir(event){
    event.preventDefault();

    // getting form data
    var latitudeLixeira = parseFloat(document.getElementById("latitudeLixeiraId").value);
    var longitudeLixeira = parseFloat(document.getElementById("longitudeLixeiraId").value);

    // run directions function
    drawMarkerAt(latitudeLixeira, longitudeLixeira);
    var lixeiraWaypoint = ''.concat(latitudeLixeira,`,`,longitudeLixeira)
    lixeirasWaypoints.push(lixeiraWaypoint)
    alert(`Added new point! You may enter ${23-lixeirasWaypoints.length} more points!`)

    // reset form
    document.getElementById("inserirFormId").reset();
}

function drawMarkerAt(latitude,longitude){
    var marker = L.marker([latitude,longitude]).addTo(mapLeafLet)
}

  // asign the form to form variable
var inserirButton = document.getElementById('inserirButtonId');
var encontrarButton = document.getElementById('encontrarButtonId');

// call the submitForm() function when submitting the form
inserirButton.addEventListener('click', submitInserir);
encontrarButton.addEventListener('click', submitEncontrar);
