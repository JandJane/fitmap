var ObjectModel = function(objectInfo) {
    var info = objectInfo;  // verify all the fields
    var card = null;
    var cardOpened = false;

    this.marker = null;

    this.isCardOpened = function () { return cardOpened; };

    this.getId = function () { return info.id };

    this.getCoords = function() { return [info.lat_coordinate, info.lng_coordinate] };

    this.getTitle = function() { return info.title };

    this.getDescription = function() { return info.description };

    this.getAddress = function() { return info.address };

    this.getCategoryId = function() { return info.type_id };

    this.getCategory = function() { return categories[info.type_id] };

    this.getOwnerId = function() { return info.owner_id; };

    this.getCreationDate = function() { return info.created; };

    this.getParentMultiobject = function () { return info.parent_multiobject; };

    this.getComments = function(callbackFunc) {
        return getComments(info.id, callbackFunc);
    };

    this.addComment = function(newComment, callbackFunc) {
        var newCallbackFunc = function(error) {
            if (error) {
                console.log(error);
            } else {
                callbackFunc();
            }
        };
        addComment(info.id, newComment, newCallbackFunc);
    };

    this.getPromotion = function(callbackFunc) {
        return getPromotion(info.id, callbackFunc);
    };

    this.addPromotion = function(callbackFunc) {
        var newCallbackFunc = function(error) {
            if (error) {
                console.log(error);
            } else {
                callbackFunc();
            }
        };
        addPromotion(info.id, $('#promotion').val(), newCallbackFunc);
    };

    this.getAverageRate = function() { return info.average_rate };

    this.getNumVotes = function () { return info.num_votes };

    this.addRate = function (rating) {
        var callbackFunc = function(error) {
            if (error) {
                console.log(error)
            } else {
                info.average_rate = (info.average_rate * info.num_votes + rating) / (info.num_votes + 1);
                ++info.num_votes;
                card.onUpdateRating();
            }
        };
        addRate(info.id, rating, id, Date(), callbackFunc);
    };

    this.addMarker = function () {
        this.marker = new ObjectMarker(this);
    };

    this.openCard = function() {
        card = new ObjectCard(this);
        card.addTo(mymap);
        card.displayCard();
        objectsWithOpenedCards.push(this);
        cardOpened = true;
    };

    this.closeCard = function() {
        if (card) {
            card.remove();
            objectsWithOpenedCards.pop();
            cardOpened = false;
        }
    };

    this.openCard = this.openCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
};


var MultiobjectModel = function(objectInfo) {
    var info = objectInfo;  // verify all the fields
    var card = null;
    var cardOpened = false;
    var childObjects = null;

    this.marker = null;

    getChildObjects(info.id, function(objs) { childObjects = objs; });

    this.isCardOpened = function () { return cardOpened; };

    this.getId = function () { return info.id };

    this.getTitle = function () { return info.title };

    this.getCoords = function () {
        if (childObjects) {
            return childObjects[0].getCoords();
        }
    };

    this.getAddress = function () {
        if (childObjects) {
            return childObjects[0].getAddress();
        }
    };

    this.getChildObjects = function() { return childObjects; };

    this.addMarker = function () {
        this.marker = new ObjectMarker(this);
        this.marker.marker.addTo(mymap);
    };

    this.openCard = function() {
        card = new MultiobjectCard(this);
        card.addTo(mymap);
        card.displayCard();
        objectsWithOpenedCards.push(this);
        cardOpened = true;
    };

    this.closeCard = function() {
        if (card) {
            card.remove();
            objectsWithOpenedCards.pop();
            cardOpened = false;
        }
    };

    this.openCard = this.openCard.bind(this);
    this.closeCard = this.closeCard.bind(this);
};
