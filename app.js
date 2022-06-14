// O bizu é https://developer.mapquest.com/documentation/mapquest-js/v1.3/examples/directions-with-multiple-waypoints/

var lixeirasWaypoints = []
var initialScreenLatitude = -23.206344//
var initialScreenLongitude = -45.874893//
var initialScreenZoom = 15

var portariaLatitude = -23.206344
var portariaLongitude = -45.881665

window.onload = function() {
    L.mapquest.key = config.MY_API_TOKEN;

    var map = L.mapquest.map('map', {
        center: [initialScreenLatitude, initialScreenLongitude],
        layers: L.mapquest.tileLayer('map'),
        zoom: initialScreenZoom
    });
}

function submitEncontrar(event){
    L.mapquest.key = config.MY_API_TOKEN;

    //var map = L.mapquest.map('map', {
    //  center: [initialScreenLatitude, initialScreenLongitude],
    //  layers: L.mapquest.tileLayer('map'),
    //  zoom: 13
    //});

    L.mapquest.directions().route({
      start: ''.concat(portariaLatitude,',',portariaLongitude),
      end: ''.concat(portariaLatitude,',',portariaLongitude),
      waypoints: lixeirasWaypoints//[ '-23.206815,-45.874893','-23.226815,-45.894893']
    });
}

function submitInserir(event){
    event.preventDefault();

    // getting form data
    var latitude = parseFloat(document.getElementById("latitude").value);
    var longitude = parseFloat(document.getElementById("longitude").value);

    // run directions function
    //drawMarkerAt(latitude, longitude);
    var localizacao = ''.concat(latitude,`,`,longitude)
    localizacaoArray.push(localizacao)
    console.log(`Size of this array: ${localizacaoArray.length}`)

    // reset form
    document.getElementById("inserirForm").reset();
}

function drawMarkerAt(latitude,longitude){
//    var marker = L.marker([latitude,longitude]).addTo(map)
}

  // asign the form to form variable
var inserirButton = document.getElementById('inserirButton');
var encontrarButton = document.getElementById('encontrarButton');

// call the submitForm() function when submitting the form
inserirButton.addEventListener('click', submitInserir);
encontrarButton.addEventListener('click', submitEncontrar);