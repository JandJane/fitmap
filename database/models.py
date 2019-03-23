from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, Text
from sqlalchemy.orm import relationship

Base = declarative_base()


class ObjectType(Base):
    __tablename__ = 'object_types'
    id = Column(Integer, primary_key=True, autoincrement=True)
    type_name = Column(String)

    def __repr__(self):
        return "<Object type (id='%d', type_name='%s')>" % (self.id, self.type_name)


class Object(Base):
    __tablename__ = 'objects'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)
    description = Column(Text)
    type_id = Column(Integer, ForeignKey('object_types.id'))
    lat_coordinate = Column(Float)
    lng_coordinate = Column(Float)
    address = Column(Text)
    created = Column(DateTime)
    average_rating = Column(Float)
    num_votes = Column(Integer)
    owner_id = Column(Integer)
    parent_multiobject_id = Column(Integer)

    def __repr__(self):
       return """Object id='%d'\n %s\n %s\n type %d coords (%f, %f)\n %s Created %s
                Average rating %f, num votes %d\n Owner %d\n Parent multiobject %d""" %\
              (self.id, self.title, self.description, self.type_id, self.lat_coordinate,
               self.lng_coordinate, self.address, self.created, self.average_rating,
               self.num_votes, self.owner_id, self.parent_multiobject_id if self.parent_multiobject_id else -1)


class MultiObject(Base):
    __tablename__ = 'multiobjects'
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String)


class Comment(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    object_id = Column(Integer)
    created = Column(DateTime)
    author_id = Column(Integer)
    text = Column(Text)


class Rate(Base):
    __tablename__ = 'rates'
    id = Column(Integer, primary_key=True, autoincrement=True)
    object_id = Column(Integer)
    user_id = Column(Integer)
    rate = Column(Integer)


class Promotion(Base):
    __tablename__ = 'promotions'
    id = Column(Integer, primary_key=True, autoincrement=True)
    object_id = Column(Integer)
    text = Column(Text)


Object.type = relationship("ObjectType", back_populates="objects")
ObjectType.objects = relationship("Object", order_by=Object.id, back_populates="type")
