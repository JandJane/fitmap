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

    this.getCreationDate = function() { return objectInfo.created.slice(4, 16); };

    this.getParentMultiobject = function () { return info.parent_multiobject_id; };

    this.getComments = function(callbackFunc) {
        return getComments(info.id, callbackFunc);
    };

    this.addComment = function(newComment, callbackFunc) {
        addComment(info.id, newComment, callbackFunc);
    };

    this.addPromotion = function(promotionText, callbackFunc) {
        addPromotion(info.id, promotionText, callbackFunc);
    };

    this.getPromotion = function(callbackFunc) {
        return getPromotion(info.id, callbackFunc);
    };

    this.getAverageRate = function() { return info.average_rating };

    this.getNumVotes = function () { return info.num_votes };

    this.addRate = function (rating) {
        var callbackFunc = function() {
                info.average_rating = (info.average_rating * info.num_votes + rating) / (info.num_votes + 1);
                ++info.num_votes;
                if (!rates[id]) {
                    rates[id] = {};
                }
                rates[id][info.id] = rating;
                card.onUpdateRating();
        };
        addRate(info.id, rating, id, Date(), callbackFunc);
        getRates();
        console.log(rates);

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

var dateFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};