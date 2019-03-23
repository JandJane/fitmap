var categories;
var mymap;
var createObjectManager;
var layers;
var objectsWithOpenedCards = [];
var objects;
var multiobjects;
var rates;
var id = 3;

var R = 6371e3;  // Earth radius in meters
var nearbyObjectsRadius = 50;  // in meters

function init(){
    categories = getCategories();
    rates = getRates();

    layers = {
        'Спорт': L.layerGroup(),
        'Питание': L.layerGroup(),
        'Профилактика': L.layerGroup(),
        'Мои объекты': L.layerGroup(),
        'Личное': L.layerGroup(),
    };

    mymap = L.map('map', {
        center: [55.76, 37.64],
        zoom: 13,
        layers: Object.values(layers)
    });

    var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    layer.addTo(mymap);
    L.control.layers(null, layers, {position: 'topleft'}).addTo(mymap);
    //$('.leaflet-control-layers-selector').setAttribute("checked", "checked");

    createObjectManager = new CreateObjectManager(mymap);

    getObjects(displayObjects);
}
$('#map').ready(init);