var renderCreateObjectDialog = function(container) {
    var header = $('<div></div>').addClass('flex-container')
        .append($('<p></p>')
            .append($('<h3></h3>').text('Создание объекта')));

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
        .click(createObjectManager.enterObjectData)
        .text('Далее');
    var step_one = $('<div></div>').addClass('current')
        .append(
            $('<p></p>').text("Введите адрес объекта:"),
            address_form,
            $('<p></p>').text("Или просто укажите его кликом по карте"),
            next_step_button);

    var save_button = $('<button></button>')
        .prop('disabled', true)
        .click(createObjectManager.saveObject)
        .text('Сохранить');
    var data_form = $('<form></form>')
        .prop('action', '#');
    var title_input = $('<input>')
        .prop('type', 'text')
        .prop('name', 'title')
        .prop('placeholder', 'Название')
        .on('input', createObjectManager.enableSave(save_button));
    var description_input = $('<textarea>')
        .prop('id', 'description')
        .prop('placeholder', 'Описание');
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
    $(container).append(header, step_one, step_two);
};

var renderObjectCard = function(container, object, comments, onAddComment) {
    $(container).empty();

    var img = $('<img />', {src: 'img/close.png', width: '15px', height: '15px'})
        .click(object.closeCard);
    var header = $('<div />', {class: 'card-header'}).append(img);
    $(container).append(header);

    var title = $('<p />').append($('<h3 />', {text: object.getTitle(), class: 'important'}));
    var category = $('<p />', {text: object.getCategory(), class: 'not-important'});
    var address = $('<p />', {text: object.getAddress(), class: 'not-important'});
    var description = $('<p />', {text: object.getDescription()});
    var infoBlock = $('<div />', {class: 'card-info-block'}).append(title, category, address, description);
    $(container).append(infoBlock);


    var currentRating = $('<p />', {text: "Рейтинг: " + object.getRating(), class: 'not-important'});
    var numVotes = $('<p />', {text: "Оценок: " + object.getNumVotes(), class: 'not-important'});
    var rate = $('<div />', {
        'class': 'divClass',
        'data-webRating': 2.5,
        'data-webRatingN': 5,
        'data-webRatingArg': '{"type": "book", "uid": 13}'
    });
    var ratingBlock = $('<div />', {class: 'card-rating-block'}).append(currentRating, numVotes, rate);
    $(container).append(ratingBlock);

    var displayCommentsBlock = $('<div />', {class: 'card-display-comments-block'});
    var commentSubtitle = $('<p />').append($('<h4 />', {text: "Комментарии"}));
    displayCommentsBlock.append(commentSubtitle);
    comments.forEach(function(comment) {
        displayCommentsBlock.append(
            $('<div />').append(
                $('<p />', {text: comment.author_id, class: 'important'}),
                $('<p />', {text: comment.created, class: 'not-important'}),
                $('<p />', {text: comment.text})
            )
        );
    });
    $(container).append(displayCommentsBlock);

    var comment_input = $('<textarea>')
        .prop('id', 'comment')
        .prop('placeholder', 'Введите ваш комментарий');
    var add_button = $('<button></button>')
        .click(onAddComment)
        .text('Добавить');
    var addCommentBlock = $('<div />', {class: 'card-add-comment-block'})
        .append(comment_input, add_button);
    $(container).append(addCommentBlock);

};