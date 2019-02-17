var categories = {
    1: 'Спорт',
    2: 'Питание',
    3: 'Профилактика',
    4: 'Личное'
};

var comments = [
    {
        id: 1,
        object_id: 1,
        created: "2019-01-14",
        author_id: 'Виктория',
        text: "Отличный фитнес"
    },
    {
        id: 2,
        object_id: 1,
        created: "2018-12-30",
        author_id: 'Виктор',
        text: "Хорошее заведение, хожу не первый год, очень нраввится персонал. Советую друзьям."
    },
    {
        id: 3,
        object_id: 1,
        created: "2018-12-29",
        author_id: 'Алексей',
        text: "Не дают полотенца!(("
    }
];

var objectInfos = [
    {
        id: 0,
        title: 'World Class',
        description: 'Фитнес-центр международного уровня',
        type_id: 1,
        lat_coordinate: 55.76480871762954,
        lng_coordinate: 37.64227867213776,
        address: 'Стопани, 6 с1, переулок Огородная Слобода, Ивановская горка, Хитровка, Басманный район, Центральный административный округ, Москва, Центральный федеральный округ, 101000, РФ',
        created: '20.12.2018',
        average_rate: 4.0,
        num_votes: 1,
        owner_id: 'Виктория',
        parent_multiobject: null
    },
    {
        id: 1,
        title: 'Prime Cafe',
        description: 'Кофе и здоровая еда',
        type_id: 2,
        lat_coordinate: 55.76061551821778,
        lng_coordinate: 37.60984182303219,
        address: '11 с4, Тверская улица, Тверской район, Центральный административный округ, Москва, Центральный федеральный округ, 125009, РФ',
        created: '01.12.2018',
        average_rate: 3.5,
        num_votes: 2,
        owner_id: 'Андрей',
        parent_multiobject: 0
    },
    {
        id: 1,
        title: 'Спортмастер',
        description: 'Спортивный магазин',
        type_id: 1,
        lat_coordinate: 55.76061551821778,
        lng_coordinate: 37.60984182303219,
        address: '11 с4, Тверская улица, Тверской район, Центральный административный округ, Москва, Центральный федеральный округ, 125009, РФ',
        created: '01.11.2018',
        average_rate: 0,
        num_votes: 0,
        owner_id: 3,
        parent_multiobject: 0
    }
];

var multiobjectInfos = [
    {
        id: 0,
        title: 'Торговый центр'
    }
];

var ratings = {};



