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
              (self.id.cast(int), self.title, self.description, self.type_id.cast(int), self.lat_coordinate.cast(float),
               self.lng_coordinate.cast(float), self.address, self.created, self.average_rating.cast(float),
               self.num_votes.cast(int), self.owner_id.cast(int), self.parent_multiobject_id.cast(int))

Object.type = relationship("ObjectType", back_populates="objects")
ObjectType.objects = relationship("Object", order_by=Object.id, back_populates="type")