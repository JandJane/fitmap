from flask import Flask, make_response, jsonify, request
from flask_restful import Api, Resource, reqparse

from database.db import Database

db = Database('alcora_database.db')
app = Flask(__name__)
api = Api(app)

object_parser = reqparse.RequestParser()
object_parser.add_argument('title', str)
object_parser.add_argument('description', str)
object_parser.add_argument('address', str)
object_parser.add_argument('created', str)
object_parser.add_argument('type_id', int)
object_parser.add_argument('lat_coordinate', float)
object_parser.add_argument('lng_coordinate', float)
object_parser.add_argument('average_rating', float)
object_parser.add_argument('num_votes', int)
object_parser.add_argument('owner_id', int)

comment_parser = reqparse.RequestParser()
comment_parser.add_argument('created', str)
comment_parser.add_argument('author_id', int)
comment_parser.add_argument('object_id', int)
comment_parser.add_argument('text', str)

rate_parser = reqparse.RequestParser()
rate_parser.add_argument('user_id', int)
rate_parser.add_argument('object_id', int)
rate_parser.add_argument('rate', int)

promotion_parser = reqparse.RequestParser()
promotion_parser.add_argument('object_id', int)
promotion_parser.add_argument('text', int)


def make_json_response(object={}):
    response = make_response(jsonify(object))
    response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers["Content-Type"] = "application/json; charset=utf-8"
    return response


class ObjectTypeListResource(Resource):
    def get(self):
        type_list = db.get_object_types()
        return make_json_response(type_list)


class ObjectTypeResource(Resource):
    def get(self, type_id):
        type = db.get_object_type(type_id)
        return make_json_response(type)


class ObjectListResource(Resource):
    def get(self):
        objects = db.get_objects()
        return make_json_response(objects)


class ObjectResource(Resource):
    def post(self):
        object = object_parser.parse_args()
        db.add_object(object)
        return make_json_response()


class MultiObjectListResource(Resource):
    def get(self):
        objects = db.get_multiobjects()
        return make_json_response(objects)


class CommentListResource(Resource):
    def get(self, object_id):
        comments = db.get_comments(object_id)
        return make_json_response(comments)


class CommentResource(Resource):
    def post(self):
        comment = comment_parser.parse_args()
        db.add_comment(comment)
        return make_json_response()

    def get(self):
        comments = db.get_comments()
        return make_json_response(comments)


class RateListResource(Resource):
    def get(self):
        rates = db.get_rates()
        return make_json_response(rates)


class RateResource(Resource):
    def post(self):
        rate = rate_parser.parse_args()
        db.add_rate(rate)
        return make_json_response()


class PromotionResource(Resource):
    def get(self, object_id):
        return make_json_response(db.get_promotion(object_id))

    def post(self):
        promotion = promotion_parser.parse_args()
        db.add_promotion(promotion)
        return make_json_response()


api.add_resource(PromotionResource, '/promotion', '/promotion/<int:object_id>')
api.add_resource(RateListResource, '/rate')
api.add_resource(RateResource, '/rate')
api.add_resource(ObjectListResource, '/object')
api.add_resource(ObjectResource, '/object')
api.add_resource(MultiObjectListResource, '/multiobject')
api.add_resource(CommentResource, '/comment')
api.add_resource(CommentListResource, '/comment/<int:object_id>')
api.add_resource(ObjectTypeListResource, '/object_type')
api.add_resource(ObjectTypeResource, '/object_type/<int:type_id>')

if __name__ == '__main__':
    app.run(threaded=False)
