var ObjectModel = function(objectInfo) {
  var info = objectInfo;  // verify all the fields

  this.getId = function () { return info.id };

  this.getCoords = function() { return [info.lat_coordinate, info.lng_coordinate] };

  this.getTitle = function() { return info.title };

  this.getDescription = function() { return info.description };

  this.getAddress = function() { return info.address };

  this.getCategoryId = function() { return info.type_id };

  this.getCategory = function() { return categories[info.type_id] };

  this.getComments = function() {
      return getComments(info.id);
  };

  this.addComment = function(newComment) {
      if (!addComment(info.id, newComment)) {
          console.log("ERROR");
      }
  };

  this.getRating = function() { return info.average_rating };

  this.getNumVotes = function () { return info.num_votes };

  this.addRating = function (rating, userId, created) {
      if (!addRating(info.id)) {
          console.log("ERROR");
          return null;
      }
      info.average_rating = (info.average_rating * info.num_votes + rating) / (info.num_votes + 1);
      ++info.num_votes;
  };
};


var getCategories = function() {  // API
  return categories;
};

var getObjects = function () {
    return objectInfos.map(function (objectInfo) { return new ObjectModel(objectInfo) });
};

var getComments = function(objectId) {  // API
    return comments;
};

var addComment = function(objectId, newComment) {  // API
    // check text for overflow
    comments.push(newComment);
    return comments.length;
};

var addObject = function(objectInfo) {  // API
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
    return object;
};

var addRating = function(objectId, rating, userId, created) {  // API
    // validate data
    // insert into db
    // update rating and num_votes for object
    return 1;
};
