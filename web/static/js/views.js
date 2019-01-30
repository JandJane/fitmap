var displayObject = function (object) {
    var marker = new ObjectMarker(object);
    layers[categories[object.getCategoryId()]].addLayer(marker.marker);
};

var displayObjects = function(objects) {
    for (var i = 0; i < objects.length; ++i) {
        displayObject(objects[i]);
    }
};

var closeAllCards = function() {
    while (objectsWithOpenedCards.length) {
        var object = objectsWithOpenedCards[objectsWithOpenedCards.length - 1];
        object.closeCard();
    }
};

var addRating = function () {
    $('div').webRating({
    bind: "event",

    // count
    ratingCount     : 5,

    // image & color
    xLocation     	: 0, //in px
    yLocation	      : 0, //in px
    width		        : 50, //in px
    height          : 50, //in px
    border          : 3, //in px

    //CSS
    onClass         : 'onClass',
    offClass        : 'offClass',
    onClassHover  	: 'onClassHover', //Optional
    offClassHover 	: 'offClassHover', //Optional

    //on click funcitons
    cookieEnable		: false,
    cookiePrefix		: "myRating_",
    maxClick				: 1,
    onClick					: function(clickScore, data){
        //Your function & post action
    },

    //Tooltip
    tp_showAverage  : true,
    prefixAverage   : "Avg",
    tp_eachStar     : {'1':'Очень плохо','2':'Плохо','3':'Нормально','4':'Хорошо','5':'Отлично'} //Rating guide
    });
};

