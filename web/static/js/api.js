var getCategories = function() {
    var categories;
    $.ajax({
    url : "http://127.0.0.1:5000/object_type",
    type : "get",
    async: false,
    success: function(response) {
            categories = response;
        }
    });
    return categories;
 };

var getObjects = function (callbackFunc) {
    // TODO Get non-private objects and private objects for the current user
    var objectInfos;
    $.ajax({
    url : "http://127.0.0.1:5000/object",
    type : "get",
    async: false,
    success: function(response) {
            objectInfos = response;
        }
    });

    var multiobjectInfos;
        $.ajax({
    url : "http://127.0.0.1:5000/multiobject",
    type : "get",
    async: false,
    success: function(response) {
            multiobjectInfos = response;
        }
    });

    objects = objectInfos.map(function (objectInfo) { return new ObjectModel(objectInfo) });
    multiobjects = multiobjectInfos.map(function (objectInfo) { return new MultiobjectModel(objectInfo) });
    callbackFunc(objects, multiobjects);
};

var getObjectsNearby = function(coords, callbackNonEmptyNearby, callbackEmptyNearby) {  // API
    // Non private objects only
    var lat = coords.lat,
        lng = coords.lng,
        nearbyObjects = [];
    for (var i = 0; i < objects.length; ++i) {
        if (objects[i].getCategory() !== 'Личное' &&
            distance(objects[i].getCoords(), [lat, lng]) < nearbyObjectsRadius) {
            nearbyObjects.push(objects[i]);
        }
    }
    if (nearbyObjects.length > 0) {
        callbackNonEmptyNearby(nearbyObjects);
    } else {
        callbackEmptyNearby(coords);
    }
};

var getChildObjects = function(id, callbackFunc) {
    var childObjects = objects.filter(function(object) {
        return (object.getParentMultiobject() === id);
    });
    callbackFunc(childObjects);
};

var getPromotion = function(objectId, callbackFunc) {
    $.ajax({
        url : "http://127.0.0.1:5000/promotion/" + objectId,
        type : "get",
        async: false,
        success: callbackFunc
    });
};

var addPromotion = function(objectId, promotionText, callbackFunc) {
    // check text for overflow
    $.post(
        "http://127.0.0.1:5000/promotion",
        {
            'text': promotionText,
            'object_id': objectId
        },
        callbackFunc
    );
};

var getComments = function(objectId, callbackFunc) {
    $.ajax({
        url : "http://127.0.0.1:5000/comment/" + objectId,
        type : "get",
        async: false,
        success: callbackFunc
    });
};

var addComment = function(objectId, newComment, callbackFunc) {
    // check description and title for overflow
    $.post(
        "http://127.0.0.1:5000/comment",
        newComment,
        callbackFunc
    );
};

var addObject = function(objectInfo, callbackFunc) {
    console.log(objectInfo);
    // check description and title for overflow, get id
    $.post(
        "http://127.0.0.1:5000/object",
        objectInfo,
        function(result) {
            objectInfo.id = objects.length + 1;
            var object = new ObjectModel(objectInfo);
            objects.push(object);
            callbackFunc(object);
    });
};

var getRates = function() {
    var rates;
    $.ajax({
    url : "http://127.0.0.1:5000/rate",
    type : "get",
    async: false,
    success: function(response) {
            rates = response;
        }
    });
    return rates;
 };

var addRate = function(objectId, rate, userId, created, callbackFunc) {
    $.post(
        "http://127.0.0.1:5000/rate",
        {
            "object_id": objectId,
            "rate": rate,
            "user_id": userId
        },
        callbackFunc
    );
};

var userRatedObject = function(userId, objectId, callbackFunc) {
    var rating = (rates[userId] && rates[userId][objectId]) ? rates[userId][objectId] : 0;
    callbackFunc(rating);
};
