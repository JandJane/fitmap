var renderCreateObjectDialog = function(container) {
    // Header
    var header = $('<div></div>').addClass('flex-container')
        .append($('<p></p>')
            .append($('<h3></h3>').text('Создание объекта')));

    // Create object Step One - enter address
    var address_form = $('<form></form>')
        .prop('action', '#');
    var address_input = $('<input>')
        .prop('type', 'text')
        .prop('name', 'address')
        .prop('placeholder', 'Адрес объекта');
    var submit_input = $('<input>')
        .click(function (e) { search(); return false; })
        .prop('type', 'submit')
        .prop('value', 'Найти');
    address_form.append(address_input, submit_input);
    var next_step_button = $('<button></button>')
        .prop('disabled', true)
        .click(createObjectManager.onEnterAddress)
        .text('Далее');
    var step_one = $('<div></div>').addClass('current')
        .append(
            $('<p></p>').text("Введите адрес объекта:"),
            address_form,
            $('<p></p>').text("Или просто укажите его кликом по карте"),
            next_step_button);

    // Create object Step Two - enter object info
    var save_button = $('<button></button>')
        .prop('disabled', true)
        .click(createObjectManager.onEnterInfo)
        .text('Сохранить');
    var data_form = $('<form></form>')
        .prop('action', '#');
    var title_input = $('<input>')
        .prop('type', 'text')
        .prop('name', 'title')
        .prop('placeholder', 'Название')
        .prop('maxlength', 80)
        .on('input', createObjectManager.enableSave(save_button));
    var description_input = $('<textarea>')
        .prop('id', 'description')
        .prop('placeholder', 'Описание')
        .prop('maxlength', 1000);
    data_form.append(
        $('<p></p>').text("Введите название и описание объекта:"),
        $('<p></p>').append(title_input),
        $('<p></p>').append(description_input),
        $('<p></p>').text("Выберите категорию объекта:")
        );
    for (var category in categories) {
        data_form.append($('<p></p>').append(
            $('<input>')
                .prop('type', 'radio')
                .prop('name', 'category')
                .prop('value', category)
                .on('input', createObjectManager.enableSave(save_button)),
            $('<span></span>').text(categories[category])));
    }
    var step_two = $('<div></div>').addClass('hidden')
        .append(
            data_form,
            save_button);

    // Create object Step Three - display nearby objects if there are any
    var step_three = $('<div></div>').addClass('hidden')
        .append(
            $('<p></p>').text("Рядом с выбранным местоположением найдены следующие объекты. Возможно, вы имели в виду их?"),
            $('<div id="nearby-objects"></div>'),
            $('<button></button>')
                .click(createObjectManager.saveObject)
                .text('Нет, сохранить')
        );

    $(container).append(header, step_one, step_two, step_three);
};

var renderObjectCard = function(container, object, comments, promotion, onAddComment) {
    $(container).empty();

    // Header
    var crossImg = $('<img />', {src: 'img/cross.png', width: '15px', height: '15px'})
        .click(object.closeCard);
    var header = $('<div />', {class: 'card-header'}).append(crossImg);

    // Promotion block
    var promotionImg = $('<img />', {src: 'img/exclamation_mark.png', width: '20px', height: '20px', display: 'inline'});
    var promotionText = $('<p />').text(promotion).css({'color': 'red'});
    var promotionBlock = $('<div />', {class: 'card-promotion-block'}).append(promotionImg, promotionText);

    // Info block
    var title = $('<p />').append($('<h3 />', {text: object.getTitle(), class: 'important'}));
    var category = $('<p />', {text: object.getCategory(), class: 'not-important'});
    var address = $('<p />', {text: object.getAddress(), class: 'not-important'});
    var description = $('<p />', {text: object.getDescription()});
    var infoBlock = $('<div />', {class: 'card-info-block'}).append(title, category, address, description);

    // Rating block
    if (object.getCategory() !== 'Личное') {
        var currentRating = $('<p />', {
            text: "Рейтинг: " + object.getAverageRate().toFixed(1),
            class: 'not-important'
        });
        var numVotes = $('<p />', {text: "Оценок: " + object.getNumVotes(), class: 'not-important'});
        var rate = $('<div />', {
            'class': 'divClass',
            'data-webRating': 2.5,
            'data-webRatingN': 5,
            'data-webRatingArg': '{"type": "book", "uid": 13}'
        });
        var ratingBlock = $('<div />', {class: 'card-rating-block'}).append(currentRating, numVotes, rate);
    }

    // Display comments block
    if (object.getCategory() !== 'Личное') {
        var displayCommentsBlock = $('<div />', {class: 'card-display-comments-block'});
        var commentSubtitle = $('<p />').append($('<h4 />', {text: "Комментарии"}));
        displayCommentsBlock.append(commentSubtitle);
        comments.forEach(function (comment) {
            displayCommentsBlock.append(
                $('<div />').append(
                    $('<p />', {text: comment.author_id, class: 'important'}),
                    $('<p />', {text: comment.created, class: 'not-important'}),
                    $('<p />', {text: comment.text})
                )
            );
        });
    }

    // Add comment block
    if (object.getCategory() !== 'Личное') {
        var comment_input = $('<textarea>')
            .prop('id', 'comment')
            .prop('placeholder', 'Введите ваш комментарий');
        var addButton = $('<button></button>')
            .click(onAddComment)
            .text('Добавить');
        var addCommentBlock = $('<div />', {class: 'card-add-block'})
            .append(comment_input, addButton);
    }

    // Owner block
    if (object.getCategory() !== 'Личное') {
        var ownerBlock = $('<div />', {class: 'card-owner-block'})
            .append(
                $('<p />', {
                    class: 'not-important',
                    text: 'Объект добавлен ' + object.getOwnerId() + ' ' + object.getCreationDate()
                }));
    }

    // Add promotion block
    var addPromotionSubtitle = $('<p />').append($('<h4 />', {text: "Добавить признак объекта"}));
    var promotionInput = $('<textarea>')
        .prop('id', 'promotion')
        .prop('placeholder', 'Проводится акция!');
    var addPromotionButton = $('<button></button>')
        // .click(onAddPromotion)
        .text('Добавить');
    var addPromotionBlock = $('<div />', {class: 'card-add-block'})
        .append(addPromotionSubtitle, promotionInput, addPromotionButton);


    if (object.getCategory() === 'Личное') {
        $(container).append(header, infoBlock);
    } else {
        $(container).append(header, promotionBlock, infoBlock, ratingBlock, displayCommentsBlock, addCommentBlock, ownerBlock);
        if (id === object.getOwnerId()) {
            $(container).append(addPromotionBlock);
        }
    }
};

var renderMultiobjectCard = function(container, object) {
    $(container).empty();

    // Header
    var cross_img = $('<img />', {src: 'img/cross.png', width: '15px', height: '15px'})
        .click(object.closeCard);
    var header = $('<div />', {class: 'card-header'}).append(cross_img);

    // Info block
    var title = $('<p />').append($('<h3 />', {text: object.getTitle(), class: 'important'}));
    var category = $('<p />', {text: 'Мультиобъект', class: 'not-important'});
    var address = $('<p />', {text: object.getAddress(), class: 'not-important'});
    var infoBlock = $('<div />', {class: 'card-info-block'}).append(title, category, address);
    var childObjects = $('<div />', {id: 'child-objects'});
    object.getChildObjects().forEach(function(childObject) {
        childObjects.append($('<p />').append($('<a href="#" />')
            .text(childObject.getTitle())
            .click(childObject.openCard)))
    });

    $(container).css({'overflow-y': 'hidden'});
    $(container).append(header, infoBlock, childObjects);
};