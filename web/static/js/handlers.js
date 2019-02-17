var geocode = function (address, callbackFunc) {
    $.get(
        "https://nominatim.openstreetmap.org/search?accept-language=ru",
        {q: address, format: "json", addressdetails: 1, limit: 1},
        callbackFunc
    );
};

var reverseGeocode = function (coords, callbackFunc) {
    $.get(
        "https://nominatim.openstreetmap.org/reverse?accept-language=ru",
        {format: "json", lat: coords.lat, lon: coords.lng, addressdetails: 1},
        callbackFunc
    );
};

var search = function () {
    // Преобразуем форму в массив
    var form_data = $('input[name*="address"]').val();
    geocode(form_data, function (data) {
        if (data[0]) {
            createObjectManager.addMarker([data[0].lat, data[0].lon], data[0].display_name);
        } else {
            alert("Not found");
        }
    });
};

function toRad(value) {
    // Converts numeric degrees to radians
    return value * Math.PI / 180;
}

var distance = function (coords1, coords2) {
    var deltaLat = toRad(coords2[0]-coords1[0]);
    var deltaLon = toRad(coords2[1]-coords1[1]);

    var a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
        Math.cos(toRad(coords1[0])) * Math.cos(toRad(coords2[0])) *
        Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
};

