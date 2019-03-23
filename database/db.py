from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database.models import *

class Database():
    def __init__(self, db_path):
        self.engine = create_engine('sqlite:///' + db_path)
        self.sessionmaker = sessionmaker(bind=self.engine)
        self.session = self.sessionmaker()

    def get_object_type(self, id):
        type = self.session.query(ObjectType).filter(ObjectType.id == id).first()
        if type:
            return {
                'id': type.id,
                'type_name': type.type_name
            }
        return None

    def get_object_types(self):
        types = self.session.query(ObjectType).all()
        return {type.id : type.type_name for type in types}


