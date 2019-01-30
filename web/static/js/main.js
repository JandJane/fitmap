var categories;
var mymap;
var createObjectManager;
var layers;
var objectsWithOpenedCards = [];
var objects;

function init(){
    categories = getCategories();

    layers = {
        'Спорт': L.layerGroup(),
        'Питание': L.layerGroup(),
        'Профилактика': L.layerGroup()
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

    objects = getObjects();
    displayObjects(objects);
}
$('#map').ready(init);