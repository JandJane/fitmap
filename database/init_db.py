import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database.models import *

engine = create_engine('sqlite:///C:\\Users\\foggy\\Documents\\alcora\\alcora_database.db', echo=True)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

for type_name in ['Спорт', 'Питание', 'Профилактика', 'Личное']:
    session.add(ObjectType(type_name=type_name))
print(session.query(ObjectType).all())


# Fill database with some data
session.add(Object(title='World Class',
                   description='Фитнес-центр международного уровня',
                   type_id=1,
                   lat_coordinate=55.76480871762954,
                   lng_coordinate=37.64227867213776,
                   address='Стопани, 6 с1, переулок Огородная Слобода, Ивановская горка, Хитровка, Басманный район, Центральный административный округ, Москва, Центральный федеральный округ, 101000, РФ',
                   created=datetime.datetime(2018, 12, 20),
                   average_rating=4.0,
                   num_votes=1,
                   owner_id=1))
session.add(Object(title='Prime cafe',
                   description='Кафе здорового питания',
                   type_id=2,
                   lat_coordinate=55.76061551821778,
                   lng_coordinate=37.60984182303219,
                   address='11 с4, Тверская улица, Тверской район, Центральный административный округ, Москва, Центральный федеральный округ, 125009, РФ',
                   created=datetime.datetime(2018, 12, 8),
                   average_rating=3.5,
                   num_votes=2,
                   owner_id=2,
                   parent_multiobject_id=1))
session.add(Object(title='Спортмастер',
                   description='Спортивный магазин',
                   type_id=1,
                   lat_coordinate=55.76061551821778,
                   lng_coordinate=37.60984182303219,
                   address='11 с4, Тверская улица, Тверской район, Центральный административный округ, Москва, Центральный федеральный округ, 125009, РФ',
                   created=datetime.datetime(2018, 11, 1),
                   average_rating=0,
                   num_votes=0,
                   owner_id=3,
                   parent_multiobject_id=1))

session.add(MultiObject(title='Торговый центр'))

session.add(Comment(object_id=1, created=datetime.datetime(2019, 1, 14), author_id=1, text='Отличный фитнес'))
session.add(Comment(object_id=1, created=datetime.datetime(2018, 12, 30), author_id=2, text="Хорошее заведение, хожу не первый год, очень нраввится персонал. Советую друзьям."))
session.add(Comment(object_id=1, created=datetime.datetime(2018, 12, 29), author_id=4, text='Не дают полотенца!(('))
session.add(Comment(object_id=2, created=datetime.datetime(2018, 12, 10), author_id=1, text='Вкусные сэндвичи и кофе'))

session.commit()