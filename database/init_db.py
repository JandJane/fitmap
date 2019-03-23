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

session.commit()