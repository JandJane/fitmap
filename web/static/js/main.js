var categories;
var mymap;
var createObjectManager;
var layers;
var objectsWithOpenedCards = [];
var objects;

function init(){
    categories = getCategories();

    mymap = L.map('map', {
        center: [55.76, 37.64],
        zoom: 13
    });

    objects = getObjects();

    var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    layer.addTo(mymap);

    createObjectManager = new CreateObjectManager(mymap);

    layers = {
        'Спорт': L.layerGroup(),
        'Питание': L.layerGroup(),
        'Профилактика': L.layerGroup()
    };

    L.control.layers(null, layers).addTo(mymap);

    displayObjects(objects);

}
$('#map').ready(init);