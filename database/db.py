import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database.models import *
from database.database_utils import extract_timestamp

class Database():
    def __init__(self, db_path):
        self.engine = create_engine('sqlite:///' + db_path)
        self.sessionmaker = sessionmaker(bind=self.engine)

    def get_object_type(self, id):
        session = self.sessionmaker()
        type = session.query(ObjectType).filter(ObjectType.id == id).first()
        session.close()
        if type:
            return {
                'id': type.id,
                'type_name': type.type_name
            }
        return None

    def get_object_types(self):
        session = self.sessionmaker()
        types = session.query(ObjectType).all()
        session.close()
        return {type.id : type.type_name for type in types}

    def get_objects(self):
        session = self.sessionmaker()
        objects = session.query(Object).all()
        session.close()
        objects = [object.__dict__ for object in objects]
        for object in objects:
            object.pop('_sa_instance_state', None)
        return objects

    def get_multiobjects(self):
        session = self.sessionmaker()
        multiobjects = session.query(MultiObject).all()
        session.close()
        multiobjects = [object.__dict__ for object in multiobjects]
        for object in multiobjects:
            object.pop('_sa_instance_state', None)
        return multiobjects

    def add_object(self, object_json):
        session = self.sessionmaker()
        object_json['created'] = extract_timestamp(object_json['created'])
        session.add(Object(**object_json))
        session.commit()
        session.close()

    def add_comment(self, comment_json):
        session = self.sessionmaker()
        comment_json['created'] = extract_timestamp(comment_json['created'])
        session.add(Comment(**comment_json))
        session.commit()
        session.close()

    def get_comments(self, object_id=None):
        session = self.sessionmaker()
        if object_id:
            comments = session.query(Comment).filter(Comment.object_id == object_id).all()
        else:
            comments = session.query(Comment).all()
        session.close()
        comments = [comment.__dict__ for comment in comments]
        for comment in comments:
            comment.pop('_sa_instance_state', None)
        return comments

    def get_rates(self):
        session = self.sessionmaker()
        rate_list = session.query(Rate).all()
        rates = {}
        for rate in rate_list:
            rates.setdefault(rate.user_id, {})
            rates[rate.user_id][rate.object_id] = rate.rate
        print(rates)
        return rates

    def add_rate(self, rate_json):
        session = self.sessionmaker()
        session.add(Rate(**rate_json))
        object = session.query(Object).filter(Object.id == rate_json['object_id']).first()
        object.average_rating = (object.average_rating * object.num_votes + int(rate_json['rate']))\
                                / (object.num_votes + 1)
        object.num_votes += 1
        session.commit()
        session.close()

    def add_promotion(self, promotion_json):
        session = self.sessionmaker()
        old_promotion = session.query(Promotion).filter(Promotion.object_id == promotion_json['object_id']).first()
        print(old_promotion)
        if old_promotion:
            old_promotion.text = promotion_json['text']
        else:
            session.add(Promotion(**promotion_json))
        session.commit()
        session.close()

    def get_promotion(self, object_id):
        session = self.sessionmaker()
        promotion = session.query(Promotion).filter(Promotion.object_id == object_id).first()
        session.close()
        if promotion:
            return promotion.text
        return None


