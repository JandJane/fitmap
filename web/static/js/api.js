
var getCategories = function(categories) {
    $.get(
        "http://127.0.0.1:5000/object_type", {},
        function(response) {
            console.log(response);
            categories = response.json;
        }
    );
};

var getObjects = function (callbackFunc) {  // API
    // Get non-private objects and private objects for the current user
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

var getChildObjects = function(id, callbackFunc) {  // API
    var childObjects = objects.filter(function(object) {
        return (object.getParentMultiobject() === id);
    });
    callbackFunc(childObjects);
};

var getPromotion = function(objectId, callbackFunc) {  // API
    callbackFunc('Проводится акция!');
};

var addPromotion = function(objectId, promotionText, callbackFunc) {  // API
    // check text for overflow
};

var getComments = function(objectId, callbackFunc) {  // API
    callbackFunc(comments);
};

var addComment = function(objectId, newComment, callbackFunc) {  // API
    // check text for overflow
    comments.push(newComment);
    callbackFunc();
};

var addObject = function(objectInfo, callbackFunc) {  // API
    // check description and title for overflow
    // insert into DB and get id
    var id = objects.length;
    if (!id) {
        console.log("ERROR");
        return;
    }
    objectInfo.id = id;
    var object = new ObjectModel(objectInfo);
    objects.push(object);
    callbackFunc(object);
};

var addRate = function(objectId, rate, userId, created, callbackFunc) {  // API
    // validate data
    // insert into db
    // update rating and num_votes for object
    if (!ratings[userId]) {
        ratings[userId] = {};
    }
    ratings[userId][objectId] = rate;
    callbackFunc();
};

var userRatedObject = function(userId, objectId, callbackFunc) {  // API
    var rating = (ratings[userId] && ratings[userId][objectId]) ? ratings[userId][objectId] : 0;
    callbackFunc(rating);
};
