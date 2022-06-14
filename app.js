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
}

function submitEncontrar(event){
    event.preventDefault();
    L.mapquest.key = config.MY_API_TOKEN;

    alert('passou por aqui');
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
    alert(`Size of this array: ${lixeirasWaypoints.length}`)

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