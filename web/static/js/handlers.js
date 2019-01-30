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

