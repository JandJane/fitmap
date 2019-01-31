var CreateObjectManager = function (myMap) {
    var map = myMap;

    var createObjectButton = new CreateObjectButton(this, { position: 'bottomleft' });
    createObjectButton.addTo(map);

    var cancelButton = null,
        dialog = null,
        marker = null,
        newObject = {},
        creating = false;

    var nextStep = function () {
        $('.dialog div.current').removeClass('current').addClass('hidden')
            .next().removeClass('hidden').addClass('current');
    };

    this.enterObjectData = function(e) {
        map.off('click');
        if (marker) {
            marker.dragging.disable();
            if (!newObject['address']) {
                //newObject['address'] =
            }
        }
        nextStep();
    };

    this.addMarker = function(coords, address) {
        if (marker) {
            marker.setLatLng(coords);
        } else {
            marker = new NewObjectMarker(coords);
            marker.addTo(map);
            $('.dialog button:first').prop('disabled', false);
        }

        map.setView(coords);

        if (address) {
            newObject['address'] = address;
        } else {
            newObject['address'] = null;
        }
    };

    this.isCreating = function () {
        return creating;
    };

    this.startCreating = function() {
        if (createObjectButton) {
            createObjectButton.remove();
        }

        closeAllCards();
        cancelButton = new CancelCreatingButton(this, { position: 'bottomleft' });
        cancelButton.addTo(map);

        dialog = new CreateObjectDialog(this, { position: 'bottomleft' });
        dialog.addTo(map);

        creating = true;
        map.on('click', this.onClick);
    };

    this.onClick = function (e) {
        if (creating) {
            var coords = e.latlng;
            this.addMarker(coords);
        }
    };

    this.enableSave = function(saveButton) {
        return function() {
            if ($('input[name*="title"]').val() && $('input[name="category"]:checked').val()) {
                $(saveButton).prop('disabled', false);
            } else {
                $(saveButton).prop('disabled', true);
            }
        }
    };

    this.saveObject = function () {
        if (marker) {
            reverseGeocode(marker.getLatLng(), this.createObject);
        }
    };

    this.cancelCreating = function () {
        creating = false;
        if (cancelButton) {
            cancelButton.remove();
            cancelButton = null;
        }

        if (marker) {
            marker.remove();
            marker = null;
        }

        if (dialog) {
            dialog.remove();
            dialog = null;
        }

        map.off('click');

        createObjectButton = new CreateObjectButton(this, { position: 'bottomleft' });
        createObjectButton.addTo(map);
    };

    this.createObject = function(data) {
        var objectInfo = {
            title: $('input[name*="title"]').val(),
            description: $('#description').val(),
            type_id: $('input[name="category"]:checked').val(),
            lat_coordinate: marker.getLatLng().lat,
            lng_coordinate: marker.getLatLng().lng,
            address: data['display_name'],
            created: Date(),
            average_rating: 0,
            num_votes: 0,
            owner_id: 3
        };
        var object = addObject(objectInfo);
        console.log(marker.getLatLng());
        displayObject(object); // what if null is returned?
        this.cancelCreating();
    };

    this.enableSave = this.enableSave.bind(this);
    this.saveObject = this.saveObject.bind(this);
    this.onClick = this.onClick.bind(this);
    this.createObject = this.createObject.bind(this);
};


var CreateObjectButton = L.Control.extend({
    initialize: function(parent) {
        this.manager = parent;
        this.button = null;
        this.onClick = this.onClick.bind(this);
    },

    onAdd: function (map) {
        this.button = L.DomUtil.create("button");
        this.button.innerText = 'Создать объект';
        this.button.addEventListener('click', this.onClick);
        return this.button;
    },

    onClick: function (e) {
        e.stopPropagation();
        this.manager.startCreating();
    }
});


var CancelCreatingButton = L.Control.extend({
    initialize: function (parent) {
        this.manager = parent;
        this.button = null;
        this.onClick = this.onClick.bind(this);
    },

    onAdd: function (map) {
        this.button = L.DomUtil.create("button");
        this.button.innerText = 'Отменить';
        this.button.addEventListener('click', this.onClick);
        return this.button;
    },

    onClick: function (e) {
        e.stopPropagation();
        this.manager.cancelCreating();
    }
});


var CreateObjectDialog = L.Control.extend({
    initialize: function (parent) {
        this.manager = parent;
        this.dialog = null;
    },

    onAdd: function (map) {
        this.dialog = L.DomUtil.create("div", "dialog");
        renderCreateObjectDialog(this.dialog);
        //dialog.innerHTML = renderCreateObjectDialog();
        this.dialog.addEventListener('click', function (e) { e.stopPropagation(); });
        return this.dialog;
    }
});


var ObjectCard = L.Control.extend({
    initialize: function (objectModel) {
        this.object = objectModel;
        this.card = null;
        this.onAddComment = this.onAddComment.bind(this);
        this.displayCard = this.displayCard.bind(this);
    },

    onAdd: function (map) {
        this.card = L.DomUtil.create("div", "card");
        return this.card;
    },

    displayCard: function() {
        var comments = this.object.getComments(); // what if null is returned?
        renderObjectCard(this.card, this.object, comments, this.onAddComment);
        addRating();
    },

    onAddComment: function () {
        var newComment = {
            object_id: this.object.getId(),
            created: new Date().toISOString().slice(0,10),
            author_id: 3,
            text: $('#comment').val()
        };
        this.object.addComment(newComment); // what if null is returned?
        this.displayCard();
    }
});


var NewObjectMarker = function(coords) {
    return L.marker(
        coords,
        {
            draggable: true,
            title: 'Новый объект'
        }
    );
};


var ObjectMarker = function (objectModel) {
  var object = objectModel;

  this.marker = L.marker(object.getCoords());

  var onClick = function(e) {
      if (object.isCardOpened()) {
          object.closeCard();
      } else {
          closeAllCards();
          if (createObjectManager.isCreating()) {
              createObjectManager.cancelCreating();
          }
          object.openCard();
      }
  };

  this.marker.addEventListener('click', onClick.bind(this));
};
