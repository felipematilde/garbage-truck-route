// define initial position
initialLatitude = -23.206815,
initialLongitude = -45.874893
initialZoom = 15

// default map layer
let map = L.map('map', {
    layers: MQ.mapLayer(),
    center: [initialLatitude, initialLongitude],
    zoom: initialZoom
});
    
// This function is to call API and draw a route
function runDirection(start, end) {
    
    // recreating new map layer after removal
    map = L.map('map', {
        layers: MQ.mapLayer(),
        center: [initialLatitude, initialLongitude],
        zoom: initialZoom
    });
    
    var dir = MQ.routing.directions();
    dir.route({
        locations: [
            start,
            end
        ]
    });
    

    CustomRouteLayer = MQ.Routing.RouteLayer.extend({
        createStartMarker: (location) => {
            var custom_icon;
            var marker;
            custom_icon = L.icon({
                iconUrl: 'img/red.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });
            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
            return marker;
        },
        createEndMarker: (location) => {
            var custom_icon;
            var marker;
            custom_icon = L.icon({
                iconUrl: 'img/blue.png',
                iconSize: [20, 29],
                iconAnchor: [10, 29],
                popupAnchor: [0, -29]
            });
            marker = L.marker(location.latLng, {icon: custom_icon}).addTo(map);
            return marker;
        }
    });
        
    map.addLayer(new CustomRouteLayer({
        directions: dir,
        fitBounds: true
    })); 
}


// function that runs when form submitted
function submitForm(event) {
    event.preventDefault();

    // delete current map layer
    map.remove();

    // getting form data
    start = document.getElementById("start").value;
    end = document.getElementById("destination").value;

    // run directions function
    runDirection(start, end);

    // reset form
    document.getElementById("form").reset();
}

// function that runs when pin form submitted
function submitPinForm(event) {
    event.preventDefault();

    // delete current map layer
    //map.remove();

    // getting form data
    latitude = parseFloat(document.getElementById("pinLat").value);
    longitude = parseFloat(document.getElementById("pinLon").value);

    // run directions function
    drawMarkerAt(latitude, longitude);

    // reset form
    document.getElementById("pinForm").reset();
}

function drawMarkerAt(latitude,longitude){
    var marker = L.marker([latitude,longitude]).addTo(map)
}

// asign the form to form variable
const form = document.getElementById('form');
const pinForm = document.getElementById('pinForm');

// call the submitForm() function when submitting the form
form.addEventListener('submit', submitForm);
pinForm.addEventListener('submit', submitPinForm);